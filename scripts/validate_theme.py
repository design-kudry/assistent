"""Validate the theme export without installing the application."""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DECL = re.compile(r"(--[\w-]+)\s*:\s*([^;]+);")
# Font binaries can be checked against the fetched Git tree during preparation.
assets = set(json.loads(Path(sys.argv[1]).read_text())) if len(sys.argv) > 1 else None

def declarations(path):
    return dict((k, v.strip()) for k, v in DECL.findall(path.read_text()))

def check(condition, message):
    if not condition:
        raise AssertionError(message)

def rgb(value):
    nums = [float(x) for x in re.findall(r"[\d.]+", value)]
    return tuple(nums[:3] + ([nums[3]] if len(nums) == 4 else [1]))

snapshot = json.loads((ROOT / "tokens/figma-colors.json").read_text())
tokens = {x["name"]: x for x in snapshot["tokens"]}
roles = {
    "--color-typo-primary": "color/text/primary",
    "--color-typo-secondary": "color/text/secondary",
    "--color-typo-ghost": "color/text/tertiary",
    "--color-control-typo-default": "color/control/default",
    "--color-control-bg-primary": "color/action/primary/background",
    "--color-control-bg-disable": "color/control/disabled-background",
    "--color-bg-default": "color/background/surface",
    "--color-bg-secondary": "color/background/page",
}
for path in ROOT.rglob("*.json"):
    json.loads(path.read_text())
for path in ROOT.rglob("*.css"):
    companion = path.with_suffix(".json")
    if companion.exists() and path.parent.name != "_extensions":
        check(declarations(path) == json.loads(companion.read_text()), f"CSS/JSON mismatch: {path}")
    check(path.read_text().count("{") == path.read_text().count("}"), f"Unbalanced CSS: {path}")
    for url in re.findall(r"url\(['\"]?([^)'\"]+)", path.read_text()):
        target = (path.parent / url).relative_to(ROOT).as_posix()
        check((ROOT / target).exists() or (assets is not None and target in assets), f"Missing asset: {target}")
        if "format('woff2')" in next((s for s in path.read_text().splitlines() if "url('" + url + "')" in s), ""):
            check(url.endswith(".woff2"), f"Wrong WOFF2 source: {url}")
for path in (ROOT / "presets").glob("*.ts"):
    for imported in re.findall(r"import\s+['\"]([^'\"]+)['\"]", path.read_text()):
        check(imported.endswith(".css"), f"Preset imports a non-CSS resource: {imported}")
        check((path.parent / imported).exists(), f"Missing import: {imported}")
ext = json.loads((ROOT / "_extensions/Theme_extensions_gpnAi.json").read_text())
ext_css = declarations(ROOT / "_extensions/Theme_extensions_gpnAi.css")
for mode, suffix in [("light", "Light"), ("dark", "Dark")]:
    data = json.loads((ROOT / f"_color/Theme_color_gpnAi{suffix}.json").read_text())
    scope = dict(data)
    for folder in ["control", "font", "size", "space", "shadow"]:
        scope.update(json.loads((ROOT / f"_{folder}/Theme_{folder}_gpnAi.json").read_text()))
    scope.update(ext["shared"])
    scope.update(ext[mode])
    for name, value in scope.items():
        for ref in re.findall(r"var\((--[\w-]+)\)", value):
            check(ref in scope, f"Undefined variable in {mode}: {name} -> {ref}")
    for name, token in roles.items():
        expected = tokens[token][mode]
        expected_rgba = tuple(round(expected[k] * 255) for k in ["r", "g", "b"]) + (expected.get("a", 1),)
        check(all(abs(a-b) < 0.0001 for a,b in zip(rgb(data[name]), expected_rgba)), f"Figma mismatch: {mode} {name}")
    for name in ext["shared"]:
        check(name in ext_css, f"Missing extension: {name}")
    for kind in ["home", "chat", "project"]:
        glow = scope["--gpn-ai-glow-" + kind]
        check(len(re.findall(r"var\(", glow)) == 3, f"Expected three glow layers: {kind}")
control = json.loads((ROOT / "_control/Theme_control_gpnAi.json").read_text())
space = json.loads((ROOT / "_space/Theme_space_gpnAi.json").read_text())
check(control["--control-radius"] == "4px", "Global control radius changed")
check(space["--space-m"] == "16px" and space["--space-xl"] == "24px", "Spacing scale changed")
config = json.loads((ROOT / "ConstructorConfigGpnAi.json").read_text())
check(config["theme"]["radius"] == 4 and config["theme"]["space"] == 2, "Constructor geometry changed")
print("PASS: JSON/CSS consistency, imports, font assets, both color scopes, Figma roles, glows, geometry.")

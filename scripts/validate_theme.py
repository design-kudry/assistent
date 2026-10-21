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
    "--color-control-bg-default": "color/background/surface",
    "--color-control-bg-border-default": "color/border/default",
    "--color-typo-primary": "color/text/primary",
    "--color-typo-secondary": "color/text/secondary",
    "--color-typo-ghost": "color/text/tertiary",
    "--color-control-typo-default": "color/control/default",
    "--color-control-bg-primary": "color/action/primary/background",
    "--color-control-bg-disable": "color/control/disabled-background",
    "--color-bg-default": "color/background/surface",
    "--color-bg-secondary": "color/background/page",
}
for path in (p for p in ROOT.rglob("*.json") if not {"node_modules", "dist"}.intersection(p.relative_to(ROOT).parts)):
    json.loads(path.read_text())
for path in (p for p in ROOT.rglob("*.css") if not {"node_modules", "dist"}.intersection(p.relative_to(ROOT).parts)):
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
check(control["--control-radius"] == "var(--gpn-ai-radius-12)", "Input radius must follow Figma")
check(control["--control-height-s"] == "36px", "Figma control size s must be 36px")
check(space["--space-m"] == "16px" and space["--space-xl"] == "24px", "Spacing scale changed")
config = json.loads((ROOT / "ConstructorConfigGpnAi.json").read_text())
check(config["theme"]["radius"] == 12 and config["theme"]["space"] == 2, "Constructor geometry changed")
print("PASS: JSON/CSS consistency, imports, font assets, both color scopes, Figma roles, glows, geometry.")

# Verify every exported semantic token and its CSS/JSON counterpart in both modes.
ext_source = (ROOT / "_extensions/Theme_extensions_gpnAi.css").read_text()
for mode, suffix in [("light", "Light"), ("dark", "Dark")]:
    block = re.search(r"\.Theme_color_gpnAi" + suffix + r"\s*\{([^}]+)\}", ext_source).group(1)
    css_mode = dict((k, v.strip()) for k, v in DECL.findall(block))
    check(css_mode == ext[mode], f"Extension CSS/JSON mismatch: {mode}")
    for token in snapshot["tokens"]:
        key = "--gpn-ai-" + token["name"].removeprefix("color/").replace("/", "-")
        expected = token[mode]
        expected_rgba = tuple(round(expected[k] * 255) for k in ["r", "g", "b"]) + (expected.get("a", 1),)
        check(all(abs(a-b) < 0.0001 for a,b in zip(rgb(ext[mode][key]), expected_rgba)), f"Extension Figma mismatch: {mode} {key}")
for name in ["--gpn-ai-haze", "--gpn-ai-haze-bottom"]:
    check(ext["shared"][name].count("var(") == 4, f"Expected four Haze stops: {name}")
check("180deg" in ext["shared"]["--gpn-ai-haze"] and "0deg" in ext["shared"]["--gpn-ai-haze-bottom"], "Haze directions must be opposite")
print("PASS: all semantic colors, Haze directions, and mode-specific extension CSS/JSON.")

# Check values behind Figma WEB aliases, including transitive aliases and cycles.
def resolve_css(scope, name, seen=None):
    seen = set() if seen is None else set(seen)
    check(name not in seen, f"Cyclic variable: {name}")
    check(name in scope, f"Missing variable: {name}")
    seen.add(name)
    value = scope[name]
    alias = re.fullmatch(r"var\((--[\w-]+)\)", value)
    return resolve_css(scope, alias[1], seen) if alias else value

variables = json.loads((ROOT / "tokens/figma-variables.json").read_text())["variables"]
style_snapshot = json.loads((ROOT / "tokens/figma-styles.json").read_text())
shared_block = re.search(r"\.Theme\s*\{([^}]+)\}", ext_source).group(1)
check(dict((k, v.strip()) for k, v in DECL.findall(shared_block)) == ext["shared"], "Shared extension CSS/JSON mismatch")
check("color/background/sidebar" not in tokens, "Removed Sidebar semantic token was restored")
for mode in ("light", "dark"):
    scope = dict(ext["shared"], **ext[mode])
    for var in variables:
        syntax = var.get("code", {}).get("WEB")
        if not syntax:
            continue
        alias = re.fullmatch(r"var\((--[\w-]+)\)", syntax)
        check(alias is not None, f"Invalid WEB syntax: {var['name']}")
        actual = resolve_css(scope, alias[1])
        expected = var["values"].get(mode.title(), var["values"].get("Value"))
        if isinstance(expected, dict):
            expected_rgba = tuple(round(expected[k] * 255) for k in ("r", "g", "b")) + (expected.get("a", 1),)
            check(all(abs(a-b) < .0001 for a, b in zip(rgb(actual), expected_rgba)), f"WEB alias value mismatch: {mode} {var['name']}")
        else:
            check(actual.endswith("px") and abs(float(actual[:-2]) - expected) < .0001, f"WEB numeric mismatch: {mode} {var['name']}")
    check(resolve_css(scope, "--gpn-ai-bg-sidebar") == resolve_css(scope, "--gpn-ai-background-surface"), f"Sidebar compatibility mismatch: {mode}")
    check(resolve_css(scope, "--gpn-ai-background-sidebar") == resolve_css(scope, "--gpn-ai-background-surface"), f"Sidebar alias mismatch: {mode}")
    for ref in re.findall(r"var\((--[\w-]+)\)", scope["--gpn-ai-shadow-list"]):
        resolve_css(scope, ref)
    for style in style_snapshot["styles"]:
        if style["type"] != "TEXT":
            continue
        prefix = "--gpn-ai-" + style["name"].removeprefix("Typography/").replace("/", "-").lower()
        for suffix, expected in (("size", f"{style['fontSize']:g}px"), ("line-height", f"{style['lineHeight']:g}px"), ("font-weight", str(style["fontWeight"])), ("font-style", style["fontStyle"])):
            check(scope[prefix + "-" + suffix] == expected, f"Text style mismatch: {style['name']} {suffix}")
check(ext["shared"]["--gpn-ai-heading-s-size"] == "20px" and ext["shared"]["--gpn-ai-heading-xs-size"] == "16px", "Heading S/XS mapping mismatch")
check(ext["shared"]["--gpn-ai-caption-badge-size"] == "12px" and ext["shared"]["--gpn-ai-caption-badge-line-height"] == "24px", "Prompt badge typography mismatch")
print("PASS: Figma WEB aliases resolve to matching values, Surface compatibility, all text styles, and list shadow.")

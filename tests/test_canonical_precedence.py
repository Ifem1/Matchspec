import ast
from pathlib import Path
from types import SimpleNamespace


def _canonical_result():
    source = Path(__file__).parents[1] / "contracts" / "matchspec.py"
    tree = ast.parse(source.read_text())
    node = next(n for n in tree.body if isinstance(n, ast.FunctionDef) and n.name == "_canonical_result")
    namespace = {"gl": SimpleNamespace(vm=SimpleNamespace(Return=type("Return", (), {}))), "IDENTITY_MATCHES": {"YES", "NO", "AMBIGUOUS"}, "EVIDENCE_STATES": {"SUFFICIENT", "AMBIGUOUS", "INSUFFICIENT"}, "CONDITIONS": {"NONE", "UNKNOWN", "INSUFFICIENT_EVIDENCE"}, "DIMENSION_OUTCOMES": {"COMPATIBLE", "INCOMPATIBLE", "CONDITIONAL", "UNKNOWN", "NOT_ASSESSED"}, "STATUSES": {"DIRECT_COMPATIBLE", "ADAPTER_REQUIRED", "PARTIAL_COMPATIBILITY", "CONDITIONAL", "INCOMPATIBLE", "UNKNOWN"}}
    exec(compile(ast.Module(body=[node], type_ignores=[]), str(source), "exec"), namespace)
    return namespace["_canonical_result"]


def _result(**overrides):
    value = {"item_a_match":"YES", "item_b_match":"YES", "status":"DIRECT_COMPATIBLE", "evidence_state":"SUFFICIENT", "condition_code":"NONE", "physical_fit":"COMPATIBLE", "power":"COMPATIBLE", "data":"COMPATIBLE", "display":"COMPATIBLE", "protocol":"COMPATIBLE", "adapter_required":False, "adapter":"", "limitation":""}
    value.update(overrides)
    return value


def test_compatible_plus_incompatible_is_incompatible():
    assert _canonical_result()(_result(power="INCOMPATIBLE"), ["POWER", "DATA"])["status"] == "INCOMPATIBLE"


def test_incompatible_plus_unknown_is_incompatible():
    assert _canonical_result()(_result(power="INCOMPATIBLE", data="UNKNOWN"), ["POWER", "DATA"])["status"] == "INCOMPATIBLE"


def test_incompatible_plus_conditional_is_incompatible():
    assert _canonical_result()(_result(power="INCOMPATIBLE", data="CONDITIONAL"), ["POWER", "DATA"])["status"] == "INCOMPATIBLE"


def test_insufficient_evidence_is_unknown():
    assert _canonical_result()(_result(evidence_state="INSUFFICIENT"), ["POWER"])["status"] == "UNKNOWN"

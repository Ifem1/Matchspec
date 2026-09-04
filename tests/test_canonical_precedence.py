from pathlib import Path


SOURCE = (Path(__file__).parents[1] / "contracts" / "matchspec.py").read_text()


def test_incompatible_dimension_is_terminal_canonical_result():
    """Regression guard for the policy boundary in _canonical_result."""
    branch = 'elif any(x=="INCOMPATIBLE" for x in assessed):'
    assert branch in SOURCE
    branch_start = SOURCE.index(branch)
    assert 'result["status"]="PARTIAL_COMPATIBILITY"' not in SOURCE[branch_start:]


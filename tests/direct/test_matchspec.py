import pytest


def test_item_registry_and_bounds(direct_vm, direct_deploy, direct_alice):
    contract = direct_deploy("contracts/matchspec.py")
    direct_vm.sender = direct_alice
    assert contract.register_item("Dell", "XPS 15", "LAPTOP", "9530", "2023", "dell:xps15:9530:2023") == 1
    assert contract.get_item_count() == 1
    assert contract.get_item(1)["canonical_key"] == "dell:xps15:9530:2023"
    with direct_vm.expect_revert("duplicate canonical key"):
        contract.register_item("Dell", "XPS 15", "LAPTOP", "9530", "2023", "dell:xps15:9530:2023")


def test_pair_validation(direct_vm, direct_deploy, direct_alice):
    contract = direct_deploy("contracts/matchspec.py")
    direct_vm.sender = direct_alice
    contract.register_item("A", "Host", "LAPTOP", "A1", "r1", "a:host:a1:r1")
    contract.register_item("B", "Dock", "DOCK", "B1", "r1", "b:dock:b1:r1")
    with direct_vm.expect_revert("invalid pair"):
        contract.create_pair(1, 1, ["POWER"], ["https://example.com/spec"])
    with direct_vm.expect_revert("invalid public HTTPS source"):
        contract.create_pair(1, 2, ["POWER"], ["http://localhost/spec"])
    assert contract.create_pair(1, 2, ["POWER", "DATA"], ["https://example.com/spec"]) == 1
    assert contract.get_pair(1)["source_version"] == 1


def test_source_version_and_permissions(direct_vm, direct_deploy, direct_alice, direct_bob):
    contract = direct_deploy("contracts/matchspec.py")
    direct_vm.sender = direct_alice
    contract.register_item("A", "Host", "LAPTOP", "A1", "r1", "a:host:a1:r1")
    contract.register_item("B", "Dock", "DOCK", "B1", "r1", "b:dock:b1:r1")
    contract.create_pair(1, 2, ["POWER"], ["https://example.com/one"])
    direct_vm.sender = direct_bob
    with direct_vm.expect_revert("creator only"):
        contract.update_sources(1, ["https://example.com/two"])
    direct_vm.sender = direct_alice
    contract.update_sources(1, ["https://example.com/two"])
    assert contract.get_pair(1)["source_version"] == 2


def _pair(contract, vm, profile=("GENERAL",), urls=("https://example.com/spec",)):
    vm.sender = vm.sender
    contract.register_item("A", "Host", "LAPTOP", "A1", "r1", "a:host:a1:r1")
    contract.register_item("B", "Dock", "DOCK", "B1", "r1", "b:dock:b1:r1")
    return contract.create_pair(1, 2, list(profile), list(urls))


@pytest.mark.parametrize("kind", ["PHONE", "TABLET", "CHARGER", "BATTERY", "CAMERA", "LENS", "MOTHERBOARD", "RAM", "STORAGE", "ROUTER", "POWER_SUPPLY", "ACCESSORY"])
def test_supported_item_kinds(direct_vm, direct_deploy, direct_alice, kind):
    contract = direct_deploy("contracts/matchspec.py"); direct_vm.sender = direct_alice
    assert contract.register_item("M", "P", kind, "X", "R", "m:p:" + kind.lower()) == 1


@pytest.mark.parametrize("field", ["manufacturer", "product", "model", "revision", "key"])
def test_whitespace_only_item_fields_rejected(direct_vm, direct_deploy, direct_alice, field):
    contract = direct_deploy("contracts/matchspec.py"); direct_vm.sender = direct_alice
    values = {"manufacturer":"M", "product":"P", "model":"X", "revision":"R", "key":"m:p:x:r"}; values[field] = "   "
    with direct_vm.expect_revert(): contract.register_item(values["manufacturer"], values["product"], "LAPTOP", values["model"], values["revision"], values["key"])


@pytest.mark.parametrize("url", ["http://example.com", "https://localhost/x", "https://127.0.0.1/x", "https://10.1.2.3/x", "https://172.16.0.1/x", "https://192.168.1.1/x", "https://169.254.1.1/x", "https://[::1]/x", "not-a-url"])
def test_private_or_malformed_sources_rejected(direct_vm, direct_deploy, direct_alice, url):
    contract = direct_deploy("contracts/matchspec.py"); direct_vm.sender = direct_alice
    contract.register_item("A", "Host", "LAPTOP", "A1", "r1", "a:host:a1:r1")
    contract.register_item("B", "Dock", "DOCK", "B1", "r1", "b:dock:b1:r1")
    with direct_vm.expect_revert(): contract.create_pair(1, 2, ["POWER"], [url])


def test_general_expands_to_all_dimensions(direct_vm, direct_deploy, direct_alice):
    contract = direct_deploy("contracts/matchspec.py"); direct_vm.sender = direct_alice
    _pair(contract, direct_vm)
    assert contract.get_pair(1)["profile"] == ["GENERAL"]


def test_duplicate_source_urls_rejected(direct_vm, direct_deploy, direct_alice):
    contract = direct_deploy("contracts/matchspec.py"); direct_vm.sender = direct_alice
    contract.register_item("A", "Host", "LAPTOP", "A1", "r1", "a:host:a1:r1")
    contract.register_item("B", "Dock", "DOCK", "B1", "r1", "b:dock:b1:r1")
    with direct_vm.expect_revert("duplicate source"):
        contract.create_pair(1, 2, ["POWER"], ["https://example.com/spec", "https://example.com/spec"])


def test_source_history_is_immutable_and_bounded(direct_vm, direct_deploy, direct_alice):
    contract = direct_deploy("contracts/matchspec.py"); direct_vm.sender = direct_alice
    _pair(contract, direct_vm, ("POWER",), ("https://example.com/one",))
    v1 = contract.get_source_version(1, 1)
    contract.update_sources(1, ["https://example.com/two"])
    assert contract.get_source_version(1, 1) == v1
    assert contract.get_source_version(1, 2)["source_urls"] == ["https://example.com/two"]
    with direct_vm.expect_revert("source version not found"): contract.get_source_version(1, 3)


def test_assessment_history_invalid_sequence_is_clean_error(direct_vm, direct_deploy, direct_alice):
    contract = direct_deploy("contracts/matchspec.py"); direct_vm.sender = direct_alice
    _pair(contract, direct_vm)
    with direct_vm.expect_revert("assessment not found"): contract.get_assessment(1, 1)


@pytest.mark.parametrize("field,limit", [("manufacturer",100),("product",160),("model",100),("revision",80),("key",220)])
def test_oversized_item_fields_rejected(direct_vm, direct_deploy, direct_alice, field, limit):
    contract = direct_deploy("contracts/matchspec.py"); direct_vm.sender = direct_alice
    values = {"manufacturer":"M", "product":"P", "model":"X", "revision":"R", "key":"m:p:x:r"}; values[field] = "x" * (limit + 1)
    with direct_vm.expect_revert(): contract.register_item(values["manufacturer"], values["product"], "LAPTOP", values["model"], values["revision"], values["key"])


def test_invalid_profile_rejected(direct_vm, direct_deploy, direct_alice):
    contract = direct_deploy("contracts/matchspec.py"); direct_vm.sender = direct_alice
    contract.register_item("A", "Host", "LAPTOP", "A1", "r1", "a:host:a1:r1"); contract.register_item("B", "Dock", "DOCK", "B1", "r1", "b:dock:b1:r1")
    with direct_vm.expect_revert("invalid profile"): contract.create_pair(1, 2, ["NOT_A_DIMENSION"], ["https://example.com/spec"])


def test_empty_profile_rejected(direct_vm, direct_deploy, direct_alice):
    contract = direct_deploy("contracts/matchspec.py"); direct_vm.sender = direct_alice
    contract.register_item("A", "Host", "LAPTOP", "A1", "r1", "a:host:a1:r1"); contract.register_item("B", "Dock", "DOCK", "B1", "r1", "b:dock:b1:r1")
    with direct_vm.expect_revert("invalid profile"): contract.create_pair(1, 2, [], ["https://example.com/spec"])


def test_missing_item_rejected(direct_vm, direct_deploy, direct_alice):
    contract = direct_deploy("contracts/matchspec.py"); direct_vm.sender = direct_alice
    contract.register_item("A", "Host", "LAPTOP", "A1", "r1", "a:host:a1:r1")
    with direct_vm.expect_revert("invalid pair"): contract.create_pair(1, 2, ["POWER"], ["https://example.com/spec"])

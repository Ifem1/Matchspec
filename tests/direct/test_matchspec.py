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


# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }
from genlayer import *

class Diagnostic(gl.Contract):
    def __init__(self): pass

    @gl.public.view
    def sanity(self) -> str: return "DIAGNOSTIC_OK"

    @gl.public.write
    def web_only(self, url: str) -> str:
        def leader():
            response = gl.nondet.web.get(url)
            return str(response.status) + ":" + str(len(response.body))
        def validate(value): return isinstance(value, gl.vm.Return) and isinstance(value.calldata, str)
        return gl.vm.run_nondet_unsafe(leader, validate)

    @gl.public.write
    def matchspec_source_web_only(self) -> str:
        return self.web_only("https://www.dell.com/support/kbdoc/en-us/000131676")

    @gl.public.write
    def llm_only(self) -> dict:
        def leader():
            result = gl.nondet.exec_prompt("Return JSON with exactly one field: ok, whose value is true.", response_format="json")
            if isinstance(result, gl.vm.Return): result = result.calldata
            return result
        def validate(value): return isinstance(value, gl.vm.Return) and isinstance(value.calldata, dict) and value.calldata.get("ok") is True
        return gl.vm.run_nondet_unsafe(leader, validate)

    @gl.public.write
    def minimal_consensus(self) -> str:
        def leader(): return "OK"
        def validate(value): return isinstance(value, gl.vm.Return) and value.calldata == "OK"
        return gl.vm.run_nondet_unsafe(leader, validate)

param([string]$Rpc='https://studio.genlayer.com/api')
if (-not (Get-Command genlayer -ErrorAction SilentlyContinue)) { throw 'Install the current GenLayer CLI first.' }
genlayer deploy --contract contracts/matchspec.py --rpc $Rpc

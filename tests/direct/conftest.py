"""Windows compatibility shim for gltest's fd0 temp-file cleanup.

The installed gltest loader closes the descriptor after dup2 but Windows keeps
the redirected stdin handle open, so its immediate unlink raises WinError 32.
The file is harmless and is removed by the OS/temp cleanup later.
"""
import errno
import os

_unlink = os.unlink

def _unlink_windows_safe(path, *args, **kwargs):
    try:
        return _unlink(path, *args, **kwargs)
    except OSError as error:
        if getattr(error, "winerror", None) == 32 or error.errno == errno.EACCES:
            return None
        raise

os.unlink = _unlink_windows_safe

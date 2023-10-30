# st-copy-to-clipboard

Streamlit component that allows you to copy text to clipboard.

## Installation instructions

```sh
pip install st-copy-to-clipboard
```

## Usage instructions

> Note: The clipboard API is only available in secure contexts (HTTPS)

```python
import streamlit as st

from st_copy_to_clipboard import st_copy_to_clipboard

# Render copy to clipboard button
st_copy_to_clipboard("Copy this to clipboard")

```

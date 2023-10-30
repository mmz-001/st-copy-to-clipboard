from pathlib import Path
from typing import Optional

import streamlit as st
import streamlit.components.v1 as components

# Tell streamlit that there is a component called streamlit_copy_to_clipboard,
# and that the code to display that component is in the "frontend" folder
frontend_dir = (Path(__file__).parent / "frontend").absolute()
_component_func = components.declare_component(
    "streamlit_copy_to_clipboard", path=str(frontend_dir)
)


# Create the python function that will be called
def st_copy_to_clipboard(
    text: str,
    key: Optional[str] = None,
):
    """
    Add a descriptive docstring
    """
    component_value = _component_func(
        key=key,
        text=text,
    )

    return component_value


def main():
    st.write("## Example")
    text = st.text_input("Enter text to copy to clipboard", value="Hello World")
    st_copy_to_clipboard(text)


if __name__ == "__main__":
    main()

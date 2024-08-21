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


def st_copy_to_clipboard(
    text: str,
    before_copy_label: str = "📋",
    after_copy_label: str = "✅",
    show_text: bool = False,
    tooltip: Optional[str] = None,
    key: Optional[str] = None,
):
    """
    Streamlit component to copy text to clipboard.

    Parameters
    ----------
    text : str
        The text to be copied to the clipboard.
    before_copy_label : str
        Label of the button before text is copied.
    after_copy_label : str
        Label of the button after text is copied.
    show_text: bool
        If True, show text right before the button and make it clickable as well
    tooltip: str or None
        An optional tooltip for the component.
    key : str or None
        An optional key that uniquely identifies the component.
    """
    component_value = _component_func(
        key=key,
        text=text,
        before_copy_label=before_copy_label,
        after_copy_label=after_copy_label,
        show_text=show_text,
        tooltip=tooltip
    )

    return component_value


def main():
    st.write("## Example")
    text = st.text_input("Enter text to copy to clipboard", value="Hello World")
    st_copy_to_clipboard(text)
    st_copy_to_clipboard(text, before_copy_label='📋Push to copy', after_copy_label='✅Text copied!')
    st_copy_to_clipboard(text, before_copy_label='Push to copy', after_copy_label='Text copied!', show_text=True)
    st_copy_to_clipboard(text, before_copy_label='Push to copy', after_copy_label='Text copied!', show_text=True, tooltip="Show  tooltip on hover")




if __name__ == "__main__":
    main()

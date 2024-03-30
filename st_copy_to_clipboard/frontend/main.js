// The `Streamlit` object exists because our html file includes
// `streamlit-component-lib.js`.
// If you get an error about "Streamlit" not being defined, that
// means you're missing that file.

function sendValue(value) {
  Streamlit.setComponentValue(value)
}

/**
 * The component's render function. This will be called immediately after
 * the component is initially loaded, and then again every time the
 * component gets new data from Python.
 */
function onRender(event) {
  // Only run the render code the first time the component is loaded.
  if (!window.rendered) {
    const { text, before_copy_label, after_copy_label, show_text } = event.detail.args;

    const container = document.querySelector('#container');
    const button = document.querySelector('#copy-button');
    const textElement = document.querySelector('#text-element');

    button.textContent = before_copy_label;  // Set initial label

    // Show text if show_text is true
    if (show_text) {
      textElement.textContent = text;
      textElement.style.display = 'inline';
    } else {
      textElement.style.display = 'none';
    }

    function copyToClipboard() {
      navigator.clipboard.writeText(text);

      button.textContent = after_copy_label;  // Change label after copying

      setTimeout(() => {
        if (!button) return;
        button.textContent = before_copy_label;  // Revert to original label after 1 second
      }, 1000);
    }

    button.addEventListener('click', copyToClipboard);
    textElement.addEventListener('click', copyToClipboard);

    window.rendered = true;
  }
}


// Render the component whenever python send a "render event"
Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)
// Tell Streamlit that the component is ready to receive events
Streamlit.setComponentReady()
// Render with the correct height, if this is a fixed-height component
Streamlit.setFrameHeight(100)

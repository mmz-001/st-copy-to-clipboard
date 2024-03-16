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
    const { text, before_copy_label, after_copy_label } = event.detail.args;

    const button = document.querySelector('#copy-button');
    button.innerHTML = before_copy_label;  // Set initial label

    function copyToClipboard() {
      navigator.clipboard.writeText(text);

      button.innerHTML = after_copy_label;  // Change label after copying

      setTimeout(() => {
        if (!button) return;
        button.innerHTML = before_copy_label;  // Revert to original label after 1 second
      }, 1000);
    }

    button.addEventListener('click', copyToClipboard);

    window.rendered = true;
  }
}


// Render the component whenever python send a "render event"
Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)
// Tell Streamlit that the component is ready to receive events
Streamlit.setComponentReady()
// Render with the correct height, if this is a fixed-height component
Streamlit.setFrameHeight(100)

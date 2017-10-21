let visible = false;

const toggle = () => {
  visible = !visible
  render();
}

const render = () => {
  const view = (
    <div>
      <h1>Visibility Toggle</h1>
      <button onClick={toggle}>
        {!visible ? 'Show' : 'Hide'} Details
      </button>
      {visible && <p>Hey. These are some details you can now see!</p>}
    </div>
  );

  ReactDOM.render(view, document.getElementById('app'));
};

render();
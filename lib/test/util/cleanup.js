import EmbeddableWidget from '../../src/index';

function cleanup(uid) {
  return () => {
    EmbeddableWidget.unmount({ uid });

    const root = document.getElementById('root');
    document.body.removeChild(root);
  };
}

export default cleanup;

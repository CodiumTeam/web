import React, { useEffect, useState } from 'react';
import sdk from '@stackblitz/sdk';

function Editor({ challengeId, onLoad, openFile = ['README.md'] }) {
  const [error, setShowError] = useState(false);
  useEffect(() => {
    setShowError(true);

    sdk
      .embedProjectId('code', challengeId, {
        forceEmbedLayout: true,
        openFile: openFile,
        view: 'editor',
        theme: 'dark',
        hideNavigation: true,
      })
      .then((vm) => {
        onLoad(vm);
      })
      .catch(() => {
        setShowError(true);
      });

    return () => {};
  }, []);

  return (
    <div>
      <div id="code" className="code"></div>
      {error && (
        <div className="alert alert--error hidden" id="js-show-error">
          <div className="alert__content">
            <i className="icon icon-warning"></i>
            <p>Ha ocurrido un error, por favor inténtelo de nuevo.</p>
          </div>
          <p>
            <small>
              Si estás en modo incógnito. El editor no funcionará debido a
              bloqueos de ciertas APIS por parte del navegador
            </small>
          </p>
        </div>
      )}
    </div>
  );
}

export default Editor;

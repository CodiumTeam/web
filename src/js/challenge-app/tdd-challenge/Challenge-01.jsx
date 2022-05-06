import React, { useRef, useEffect, useState } from 'react';
import sdk from '@stackblitz/sdk';

function Challenge01() {
  const ref = useRef(null);
  const [error, setShowError] = useState(false);

  useEffect(() => {
    setShowError(true);

    sdk
      .embedProjectId('code', 'tdd-challenge-1', {
        forceEmbedLayout: true,
        openFile: 'README.md',
        view: 'editor',
        theme: 'dark',
        hideNavigation: true,
      })
      .catch((err) => {
        setShowError(true);
      });
  }, []);

  return (
    <>
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
    </>
  );
}

export default Challenge01;

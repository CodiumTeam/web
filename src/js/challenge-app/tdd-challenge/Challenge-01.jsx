import React from 'react';
import Editor from '../components/Editor';

function Challenge01() {
  return (
    <div className="editor-wrapper">
      <Editor
        challengeId="tdd-challenge-1"
        onLoad={(vm) => {
          console.log(vm);
        }}
      />
      <button className="button solution-btn">Mostrar solución</button>
    </div>
  );
}

export default Challenge01;

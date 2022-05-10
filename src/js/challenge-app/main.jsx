import React from 'react';
import ReactDOM from 'react-dom/client';
import TDD from './TDD';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './challenge.scss';
import Legacy from './Legacy';

function mountApp() {
  const root = document.getElementById('root');
  const type = root.dataset.type;

  const Challenge = ({ type }) => {
    if (type === 'tdd') return <TDD />;

    return <Legacy />;
  };

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Challenge type={type} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </React.StrictMode>
  );
}

mountApp();

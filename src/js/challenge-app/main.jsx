import React from 'react';
import ReactDOM from 'react-dom/client';
import TDD from './TDD';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './challenge.scss';

function mountApp() {
  const root = document.getElementById('root');

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <TDD />
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

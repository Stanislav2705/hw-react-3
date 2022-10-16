import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import styles from './index.module.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App className={styles.app} />
  </React.StrictMode>
);

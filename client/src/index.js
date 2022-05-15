import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Container 
        className='d-flex align-items-center justify-content-center'
        style={ {minHeight: '100vh'} }
      >
        <div style={ {maxWidth: '400px', width: '100%'} }>
          <App />
        </div>
      </Container>
    </BrowserRouter>
  </React.StrictMode>
);

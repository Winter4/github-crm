import React from 'react'
import { Container } from 'react-bootstrap';

export default function AuthContainer({ children }) {
  return (
    <Container 
      className='d-flex align-items-center justify-content-center flex-column'
      style={ {minHeight: '100vh'} }
    >
      <div style={ {maxWidth: '400px', width: '100%'} }>
        { children }
      </div>
    </Container>
  );
}
import React from 'react'
import { Container } from 'react-bootstrap';

export default function HomeContainer({ children }) {
  return (
    <Container className='mt-3 mb-5'>
      { children }
    </Container>
  );
}
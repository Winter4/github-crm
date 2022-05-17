import React from 'react'
import { Container } from 'react-bootstrap';

export default function HomeContainer({ children }) {
  return (
    <Container className='mt-3'>
      { children }
    </Container>
  );
}
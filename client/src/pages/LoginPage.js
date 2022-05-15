import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';

export default function LoginPage() {
  return (
    <>
      <Card>
        <Card.Header as='h4' className='text-center p-3'>
          Sign in to GitHub CRM
        </Card.Header>

        <Card.Body className='p-3'>
          <Form>
            <Form.Group>
              <Form.Label>E-mail address</Form.Label>
              <Form.Control type='email' placeholder='e-mail'></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='password'></Form.Control>
            </Form.Group>

            <Button className='w-100 mt-2' type='submit'>Sign in</Button>
          </Form>
        </Card.Body>
      </Card>

      <div className='w-100 mt-2 text-center'>Need an account? <Link to='/register'>Sign up</Link></div>
    </>
  );
}

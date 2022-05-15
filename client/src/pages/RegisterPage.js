import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';

export default function RegisterPage() {
  return (
    <>
      <Card>
        <Card.Header as='h4' className='text-center p-3'>
          Sign up to GitHub CRM
        </Card.Header>

        <Card.Body className='p-3'>
          <Form>
            <Form.Group>
              <Form.Label>Your name</Form.Label>
              <Form.Control type='text' placeholder='name'></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Your e-mail address</Form.Label>
              <Form.Control type='email' placeholder='e-mail'></Form.Control>
              <Form.Text className='text-muted'>
                &nbsp;We'll never share your e-mail&nbsp;
                <span className='text-decoration-line-through'>unless u give the reject</span>
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Your password</Form.Label>
              <Form.Control type='password' placeholder='password'></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Confirm your password</Form.Label>
              <Form.Control type='password' placeholder='password again'></Form.Control>
            </Form.Group>

            <Button className='w-100 mt-2' type='submit'>Sign up</Button>
          </Form>
        </Card.Body>
      </Card>

      <div className='w-100 mt-2 text-center'>Already have an account? <Link to='/login'>Sign in</Link></div>
    </>
  );
}

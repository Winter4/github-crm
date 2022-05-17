import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {

  const [error, setError] = useState(null);
  const { login } = useAuth();

  const form = {
    email: useRef(),
    pwd: useRef(),
  };

  const handleLogin = async e => {
    e.preventDefault();

    const user = {
      email: form.email.current.value,
      pwd: form.pwd.current.value,
    };

    setError(null);

    try {
      await login(user.email, user.pwd);
    } catch (e) {
      setError(e.message);
    }
  };

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
              <Form.Control type='email' placeholder='e-mail' ref={form.email}></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='password' ref={form.pwd}></Form.Control>
            </Form.Group>

            { error && <Alert className='mx-1 text-center p-1' style={{fontSize: '11pt'}} variant={'danger'}>{error}</Alert> }

            <Button 
              className='w-100 mt-2' 
              type='submit' 
              onClick={e => handleLogin(e)}
            >
              Sign in
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <div className='w-100 mt-2 text-center'>Need an account? <Link to='/register'>Sign up</Link></div>
    </>
  );
}

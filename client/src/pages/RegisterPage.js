import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Form, Button, Alert } from 'react-bootstrap';

import { useAuth } from '../contexts/AuthContext';
import AuthContainer from '../wrappers/AuthContainer';

export default function RegisterPage() {

  const [error, setError] = useState(null);
  const nav = useNavigate();

  const { register } = useAuth();

  const form = {
    name: useRef(),
    email: useRef(),
    password: useRef(),
    passwordConf: useRef(),
  };

  const handleRegister = async e => {
    e.preventDefault();

    const user = {
      name: form.name.current.value,
      email: form.email.current.value,
      pwd: form.password.current.value,
      pwdConf: form.passwordConf.current.value,
    };

    setError(null);

    // validate name length
    if (user.name.length < 2) return setError('Name should be at least 2 letters length');
    // validate name symbols
    if (!(/^[A-z ,.'-]+$/.test(user.name))) return setError('Name should be latin only');

    // validate email length
    if (user.email.length < 3) return setError('Email is incorrect');

    // validate password length
    if (user.pwd.length < 6) return setError('Password should be at least 6 symbols length');

    // validate password confirm
    if (user.pwdConf !== user.pwd) return setError('Passwords should be the same');

    try {
      if (await register(user.name, user.email, user.pwd)) {
        nav('/');
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <AuthContainer>
      <Card>
        <Card.Header as='h4' className='text-center p-3'>
          Sign up to GitHub CRM
        </Card.Header>

        <Card.Body className='p-3'>
          <Form>
            <Form.Group>
              <Form.Label>Your name</Form.Label>
              <Form.Control type='text' minLength='2' placeholder='name' ref={form.name} />
              <Form.Text className='text-muted'>at least 2 latin letters</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Your e-mail address</Form.Label>
              <Form.Control type='email' placeholder='e-mail' ref={form.email}></Form.Control>
              <Form.Text className='text-muted'>
                &nbsp;we'll never share your e-mail&nbsp;
                <span className='text-decoration-line-through'>unless u give the reject</span>
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Your password</Form.Label>
              <Form.Control type='password' minLength='6' placeholder='password' ref={form.password}></Form.Control>
              <Form.Text className='text-muted'>at least 6 symbols</Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Confirm your password</Form.Label>
              <Form.Control type='password' minLength='6' placeholder='password again' ref={form.passwordConf}></Form.Control>
              <Form.Text className='text-muted'>should be the same as password higher</Form.Text>
            </Form.Group>

            { error && <Alert className='mx-1 text-center p-1' style={{fontSize: '11pt'}} variant={'danger'}>{error}</Alert> }

            <Button 
              className='w-100 mt-2' 
              type='submit' 
              onClick={e => handleRegister(e)}
              variant={'dark'}
            >
              Sign up
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <div className='w-100 mt-2 text-center'>Already have an account? <Link to='/login'>Sign in</Link></div>
    </AuthContainer>
  );
}

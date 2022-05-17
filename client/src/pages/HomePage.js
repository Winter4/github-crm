import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Button, Table, InputGroup, FormControl } from 'react-bootstrap';

import { useAuth } from '../contexts/AuthContext';
import { useCRUD } from '../contexts/CRUDContext';
import HomeContainer from '../wrappers/HomeContainer';

export default function HomePage() {

  const { user } = useAuth();
  const nav = useNavigate(); 

  useEffect(() => {
    if (!user) nav('/login');
  }, [user, nav]);

  // - - - - - - - - - - - -

  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const { getRepo } = useCRUD();
  
  const repoPath = useRef();

  const handleAdding = async e => {
    try {
      if (await getRepo(user, repoPath.current.value)) {
        console.log('posted');
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <Navbar bg={'dark'} variant={'dark'} className='p-3'>
        <Navbar.Brand>GitHub CRM</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-center'>
          <Navbar.Text>
            <span>Signed as: {localStorage.getItem('userName')}</span> &nbsp;
            <span className='text-muted'>{localStorage.getItem('userEmail')}</span>
          </Navbar.Text>
        </Navbar.Collapse>
        <Button variant={'secondary'}>Logout</Button>
      </Navbar>

      <HomeContainer>
        <InputGroup className='mb-3'>
          <InputGroup.Text>github.com/</InputGroup.Text>

          <FormControl
            placeholder='facebook/react'
            aria-label='Repo url'
            aria-describedby='basic-addon2'
            ref={repoPath}
          />
          <Button variant='outline-secondary' id='button-addon2' onClick={e => handleAdding(e)}>add repo</Button>
        </InputGroup>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </HomeContainer>
    </>
  );
}

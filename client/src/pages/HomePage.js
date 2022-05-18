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

  // - - - - - - - - - - - - - - - - -

  const { addRepo, getRepos, refreshRepo, deleteRepo } = useCRUD();

  // main data state
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('effect');
    getRepos(user).then(repos => setData(repos));
  }, []); 

  // - - - - - - - - - - - - - - - - -

  // error state
  const [error, setError] = useState(null);
  // reference for repo path input
  const repoPath = useRef();

  // handler for onClick add button
  const handleAdd = async e => {
    try {
      if (await addRepo(user, repoPath.current.value)) {
        setData(await getRepos(user));
      }
    } catch (e) {
      setError(e.message);
    }
  };

  // handler for onClick refresh button
  const handleRefresh = async (e, index) => {
    try {
      if (await refreshRepo(data[index].id)) {
        setData(await getRepos(user));
      }
    } catch (e) {
      setError(e.message);
    }
  };

  const handleDelete = async (e, index) => {
    try {
      if (await deleteRepo(data[index].id)) {
        setData(await getRepos(user));
      }
    } catch (e) {
      setError(e.message);
    }
  };

  // - - - - - - - - - - - - - - - - -

  // transforming data into table row
  const handledData = data.map((row, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{row.owner}</td>
        <td>{row.name}</td>
        <td>{row.url}</td>
        <td>{row.stars}</td>
        <td>{row.forks}</td>
        <td>{row.issues}</td>
        <td>{row.created}</td>
        <td><Button onClick={e => handleRefresh(e, index)}>ref</Button></td>
        <td><Button onClick={e => handleDelete(e, index)} variant={'danger'}>del</Button></td>
      </tr>
    );
  });

  // - - - - - - - - - - - - - - - - -

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
          <Button variant='outline-secondary' id='button-addon2' onClick={e => handleAdd(e)}>add repo</Button>
        </InputGroup>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Owner</th>
              <th>Name</th>
              <th>URL</th>
              <th>Stars</th>
              <th>Forks</th>
              <th>Issues</th>
              <th>Created</th>
              <th>ref</th>
              <th>del</th>
            </tr>
          </thead>
          <tbody>
            {handledData}
          </tbody>
        </Table>
      </HomeContainer>
    </>
  );
}

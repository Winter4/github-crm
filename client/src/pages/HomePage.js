import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Button, Table, InputGroup, FormControl, Alert } from 'react-bootstrap';

import { FiGithub } from 'react-icons/fi';
import { MdOutlineRefresh, MdDelete } from 'react-icons/md';

import { useAuth } from '../contexts/AuthContext';
import { useCRUD } from '../contexts/CRUDContext';
import HomeContainer from '../wrappers/HomeContainer';

export default function HomePage() {

  // data manipulation funcs
  const { addRepo, getRepos, refreshRepo, deleteRepo } = useCRUD();

  // main data state
  const [data, setData] = useState([]);

  // logged user
  const { user, logout } = useAuth();
  const nav = useNavigate(); 
  
  // this hook is called twice on page load
  // have ideas why, but haven't enough react experience
  // to fix it
  useEffect(() => {
    // browser renders this page just for a moment
    // and then navigates to another page
    // not exactly what i wanted but also
    // wonder having more react experience
    if (!user) nav('/login');
    else getRepos(user).then(repos => setData(repos));
  }, [user]);

  // - - - - - - - - - - - - - - - - -

  // error state
  const [error, setError] = useState(null);
  // reference for repo path input
  const repoPath = useRef();

  // handler for onClick add button
  const handleAdd = async e => {
    try {
      setError(null);

      if (!repoPath.current.value) {
        setError('Repo path can\'t be empty');
        return;
      }

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
      setError(null);
      if (await refreshRepo(data[index].id)) {
        setData(await getRepos(user));
      }
    } catch (e) {
      setError(e.message);
    }
  };

  const handleDelete = async (e, index) => {
    try {
      setError(null);
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
        <td><Button onClick={e => handleRefresh(e, index)}><MdOutlineRefresh /></Button></td>
        <td><Button onClick={e => handleDelete(e, index)} variant={'danger'}><MdDelete /></Button></td>
      </tr>
    );
  });

  // - - - - - - - - - - - - - - - - -

  return (
    <>
      <Navbar bg={'dark'} variant={'dark'} className='p-3'>
        <Navbar.Brand><FiGithub />&nbsp;GitHub CRM</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-center'>
          <Navbar.Text>
            <span>Signed as: {localStorage.getItem('userName')}</span> &nbsp;
            <span className='text-muted'>{localStorage.getItem('userEmail')}</span>
          </Navbar.Text>
        </Navbar.Collapse>
        <Button variant={'secondary'} onClick={() => logout()}>Logout</Button>
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

        { error && <Alert className='mx-1 text-center p-1' style={{fontSize: '11pt'}} variant={'danger'}>{error}</Alert> }

        <Table className='text-center' striped bordered hover>
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

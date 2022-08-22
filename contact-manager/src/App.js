import React from 'react'
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import ContactsList from './components/Contacts/ContactsList/ContactsList';
import Addcontacts from './components/Contacts/Addcontacts/Addcontacts';
import Viewcontacts from './components/Contacts/Viewcontacts/Viewcontacts';
import Editcontacts from './components/Contacts/Editcontacts/Editcontacts';
import Spinner from './components/Spinner/Spinner';

function App() {
  return (
    <>
      <Navbar />
      <Routes >
        <Route path={'/'} element={<Navigate to={'/contacts/list'} />} />
        <Route path={'/contacts/list'} element={<ContactsList />} />
        <Route path={'/contacts/add'} element={<Addcontacts />} />
        <Route path={'/contacts/view/:id'} element={<Viewcontacts />} />
        <Route path={'/contacts/edit/:id'} element={<Editcontacts />} />

      </Routes>
    </>
  );
}

export default App;

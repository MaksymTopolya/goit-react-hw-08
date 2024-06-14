

import css from './App.module.css';
import ContactForm from './components/ContactForm/ContactForm';
import SearchBox from './components/SearchBox/SearchBox';
import ContactList from './components/ContactList/ContactList';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from './redux/contactsOps';
import { selectError, selectLoading } from './redux/contactsSlice';

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading)
  const isError = useSelector(selectError)

 
   useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {isLoading && <div>loading...</div>}
      {isError && <div>something went wrong(</div>}
      <ContactList />
    </div>
  );
}

export default App;

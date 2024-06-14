import { useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/contactsSlice';
import Contact from '../Contact/Contact';
import css from './ContactList.module.css';

export default function ContactList() {

    const filteredContacts = useSelector(selectFilteredContacts);

    return (
        <ul className={css.list}>
            {filteredContacts.map((user) => (
                <li key={user.id} className={css.item}>
                    <Contact data={user}/>
                </li>
            ))}
        </ul>
    );
}
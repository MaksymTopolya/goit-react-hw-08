
import { HiUserCircle, HiPhone } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import toast, { Toaster } from 'react-hot-toast';

export default function Contact({ data }) {
    const dispatch = useDispatch();

    const notify = () => toast.success('You deleted contact', {
        duration: 3000
    });

    const handleDelete = (id) => {
        dispatch(deleteContact(id));
        notify();
    };

    return ( 
        <>
            <h3><HiUserCircle /> {data.name}</h3>
            <h3><HiPhone/> {data.number}</h3>
            <button onClick={() => handleDelete(data.id)}>Delete</button>
            <Toaster />
        </>
    );
}

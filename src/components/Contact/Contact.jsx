import { HiMiniUserCircle, HiMiniPhone } from "react-icons/hi2";
import { useDispatch } from 'react-redux';
import { deleteContact } from "../../redux/contactsOps";

export default function Contact({ data }) {
    const dispatch = useDispatch();
    
    return (
        <>
            <h3><HiMiniUserCircle /> {data.name}</h3>
            <h3><HiMiniPhone/> {data.number}</h3>
            <button onClick={() => dispatch(deleteContact(data.id))}>Delete</button>
        </>
    )
}
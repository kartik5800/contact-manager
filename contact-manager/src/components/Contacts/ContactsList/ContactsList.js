import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ContsctsService } from '../../../services/ContactsService'
import Spinner from '../../Spinner/Spinner';


const ContactsList = () => {

    const [state, setState] = useState({
        loading: false,
        contacts: [],
        filterContacts: [],
        errorMessage: ''
    })


    const [query, setquery] = useState({

    })


    const handleSearch = (event) => {
        setquery({
            ...query,
            text: event.target.value
        });

        const thecontacts = state.contacts.filter(contact => {
            return contact.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setState({
            ...state,
            filterContacts: thecontacts
        })
    }

    const nevigate = useNavigate();

    // useEffect(() => {
    //     (async () => {
    //         try {


    //             setState({ ...state, loading: true });
    //             const response = await ContsctsService.getAllContacts();
    //             setState({
    //                 ...state,
    //                 loading: false,
    //                 contacts: response.data
    //             })
    //         } catch (error) {
    //             setState({
    //                 ...state,
    //                 loading: false,
    //                 errorMessage: error.message
    //             })

    //         }
    //     })

    // }, [])





    useEffect(() => {
        (async () => {
            setState({ ...state, loading: true });
            const response = await ContsctsService.getAllContacts();
            console.log(response.data);
            setState({
                ...state,
                loading: false,
                contacts: response.data,
                filterContacts: response.data
            })

        })();

    }, []);


    const handledelete = async (id) => {
        const response = await ContsctsService.deleteContacts(id)
        console.log('gfegrg', response.data);
        if (response) {
            setState({ ...state, loading: true });
            const response = await ContsctsService.getAllContacts();
            console.log(response.data);
            setState({
                ...state,
                loading: false,
                contacts: response.data
            })
        }

    }

    const { loading, contacts, errorMessage, filterContacts } = state;
    return (
        <>
            <section className='contactsearch'>
                <div className="container">
                    <div className="grid">
                        <div className="row">
                            <div className="col">
                                <p className='h3'>Contact Manager
                                    <Link to={'/contacts/add'} className='btn btn-primary m-2'> <i className='fa fa-plus-circle me-2' />
                                        New</Link>
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum beatae voluptatibus illo minima porro possimus enim aliquid fuga, facere sint, eaque recusandae. Modi, necessitatibus maiores.
                                </p>
                            </div>
                            <div>
                                <div className="col-6">
                                    <form className='row'>
                                        <div className="col mb-2">
                                            <input
                                                name=''
                                                value={query.name}
                                                onChange={handleSearch}
                                                type='text' className='form-control' placeholder='Serch name' />
                                        </div>
                                        <div className="col mb-2">
                                            <input type='submit' className='btn btn-outline-dark' value='Search' />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            {
                loading ? <Spinner /> :
                    <>
                        <section className='contacts-list'>
                            <div className="container">
                                <div className="row">
                                    {
                                        contacts.map(contact => {
                                            return (
                                                <div className="col-6" key={contact.id}>
                                                    <div className="card my-2 rounded-5">
                                                        <div className="card-body">
                                                            <div className="row align-items-center justify-content-around">
                                                                <div className="col-md-4">
                                                                    <img src={contact.photo} className='contact-img' />
                                                                </div>
                                                                <div className="col-md-7">
                                                                    <ul className='list-group'>
                                                                        <li className='list-group-item list-group-item-action'>
                                                                            Name:- <span>{contact.name}</span>
                                                                        </li>
                                                                        <li className='list-group-item list-group-item-action'>
                                                                            Mobile:- <span>{contact.mobile}</span>
                                                                        </li>
                                                                        <li className='list-group-item list-group-item-action'>
                                                                            Email:- <span>{contact.email}</span>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className="col-md-1 d-flex flex-column align-items-center">
                                                                    <Link to={`/contacts/view/${contact.id}`} className='btn btn-warning my-1'><i className='fa fa-eye' /></Link>
                                                                    <Link to={`/contacts/edit/${contact.id}`} className='btn btn-primary my-1'><i className='fa fa-pen' /></Link>
                                                                    <button className='btn btn-danger' onClick={() => handledelete(contact.id)}><i className='fa fa-trash' /></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })

                                    }



                                </div>
                            </div>


                        </section>
                    </>
            }

        </>
    )
}

export default ContactsList;

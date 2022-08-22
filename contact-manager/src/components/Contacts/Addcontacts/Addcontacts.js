import React, { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ContsctsService } from '../../../services/ContactsService';

const Addcontacts = () => {

    const [state, setState] = useState({
        loading: false,
        contact: {
            name: '',
            photo: '',
            mobile: '',
            email: '',
            company: '',
            title: '',
            group: ''

        },
        groups: [],
        errormessage: ''
    })

    const nevigate = useNavigate();

    const handleChange = (event) => {
        setState({
            ...state,
            contact: {
                ...state.contact,
                [event.target.name]: event.target.value
            }
        })

    }

    useEffect(() => {
        (async () => {
            setState({ ...state, loading: true })
            const response = await ContsctsService.getGroups();
            setState({
                ...state,
                loading: false,
                groups: response.data
            })



        })();
    }, [])





    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await ContsctsService.postContacts(state.contact);
        console.log('gfegrg', response.data);
        if (response) {
            nevigate('/contacts/list', { replace: true });
        } else {
            nevigate('/contacts/add', { replace: false });
        }
        setState({
            ...state,
            loading: false
        })


    }


    const { loading, errormessage, group, contact, groups } = state
    return (
        <>
            <section className='contacts-add'>


                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-success fw-bold"> Create contacts</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam non tenetur nesciunt pariatur voluptatibus eligendi? Expedita eaque alias autem praesentium quidem iusto temporibus voluptatem distinctio.
                            </p>

                        </div>

                    </div>
                    <div className="row d-flex align-items-center">
                        <div className="col-md-4">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-2">
                                    <input
                                        name='name'
                                        value={contact.name}
                                        onChange={handleChange}
                                        type='text' placeholder='Name' className='form-control' />
                                </div>
                                <div className="mb-2">
                                    <input
                                        name='photo'
                                        value={contact.photo}
                                        onChange={handleChange}
                                        type='text' placeholder='Photo URL' className='form-control' />
                                </div>
                                <div className="mb-2">
                                    <input
                                        name='mobile'
                                        value={contact.mobile}
                                        onChange={handleChange}
                                        type='number' placeholder='Mobile' className='form-control' />
                                </div>
                                <div className="mb-2">
                                    <input
                                        name='email'
                                        value={contact.email}
                                        onChange={handleChange}
                                        type='email' placeholder='Email' className='form-control' />
                                </div>
                                <div className="mb-2">
                                    <input
                                        name='company'
                                        value={contact.company}
                                        onChange={handleChange}
                                        type='text' placeholder='Compny ' className='form-control' />
                                </div>
                                <div className="mb-2">
                                    <input
                                        name='title'
                                        value={contact.title}
                                        onChange={handleChange}
                                        type='text' placeholder='Title' className='form-control' />
                                </div>
                                <div className="mb-2">
                                    <select
                                        name='group'
                                        value={contact.group}
                                        onChange={handleChange}
                                        className='form-control'>
                                        <option value=''>Select a Group</option>
                                        {
                                            groups.map(group => {
                                                return (
                                                    <option key={group.id} value={group.id}>{group.name}</option>
                                                )
                                            })

                                        }
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <input type='submit' className='btn btn-success' value='Create' />
                                    <Link to={'/contacts/list'} className='btn btn-dark ms-2'>Cancle</Link>
                                </div>

                            </form>
                        </div>
                        <div className="col-md-4">
                            <img src={contact.photo} alt="image" className='contact-img m-auto' />
                        </div>
                    </div>
                </div>


            </section>
        </>
    )
}

export default Addcontacts;
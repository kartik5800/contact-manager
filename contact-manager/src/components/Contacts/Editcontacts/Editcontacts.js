import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ContsctsService } from '../../../services/ContactsService';

const Editcontacts = () => {

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

    const { id } = useParams();

    useEffect(() => {
        (async () => {
            setState({ ...state, loading: false });
            const response = await ContsctsService.getConatact(id);
            const groupResponse = await ContsctsService.getGroups(response.data);


            setState({
                ...state,
                loading: false,
                contact: response.data,
                groups: groupResponse.data
            })

        })();

    }, [id]);


    const handleChange = (event) => {
        setState({
            ...state,
            contact: {
                ...state.contact,
                [event.target.name]: event.target.value
            }
        })

    }


    const handleupdate = async (event) => {
        event.preventDefault();
        const response = await ContsctsService.updateContact(state.contact, id);
        console.log('gfegrg', response.data);
        if (response) {
            nevigate('/', { replace: true });
        } else {
            nevigate(`/contacts/edit/${id}`, { replace: false });
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
                            <p className="h3 text-primary fw-bold"> Update contacts</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam non tenetur nesciunt pariatur voluptatibus eligendi? Expedita eaque alias autem praesentium quidem iusto temporibus voluptatem distinctio.
                            </p>

                        </div>

                    </div>
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <form onSubmit={handleupdate}>
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
                                    <input type='submit' className='btn btn-success' value='Update' />
                                    <Link to={'/contacts/list'} className='btn btn-dark ms-2'>Cancle</Link>
                                </div>

                            </form>
                        </div>
                        <div className="col-md-4">
                            <img src={contact.photo} className='contact-img' alt="" />
                        </div>
                    </div>
                </div>


            </section>
        </>
    )
}

export default Editcontacts;
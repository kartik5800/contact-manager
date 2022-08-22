import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { ContsctsService } from '../../../services/ContactsService';
import Spinner from '../../Spinner/Spinner';

const Viewcontacts = () => {

    const { id } = useParams();

    const [state, setState] = useState({
        loading: false,
        contact: [],
        errorMessage: '',
        group: {}
    });

    useEffect(() => {
        (async () => {
            setState({ ...state, loading: false });
            const response = await ContsctsService.getConatact(id);
            const groupResponse = await ContsctsService.getGroup(response.data);

            setState({
                ...state,
                loading: false,
                contact: response.data,
                group: groupResponse.data
            })

        })();

    }, [id]);

    const { loading, contact, errorMessage, group } = state;
    return (
        <>
            <section className='view-contects'>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-warning fw-bold mt-3" >View Contacts</p>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur sit repellat illo ipsam non, temporibus, voluptas rerum velit quidem inventore nesciunt earum veniam neque facilis!</p>
                        </div>

                    </div>
                </div>

            </section>

            {
                loading ? <Spinner /> :
                    <>
                        <section className='contacts-view'>
                            <div className="container ">
                                <div className="row">
                                    <div className="col-4">
                                        <img src={contact.photo} className='contact-img' alt="" />
                                    </div>
                                    <div className="col-8">
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
                                            <li className='list-group-item list-group-item-action'>
                                                Company:- <span>{contact.company}</span>
                                            </li>
                                            <li className='list-group-item list-group-item-action'>
                                                Title:- <span>{contact.title}</span>
                                            </li>
                                            <li className='list-group-item list-group-item-action'>
                                                Group:- <span>{group.name}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <Link to={'/contacts/list'} className='btn btn-dark' >Back</Link>
                                    </div>
                                </div>
                            </div>


                        </section>
                    </>
            }

        </>
    )
}

export default Viewcontacts;
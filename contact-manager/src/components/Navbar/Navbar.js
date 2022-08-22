import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <nav className='navbar navbar-dark bg-dark'>
                <div className="container">

                    <Link to={'/'} className='navbar-brand'><i className='fa fa-phone text-warning' />  contact <span className='text-warning bold'>manager</span></Link>
                    
                </div>

            </nav>
        </>
    )
}

export default Navbar;
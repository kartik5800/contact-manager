import React from 'react'
import spinnerimg from '../../asset/image/spinner.gif'

const Spinner = () => {

    return (

        <>
            <div>

                <img src={spinnerimg} alt="" className='d-block m-auto' style={{ width: '200px' }} />
            </div>
        </>
    )
}

export default Spinner;

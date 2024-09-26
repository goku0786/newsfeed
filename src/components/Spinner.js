import React, { Component } from 'react'
// import loading from '../assets/loading.gif'
import loader from '../assets/loader.gif'
// import loader1 from '../assets/loader1.gif'

export class Spinner extends Component {
    render() {
        return (
            <div className='text-center'>
                {/* <img src={loading} alt='loading' /> */}
                <img src={loader} alt='loading' />
                {/* <img src={loader1} alt='loading' /> */}
            </div>
        )
    }
}

export default Spinner

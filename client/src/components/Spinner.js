import React, { Fragment } from 'react'
import spinner from '../images/loading.gif';

export default () => (
    <Fragment>
        <img 
            src={spinner}
            style={{ height: '45vh', margin: '100px auto', display: 'block' }}
            alt='Loading...'
        />
    </Fragment>
)

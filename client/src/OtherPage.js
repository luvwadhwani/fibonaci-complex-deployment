import React from 'react';
import {Link} from 'react-router-dom'

class OtherPage extends React.Component {
    render() {
        return (
            <div>
                I am some other page
                <Link to="/"></Link>
            </div>
        )
    }
}

export default OtherPage
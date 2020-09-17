import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class LandingPage extends Component {
    render() {
        return (
            <div>
                <Link to="/login"><button className="btn btn-danger">Login</button></Link>
            </div>
        )
    }
}

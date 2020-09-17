import React, { Component } from 'react'
import axios from 'axios'
import { API } from '../core/constants/apiConstants'

const DOCUMENT_ACCEPTER = API.ENDPOINTS.DOCUMENT_ACCEPTER
const DOCUMENT_ACCEPTANCE = API.ENDPOINTS.DOCUMENT_ACCEPTANCE
const DOCUMENT_REJECTION = API.ENDPOINTS.DOCUMENT_REJECTION

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName:'',
            lastName:'',
            email:'',
            isLoading:false
        }
    }

    handleChange =(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleForm =()=>{
        this.setState({isLoading:true})
        let { firstName, lastName,email} = this.state
        let payload = {
            user_email: email,
            first_name: firstName,
            last_name: lastName
        }
        axios
            .post(DOCUMENT_ACCEPTER, payload,{
                headers:{
                    GrantType:"password"
                }
            })
            .then(res=>{
                if(res.status === 200){
                    this.setState({isLoading:false})
                    window.localStorage.setItem("token",res.data.User.access_token)
                    window.localStorage.setItem("userDetails", JSON.stringify(res.data.User))
                    this.props.history.push('/home')
                }
                console.log(res.data.User)
            })
            .catch(err=>console.log(err))
    }
    
    render() {
        console.log(this.state)
        return (
            <div className="mt-5 pt-5 text-center">
                <div className="mt-2">
                    <input type="text" name="firstName" placeholder="FirstName" onChange={this.handleChange} />
                </div>
                <div className="mt-2">
                    <input type="text" name="lastName" placeholder="LastName" onChange={this.handleChange} />
                </div>
                <div className="mt-2">
                    <input type="text" name="email" placeholder="Email" onChange={this.handleChange} />
                </div>
                <button className="btn btn-primary mt-2" onClick={this.handleForm}>SUBMIT</button>
                {
                    this.state.isLoading ?

                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                :
                null
            }
            </div>
        )
    }
}



            
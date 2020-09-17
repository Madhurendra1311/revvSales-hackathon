import React, { Component } from 'react'
import axios from 'axios'
import { API } from '../core/constants/apiConstants'

const LOGIN = API.ENDPOINTS.LOGIN

export default class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            email:'',
            password:'',
            org_domain:'ftm36g41',
            isLoading:false
        }
    }

    handleChange =(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleLogin =()=>{
        this.setState({isLoading:true})
        let { email, password, org_domain} = this.state
        let payload = {
            user_email: email,
            password: password,
            org_domain: org_domain
        }
        axios
            .post(LOGIN, payload,{
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
                    <input type="text" name="email" placeholder="Email" onChange={this.handleChange} />
                </div>
                <div className="mt-2">
                    <input type="text" name="password" placeholder="Password" onChange={this.handleChange} />
                </div>
                <button className="btn btn-primary mt-2" onClick={this.handleLogin}>Login</button>

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



            
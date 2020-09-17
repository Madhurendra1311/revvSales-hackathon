import React, { Component } from 'react'
import axios from 'axios'
import { API } from '../core/constants/apiConstants'

const GET_ALL_DOCUMENTS = API.ENDPOINTS.GET_ALL_DOCUMENTS
const NEW_DOCUMENT = API.ENDPOINTS.NEW_DOCUMENT

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userDetails: [],
            allDocs: [],
            isLoading: true,
            template_id: 1
        }
    }

    componentDidMount = () => {
        this.setState({
            isLoading: true,
            userDetails: JSON.parse(window.localStorage.getItem("userDetails"))
        })
        axios
            .get(GET_ALL_DOCUMENTS.replace('<PAGE_NUM>', 1), {
                headers: {
                    AccessToken: window.localStorage.getItem("token")
                }
            })
            .then(res => {
                this.setState({
                    isLoading: false,
                    allDocs: res.data.Templates
                })
            })
            .catch(err => console.log(err))
    }


    createDocument = () => {
        this.setState({
            isLoading: true
        })
        let payload = {
            template_id: this.state.template_id
        }
        axios
            .post(NEW_DOCUMENT,payload,{
                headers:{
                    AccessToken: window.localStorage.getItem("token")
                }
            })
            .then(res=>{
                if(res.status === 200){
                    this.setState({
                        isLoading: false
                    })
                    console.log(res.data)
                    alert('Document Created Successfully')
                }
            })
            .catch(err=>console.log(err))
    }
    render() {
        const { userDetails, allDocs, isLoading } = this.state
        return (
            <div>
                {
                    userDetails ?
                        <div>
                            {userDetails.first_name}
                        </div>
                        :
                        null
                }
                {
                    !isLoading ?
                        <div>
                            {
                                allDocs && allDocs.length > 0 ?
                                    <div>
                                        {
                                            allDocs.map(data => {
                                                return (
                                                    <div>{data.title}</div>
                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    null
                            }
                        </div>
                        :
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                }
                <button onClick={this.createDocument}>Create Document</button>
            </div>
        )
    }
}

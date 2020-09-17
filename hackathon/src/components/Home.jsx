import React, { Component } from 'react'
import axios from 'axios'
import { API } from '../core/constants/apiConstants'
import { Link } from 'react-router-dom'


const GET_ALL_DOCS = API.ENDPOINTS.GET_ALL_DOCS


export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userDetails: [],
            allDocs: [],
            isLoading: true,
            pageNum: 1,
            totalPage: 1,
        }
    }

    componentDidMount = () => {
        const { pageNum } = this.state
        this.setState({
            isLoading: true,
            userDetails: JSON.parse(window.localStorage.getItem("userDetails"))
        })
        axios
            .get(GET_ALL_DOCS.replace('<PAGE_NUM>', pageNum), {
                headers: {
                    AccessToken: window.localStorage.getItem("token")
                }
            })
            .then(res => {
                console.log(res.data)
                this.setState({
                    isLoading: false,
                    allDocs: res.data.page.inodes,
                    totalPage: res.data.page.count
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        const { userDetails, allDocs, isLoading, allTemp } = this.state
        console.log(allDocs)
        return (
            <div>
                {
                    !isLoading ?
                        <div>
                            {
                                userDetails ?
                                    <div>
                                        {userDetails.first_name}
                                    </div>
                                    :
                                    null
                            }

                            <div>
                                <Link to="/createdocument"><button>Create Document</button></Link>
                                <Link to="/form"><button>Acceptors</button></Link>
                            </div>
                                    
                            {
                                allDocs && allDocs.length > 0 ?
                                <div>
                                    {
                                        allDocs.map(data=>{
                                            return(
                                                <div>
                                                    <h2>{data.name}</h2>
                                
                                                </div>
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
            </div>
        )
    }
}

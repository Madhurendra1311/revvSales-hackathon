import React, { Component } from 'react'
import axios from 'axios'
import { API } from '../core/constants/apiConstants'

const GET_ALL_TEMP = API.ENDPOINTS.GET_ALL_TEMP
const GET_ALL_DOCS = API.ENDPOINTS.GET_ALL_DOCS
const NEW_DOCUMENT = API.ENDPOINTS.NEW_DOCUMENT
const DOCUMENT_ACCEPTER = API.ENDPOINTS.DOCUMENT_ACCEPTER
const DOCUMENT_ACCEPTANCE = API.ENDPOINTS.DOCUMENT_ACCEPTANCE
const DOCUMENT_REJECTION = API.ENDPOINTS.DOCUMENT_REJECTION


export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userDetails: [],
            allTemp: [],
            allDocs: [],
            isLoading: true,
            templateId: 1,
            pageNum: 1,
            totalPage: 1,
            documentName:''
        }
    }

    componentDidMount = () => {
        const { pageNum } = this.state
        this.setState({
            isLoading: true,
            userDetails: JSON.parse(window.localStorage.getItem("userDetails"))
        })
        axios
            .get(GET_ALL_TEMP.replace('<PAGE_NUM>', 1), {
                headers: {
                    AccessToken: window.localStorage.getItem("token")
                }
            })
            .then(res => {
                console.log("res",res)
                this.setState({
                    allTemp: res.data.Templates
                })
            })
            .catch(err => console.log(err))

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


    createDocument = () => {
        const { documentName, templateId } = this.state
        this.setState({
            isLoading: true
        })
        let payload ={}
        if(documentName.length > 0){
            payload = {
                template_id: Number(templateId),
                title: documentName
            }
        }
        else{
            payload = {
                template_id:  Number(templateId)
            }
        }

        axios
            .post(NEW_DOCUMENT, payload, {
                headers: {
                    AccessToken: window.localStorage.getItem("token")
                }
            })
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        isLoading: false
                    })
                    console.log(res.data)
                    alert('Document Created Successfully')
                }
            })
            .catch(err => console.log(err))
    }

    documentNameChange =(e)=>{
        this.setState({
            documentName: e.target.value
        })
    }

    templateChange = (e)=>{
        this.setState({
            templateId: e.target.value
        })
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
                            {
                                <div>
                                    {
                                        allTemp && allTemp.length > 0 ?
                                            <select onChange={this.templateChange}>
                                                <option defaultValue> Select Document Type</option>
                                                {
                                                    allTemp.map(data => {
                                                        return (
                                                            <option value={data.id}>{data.title}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            :
                                            null
                                    }
                                        <input type="text" placeholder="Document Name(Optional)" onChange={this.documentNameChange}/>
                                        <button onClick={this.createDocument}>Create Document</button>
                                </div>
                            }
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

import React, { Component } from 'react'
import axios from 'axios'
import { API } from '../core/constants/apiConstants'
import styled from "styled-components"


const GET_ALL_TEMP = API.ENDPOINTS.GET_ALL_TEMP
const NEW_DOCUMENT = API.ENDPOINTS.NEW_DOCUMENT

const Wrapper = styled.div`
    height: 80px;
    width: 100%;
    background-color: #202020;
    margin: auto;
    margin-top: 10px;
   
   position: relative;
   padding: 10px;
`

const ContDiv = styled.div`
    position: absolute;
    bottom: 200px;
    right: 300px;
`

export default class createDocument extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allTemp: [],
            isLoading: true,
            templateId: 1,
            documentName:'',
        }
    }

    componentDidMount = () => {
        this.setState({
            isLoading: true
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
                    isLoading:false,
                    allTemp: res.data.Templates
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
        const { isLoading, allTemp } = this.state
        return (
            <div>
            <Wrapper>
                
            </Wrapper>
            <div>
                <img width="100%" src="https://static.energyresourcing.com/wp-content/uploads/2019/02/22105030/recruitment-agency-gives-you-access-to-talent-pool.jpg" class="img-fluid" alt="https://static.energyresourcing.com/wp-content/uploads/2019/02/22105030/recruitment-agency-gives-you-access-to-talent-pool.jpg" />
                <div class="carousel-caption ">
                    <ContDiv>
                    {
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                {
                    allTemp && allTemp.length > 0 ?
                        <select style = {{outline: "none", border: "none",
                            borderRadius: 5,
                            width: 300,
                            margin: 10,
                            padding: 10}} onChange={this.templateChange}>
                            <option  defaultValue> Select Document Type</option>
                            {
                                allTemp.map(data => {
                                    return (
                                        <option  value={data.id}>{data.title}</option>
                                    )
                                })
                            }
                        </select>
                        :
                        null
                }
                    <input style = {{outline: "none", border: "none",
                                        borderRadius: 5,
                                        width: 300,
                                        margin: 10,
                                        padding: 10}} type="text" placeholder="Title" onChange={this.documentNameChange}/>
                    <button style = {{outline: "none", border: "none",
                            borderRadius: 5,
                            width: 300,
                            margin: 10,
                            padding: 10}} onClick={this.createDocument}>Create Document</button>
            </div>
        }
                    </ContDiv>
                </div>

            </div>

        </div> 
        )
    }
}

{/* <div>
                {
                    !isLoading ?
                        <div>
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


                        </div>
                        :
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                }
            </div> */}
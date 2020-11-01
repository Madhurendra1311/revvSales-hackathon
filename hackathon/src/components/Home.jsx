import React, { Component } from 'react'
import axios from 'axios'
import { API } from '../core/constants/apiConstants'
import { Link } from 'react-router-dom'
import styled from "styled-components"

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

    handleSendRequest = (docId) => {
        window.localStorage.setItem("docId", docId)
        this.props.history.push('/form')
    }
 automate = async() => {
        const response = await axios({
          method: "post",
          url: "http://localhost:5000/screenshot",
          data: {
            "email": "kmadhu1311@gmail.com",
            "password": "madhu@1311",
          },
        })
        console.log(response)
      }

    render() {
        const { userDetails, allDocs, isLoading } = this.state
        console.log(allDocs)
        return (
            <div style = {{backgroundColor: "#111544" }}>
                <Wrapper>

                </Wrapper>
                <div>
                    <img width="100%" src="https://static.energyresourcing.com/wp-content/uploads/2019/02/22105030/recruitment-agency-gives-you-access-to-talent-pool.jpg" class="img-fluid" alt="https://static.energyresourcing.com/wp-content/uploads/2019/02/22105030/recruitment-agency-gives-you-access-to-talent-pool.jpg" />
                    <div class="carousel-caption ">
                        {
                            // !isLoading ?
                            <div>
                                <ContDiv>
                                    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                                        {
                                            userDetails ?
                                                <div>
                                                    Welcome{" "}{userDetails.first_name}
                                                </div>
                                                :
                                                null
                                        }

                                        <div>
                                            <Link to="/createdocument"><button style={{
                                                outline: "none", border: "none",
                                                borderRadius: 5,
                                                width: 300,
                                                margin: 10,
                                                padding: 10
                                            }}>Create Document</button></Link>
                                        </div>
                                    </div>
                                </ContDiv>


                                {/* <button onClick={this.automate}>Automate</button> */}


                                
                            </div>
                            
                        }
                    </div>
                    {
                                    allDocs && allDocs.length > 0 ?
                                        <div>
                                            <table class="table" style = {{textAlign: "center" }}>
                                                <thead class="thead-dark">
                                                    <tr>
                                                        <th scope="col">Documents</th>
                                                        <th scope="col">Send Request</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        allDocs.map(data => {
                                                            return (
                                                                <tr>
                                                                    <th scope="row" style = {{color: "white"}}>{data.name}</th>
                                                                    <td> <button style={{
                                                outline: "none", border: "none",
                                                borderRadius: 5,
                                                width: 200,
                                                margin: 10,
                                                padding: 10
                                            }}onClick={() => this.handleSendRequest(data.id)}>Click here</button></td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        :
                                        null
                                }

                </div>
            </div>
        )
    }
}



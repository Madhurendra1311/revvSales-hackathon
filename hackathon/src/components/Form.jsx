import React, { Component } from 'react'
import axios from 'axios'
import { API } from '../core/constants/apiConstants'
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

const DOCUMENT_ACCEPTER = API.ENDPOINTS.DOCUMENT_ACCEPTER
// const DOCUMENT_ACCEPTANCE = API.ENDPOINTS.DOCUMENT_ACCEPTANCE
// const DOCUMENT_REJECTION = API.ENDPOINTS.DOCUMENT_REJECTION

export default class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            acceptors:[],
             email:"",
             firstName:"",
             lastName:"",
             count:0,
             isAddMore: true,
             isLoading: false
        }
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleAdd = () =>{
        const { acceptors, email, firstName, lastName } = this.state
        this.setState({
            acceptors:[...acceptors, {"user_email": email, "first_name": firstName, "last_name": lastName}],
            email:'',
            firstName:'',
            lastName:'',
            isAddMore:false
        })

    }

    handleAddMore = () =>{
        this.setState({
            isAddMore:true
        })
    }

    handleSubmit = () =>{
        this.setState({
            isLoading:false
        })
        const { acceptors } = this.state
        const DOCUMENT_ID = Number(window.localStorage.getItem("docId"))
        let payload = {
            acceptors: acceptors,
            email_message: "Check this sample Documents"
        }
        axios
        .post(DOCUMENT_ACCEPTER.replace('<DOCUMENT_ID>', DOCUMENT_ID-1),payload, {
            headers: {
                AccessToken: window.localStorage.getItem("token")
            }
        })
        .then(res => {
            console.log("res",res)
            this.setState({
                isLoading:false
            })
        })
        .catch(err => console.log(err))
        console.log(payload)
    }
    
    render() {
        const { acceptors, email, firstName, lastName, isAddMore } = this.state
        console.log(acceptors)
        return (
            <div>
                <div>
                    <Wrapper>

                    </Wrapper>
                    <div>
                    <img width="100%" src="https://static.energyresourcing.com/wp-content/uploads/2019/02/22105030/recruitment-agency-gives-you-access-to-talent-pool.jpg" class="img-fluid" alt="https://static.energyresourcing.com/wp-content/uploads/2019/02/22105030/recruitment-agency-gives-you-access-to-talent-pool.jpg" />
                    <div class="carousel-caption ">
                        <ContDiv>
                        {
                    isAddMore ?
                        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                                            <input style={{
                                                outline: "none", border: "none",
                                                borderRadius: 5,
                                                width: 300,
                                                margin: 10,
                                                padding: 10
                                            }} type="text" onChange={this.handleChange} name="email" placeholder="Email" value={email} />

                                            <input style={{
                                                outline: "none", border: "none",
                                                borderRadius: 5,
                                                width: 300,
                                                margin: 10,
                                                padding: 10
                                            }} type="text" onChange={this.handleChange} name="firstName" placeholder="First Name" value={firstName} />

                                            <input style={{
                                                outline: "none", border: "none",
                                                borderRadius: 5,
                                                width: 300,
                                                margin: 10,
                                                padding: 10
                                            }} type="text" onChange={this.handleChange} name="lastName" placeholder="Last Name" value={lastName} />

                                            <button style={{
                                                outline: "none", border: "none",
                                                borderRadius: 5,
                                                width: 300,
                                                margin: 10,
                                                padding: 10
                                            }} onClick={this.handleAdd}>Add</button>
                                        </div>
                                   

                        :
                        <div>
                            <button style = {{outline: "none", border: "none",
                            borderRadius: 5,
                            width: 300,
                            margin: 10,
                            padding: 10}} onClick={this.handleAddMore}>Add More</button>

                        </div>

                }
                {
                    acceptors.length > 0 ?
                        <div>
                            <button style = {{outline: "none", border: "none",
                            borderRadius: 5,
                            width: 300,
                            margin: 10,
                            padding: 10}} onClick={this.handleSubmit}>Submit</button>
                        </div>

                        :
                        null
                }
                        </ContDiv>
                    </div>
                    </div>
                </div>
                
                {/* <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    {
                        !isAddMore ?
                            <div>
                                <button onClick={this.handleAddMore}>Add More</button>

                            </div>
                            :
                            null
                    }
                    {
                        acceptors.length > 0 ?
                            <div>
                                <button onClick={this.handleSubmit}>Submit</button>
                            </div>

                            :
                            null
                    }
                </div> */}





                <div>
                    {
                        acceptors && acceptors.length > 0 ?
                            <div>
                                {
                                    acceptors.map(e => {
                                        return (
                                            <h1>{e.user_email}</h1>
                                        )
                                    })
                                }
                            </div>
                            :
                            null
                    }
                </div>
            </div>
        )
    }
}







            // <div>
            //     {
            //         isAddMore ?
            //             <div>
            //                 <Wrapper>

            //                 </Wrapper>
            //                 <div>
            //                     <img width="100%" src="https://static.energyresourcing.com/wp-content/uploads/2019/02/22105030/recruitment-agency-gives-you-access-to-talent-pool.jpg" class="img-fluid" alt="https://static.energyresourcing.com/wp-content/uploads/2019/02/22105030/recruitment-agency-gives-you-access-to-talent-pool.jpg" />
            //                     <div class="carousel-caption ">
            //                         <ContDiv>
            //                             <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            //                                 <input style={{
            //                                     outline: "none", border: "none",
            //                                     borderRadius: 5,
            //                                     width: 300,
            //                                     margin: 10,
            //                                     padding: 10
            //                                 }} type="text" onChange={this.handleChange} name="email" placeholder="Email" value={email} />

            //                                 <input style={{
            //                                     outline: "none", border: "none",
            //                                     borderRadius: 5,
            //                                     width: 300,
            //                                     margin: 10,
            //                                     padding: 10
            //                                 }} type="text" onChange={this.handleChange} name="firstName" placeholder="First Name" value={firstName} />

            //                                 <input style={{
            //                                     outline: "none", border: "none",
            //                                     borderRadius: 5,
            //                                     width: 300,
            //                                     margin: 10,
            //                                     padding: 10
            //                                 }} type="text" onChange={this.handleChange} name="lastName" placeholder="Last Name" value={lastName} />

            //                                 <button style={{
            //                                     outline: "none", border: "none",
            //                                     borderRadius: 5,
            //                                     width: 300,
            //                                     margin: 10,
            //                                     padding: 10
            //                                 }} onClick={this.handleAdd}>Add</button>
            //                             </div>
            //                         </ContDiv>



            //                     </div>

            //                 </div>


            //             </div>
            //             :
            //             null
            //     }
            //     <Wrapper>

            //     </Wrapper>
            //     <div>
            //         <img width="100%" src="https://static.energyresourcing.com/wp-content/uploads/2019/02/22105030/recruitment-agency-gives-you-access-to-talent-pool.jpg" class="img-fluid" alt="https://static.energyresourcing.com/wp-content/uploads/2019/02/22105030/recruitment-agency-gives-you-access-to-talent-pool.jpg" />
            //         <div class="carousel-caption ">
            //             <ContDiv >
            //                 <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            //                     {
            //                         !isAddMore ?
            //                             <div>
            //                                 <button  onClick={this.handleAddMore}>Add More</button>

            //                             </div>
            //                             :
            //                             null
            //                     }
            //                     {
            //                         acceptors.length > 0 ?
            //                             <div>
            //                                 <button onClick={this.handleSubmit}>Submit</button>
            //                             </div>

            //                             :
            //                             null
            //                     }
            //                 </div>
            //             </ContDiv>

            //         </div>

            //     </div>
            //     <div>
            //         {
            //             acceptors && acceptors.length > 0 ?
            //                 <div>
            //                     {
            //                         acceptors.map(e => {
            //                             return (
            //                                 <h1>{e.user_email}</h1>
            //                             )
            //                         })
            //                     }
            //                 </div>
            //                 :
            //                 null
            //         }
            //     </div>
            // </div>




           
            

            // <div>
            //     {
            //     isAddMore?
            //     <div>
            //         <Wrapper>
                    
            //         </Wrapper>
            //     <div>
            //         <img width = "100%" src = "https://static.energyresourcing.com/wp-content/uploads/2019/02/22105030/recruitment-agency-gives-you-access-to-talent-pool.jpg" class = "img-fluid" alt = "https://static.energyresourcing.com/wp-content/uploads/2019/02/22105030/recruitment-agency-gives-you-access-to-talent-pool.jpg"/>
            //         <div class="carousel-caption ">
            //         <input type="text" onChange={this.handleChange} name="email" placeholder="Email" value={email}/>
            //         <br></br>
            //         <input type="text" onChange={this.handleChange} name="firstName" placeholder="First Name" value={firstName}/>
            //         <br></br>
            //         <input type="text" onChange={this.handleChange} name="lastName" placeholder="Last Name" value={lastName}/>
            //         <br></br>
            //         <button onClick={this.handleAdd}>Add</button>
            //         <br></br>
            //     </div>
                    
            //     </div>

                    
            //      </div>
            //      :
            //      null
            //     }

            //     {
            //         !isAddMore?
            //         <div>
            //             <button onClick={this.handleAddMore}>Add More</button>
            //             <br></br>
            //         </div>
            //         :
            //         null
            //     }
            //     {
            //         acceptors.length > 0 ?
            //         <button onClick={this.handleSubmit}>Submit</button>
            //         :
            //         null
            //     }
                
            //     <div>
            //         {
            //             acceptors && acceptors.length > 0?
            //             <div>
            //                 {
            //                     acceptors.map(e=>{
            //                         return(
            //                             <h1>{e.user_email}</h1>
            //                         )
            //                     })
            //                 }
            //             </div>
            //             :
            //             null
            //         }
            //     </div>
            // </div> 

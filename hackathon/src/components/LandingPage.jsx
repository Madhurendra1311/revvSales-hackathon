import React, { Component } from 'react'
import {Link} from 'react-router-dom'
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

const NavLink = styled.a`
  text-decoration: none;
  color: white;
  margin-left: 40px;
  font-size: 24px;
  

  &: hover{
    cursor: pointer;
    color: #cef0ec;
  }

  @media all and (max-width: 620px) {
    font-size: 16px;
  }

  `

const ResourceLinks = styled.div`
 font-weight: 600;
  position: absolute;
  top: 22px;
  right: 30px;
  letter-spacing: 1px;
  @media all and (max-width: 620px) {
    top: 40px;
  }
`;

const Header = styled.h3`
  color: "#001933";
  font-size: 36px;
  text-align:
  
  
 
`


export default class LandingPage extends Component {
    render() {
        return (
            <div>
                <Wrapper>
                    <Link to="/login">
                        <ResourceLinks>
                            <NavLink >LOGIN</NavLink>
                        </ResourceLinks>
                    </Link>
                </Wrapper>
                <div>
                    <img width = "100%" src = "https://static.energyresourcing.com/wp-content/uploads/2019/02/22105030/recruitment-agency-gives-you-access-to-talent-pool.jpg" class = "img-fluid" alt = "https://static.energyresourcing.com/wp-content/uploads/2019/02/22105030/recruitment-agency-gives-you-access-to-talent-pool.jpg"/>
                    <div class="carousel-caption ">
                    <Header>Making Recruiting Simple</Header>
            </div>
                    
                </div>

            </div>     
        )
    }
}

{/* <div>
                <Link to="/login"><button className="btn btn-danger">Login</button></Link>
            </div> */}
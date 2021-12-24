import React from 'react'
// import styles from '../styles.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar, Container } from 'react-bootstrap'

function Header({name,surname,currenciesOwned, setCurrenciesOwned,lastUpdate}) {
    return (
            <Navbar  >
                <Container >
                    <Navbar.Toggle />
                    <Navbar.Collapse  className="justify-content-between ">
                        <Navbar.Brand className="logo">QbicaCurrencyApp</Navbar.Brand>
                        <Navbar.Text className="navText">
                            <div >Total Worth: $10000</div>
                            <div>{lastUpdate.map((item, i) =>
                                <div key={i}> {item.name}:{item.value}</div>
                            )}</div>
                        </Navbar.Text>
                        <Navbar.Text className="navText">
                            <div>Welcome <a href="#login">{name} {surname}</a> <img src="https://picsum.photos/id/237/200/300" alt="profile pic" width={17} className="rounded-circle" /></div>
                            <div><button>Log out</button></div>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    )
}

export default Header;

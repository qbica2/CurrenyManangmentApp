import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Container, Toast } from 'react-bootstrap'



function Tablex({searchInput,setSearchInput, alert, setAlert, amount, setAmount, baseCode, setBaseCode, targetCode, setTargetCode, modalInfo, setModalInfo, filteredData, setFilteredData, setData, rate, setRate, showModal, setShowModal, currenciesOwned, setCurrenciesOwned, amountOfCurrencyToChange, setAmountOfCurrencyToChange ,data}) {

    const [buttonModal,setButtonModal]=useState(false)
    const [buyOrSell,setBuyOrSell]=useState("")


    const handleShow = (e) => {
            setButtonModal(true)

            if(e.target.innerHTML==="BUY") {
                
                setTargetCode(currenciesOwned[Number(e.target.id)].name)
                setBuyOrSell("BUY")
            }

            if(e.target.innerHTML==="SELL") {
                setBaseCode(currenciesOwned[Number(e.target.id)].name)
                setBuyOrSell("SELL")
            }
    }

    const handleClose= () => {
        setButtonModal(false)
    }



    const tickHandler = (e) => {


        if (e.target.checked) {
            currenciesOwned.map((item) => 
                item.isTick = false
            )
        }
        setCurrenciesOwned(currenciesOwned.map(item => {
            if (item.id === Number(e.target.id)) {
                if (item.isTick === false) {
                    return {
                        ...item,
                        isTick: true
                    }

                } else {
                    return {
                        ...item,
                        isTick: false
                    }
                }
            } else {
                return {
                    ...item,
                    isTick: false
                }
            }
        }
        ))
    }

    const exchangeHandle =(e)=>{
        e.preventDefault()
        if (amount === "" || amount <= 0) {
            setAlert(true)
            return false;
        }

        if (amount > amountOfCurrencyToChange) {
            setAlert(true)
            return false;
        }

        setCurrenciesOwned(currenciesOwned.map((item) => {

            if (item.name === targetCode) {
                return {
                    name: targetCode, value: item.value + amount * rate, isTick: false
                }
            }
            if (item.name === baseCode) {
                return {
                    name: baseCode, value: item.value - amount,isTick: false
                }
            } else {
                return {
                    ...item,
                }
            }
        }))



    }

    return (
        <div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Acronym</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>x</th>
                    </tr>
                </thead>
                <tbody>
                    {currenciesOwned.map((item, i) =>
                        <tr key={i}>
                            <td>
                                <input id={i} type="checkbox" checked={item.isTick} onClick={tickHandler} onChange={()=>{}}/>
                            </td>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                {item.value}
                            </td>
                            <td>
                                <Button id={i} variant="success" disabled={!item.isTick} size="sm" onClick={handleShow}>BUY</Button>
                                <Button id={i} variant="danger" disabled={!item.isTick} size="sm" onClick={handleShow}>SELL</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Modal show={buttonModal} onHide={handleClose}>
                    <Container>
                        <Modal.Header closeButton className="justify-content-between ">
                        
                            {currenciesOwned.map((item, i) =>
                                buyOrSell==="BUY" ?
                                <Button id={i} key={i} onClick={() => setBaseCode(item.name)}>{item.name}</Button> 
                                : <Button id={i} key={i} onClick={() => setTargetCode(item.name)}>{item.name}</Button>
                            )}
                            {baseCode} to {targetCode}
                        </Modal.Header>
                    </Container>
                    <Modal.Body>
                        <div> Rate: {rate} </div>
                        <form action="">
                            <label htmlFor="amount">Amount</label>
                            <input
                                type="number"
                                name="amount"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                            />
                        </form>
                        <Toast className="d-inline-block m-1" bg="danger" show={alert} onClose={() => setAlert(false)} dismissible>
                            <Toast.Header>
                                <strong className="me-auto">ERROR!</strong>
                            </Toast.Header>
                            <Toast.Body>invalid transaction
                            </Toast.Body>
                        </Toast>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={exchangeHandle}>
                            EXCHANGE
                        </Button>
                    </Modal.Footer>
                </Modal>
        </div>
    )
}

export default Tablex;

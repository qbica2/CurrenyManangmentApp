import React, { useState, useEffect } from 'react'
import { Modal, Button, Container, Toast } from 'react-bootstrap'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';



function Search({alert,setAlert,amount,setAmount,baseCode,setBaseCode,targetCode,setTargetCode,modalInfo,setModalInfo,filteredData,setFilteredData,data,setData,rate,setRate,showModal,setShowModal,searchInput,setSearchInput,currenciesOwned,setCurrenciesOwned,amountOfCurrencyToChange,setAmountOfCurrencyToChange,lastUpdate,setLastUpdate}) {
    

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);

    }

    useEffect(() => {

        setFilteredData(data.filter((item) => {
            if(searchInput===""){
                return false;
            }

            return item[Object.keys(item)[0]].toLowerCase().includes(searchInput.toLowerCase());

        }))
        
    },[searchInput])

    useEffect(() => {

        const getDataFromApi = async () => {
            try {
                await axios(`https://v6.exchangerate-api.com/v6/5290f9a8634b5896f908f62f/codes`)
                    .then(res => setData(res.data.supported_codes))
            } catch (err) {
                if (err.response) {
                    console.error(err.response.data)
                }
            }
        }
        getDataFromApi();

    }, [])


    useEffect(() => {
        
        const getRateFromApi = async () => {
            try {
                await axios(`https://v6.exchangerate-api.com/v6/5290f9a8634b5896f908f62f/pair/${baseCode}/${targetCode}`)
                    .then(res => setRate(res.data.conversion_rate))
            } catch (err) {
                if (err.response) {
                    console.error(err.response.data)
                }
            }
        }
        getRateFromApi();
        // setInterval(getRateFromApi,120000);
        

        lastUpdate.map((item,i) => {
            
            localStorage.setItem(item.name,item.value)
        })

    }, [showModal, baseCode, lastUpdate,targetCode])

    useEffect(() =>{
        let arrayOfCurrencyToChange = (lastUpdate.filter((item) => {
            return Object.values(item).includes(baseCode);
        }))
        setAmountOfCurrencyToChange(arrayOfCurrencyToChange[0].value)
    },[])

    const handleShow = (e) => {

        setModalInfo(e.target.innerHTML)

        setTargetCode(e.target.innerText.slice(0, 3))

        setShowModal(true)

    }

    const handleClose = () => {
        setShowModal(false)
    }

    const exchangeHandle = (e) => {
        e.preventDefault()
        if (amount === "" || amount <= 0) {
            setAlert(true)
            return false;
        }

        if (amount > amountOfCurrencyToChange) {
            setAlert(true)
            return false;
        }

        if(targetCode === "" || baseCode===""){
            setAlert(true)
            return false;
        }


        if (lastUpdate.filter((item) => item.name === targetCode).length === 0) {
            lastUpdate.map((item) => {
                if (item.name === baseCode) {

                    item.value -= amount

                }
            })
            setLastUpdate([
                ...lastUpdate,
                { name: targetCode, value: amount * rate, isTick: false }
            ])

        } else {
            setLastUpdate(lastUpdate.map((item) => {

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
        setShowModal(false)
    }

    return (
        <div className="container">
            
                <input
                    type="search"
                    placeholder="What are you looking for"
                    className="form-control"
                    value={searchInput.toUpperCase()}
                    onChange={(e) => searchItems(e.target.value)} />
                <ul>
                    {filteredData.map((data, i) => (
                        <li id={i} onClick={handleShow} className="data" key={i}>{data[0]}-{data[1]}</li>
                    ))
                    }
                </ul>
                <Modal show={showModal} onHide={handleClose}>
                    <Container>
                        <Modal.Header closeButton className="justify-content-between ">

                            {lastUpdate.map((item, i) =>
                                <Button className="modal-top-button" key={i} onClick={() => setBaseCode(item.name)}>{item.name}</Button>
                            )}
                            {baseCode} to {modalInfo}
                        </Modal.Header>
                    </Container>
                    <Modal.Body>
                        <div> Rate: {rate} </div>
                        
                            <label htmlFor="amount">Amount: </label>
                            <input
                                type="number"
                                name="amount"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                            />
                        
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

export default Search;

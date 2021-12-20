import React , {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './styles.module.css'

import Header from "./components/Header"
import Search from "./components/Search"
import Tablex from "./components/Tablex"
import Footer from "./components/Footer"

function Main() {
    const [searchInput, setSearchInput] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [rate, setRate] = useState();
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [modalInfo, setModalInfo] = useState("");
    const [baseCode, setBaseCode] = useState("USD")
    const [targetCode, setTargetCode] = useState("")
    const [amount, setAmount] = useState(0)
    const [alert, setAlert] = useState(false);
    const [amountOfCurrencyToChange, setAmountOfCurrencyToChange] = useState(0)

    const [currenciesOwned, setCurrenciesOwned] = useState([
        {isTick: false, name: "USD", value: 10000 },
        {isTick: false, name: "TRY", value: 0 }
    ])

    let name= localStorage.name
    let surname=localStorage.surname
    return (
        <div >
            <Header name={name} surname={surname} currenciesOwned={currenciesOwned} setCurrenciesOwned={setCurrenciesOwned}/>
            <Search 
            filteredData={filteredData} setFilteredData={setFilteredData} 
            data={data} setData={setData} 
            rate={rate} setRate={setRate} 
            showModal={showModal} setShowModal={setShowModal} 
            searchInput={searchInput} setSearchInput={setSearchInput} 
            currenciesOwned={currenciesOwned} setCurrenciesOwned={setCurrenciesOwned}
            modalInfo={modalInfo} setModalInfo={setModalInfo} 
            baseCode={baseCode} setBaseCode={setBaseCode}
            targetCode={targetCode} setTargetCode={setTargetCode}
            amount={amount} setAmount={setAmount}
            alert={alert} setAlert={setAlert}
            amountOfCurrencyToChange={amountOfCurrencyToChange} setAmountOfCurrencyToChange={setAmountOfCurrencyToChange}
            />
            <Tablex 
            filteredData={filteredData} setFilteredData={setFilteredData} 
            data={data} setData={setData} rate={rate} setRate={setRate} 
            showModal={showModal} setShowModal={setShowModal} 
            searchInput={searchInput} setSearchInput={setSearchInput}
            currenciesOwned={currenciesOwned} setCurrenciesOwned={setCurrenciesOwned} 
            modalInfo={modalInfo} setModalInfo={setModalInfo}
            baseCode={baseCode} setBaseCode={setBaseCode}
            targetCode={targetCode} setTargetCode={setTargetCode}
            amount={amount} setAmount={setAmount}
            alert={alert} setAlert={setAlert}
            amountOfCurrencyToChange={amountOfCurrencyToChange} setAmountOfCurrencyToChange={setAmountOfCurrencyToChange}
            />
            <Footer currenciesOwned={currenciesOwned}/>
        </div>
        
    )
}

export default Main;

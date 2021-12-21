import React , {useEffect,useState} from 'react'
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
    const [localData, setLocalData] = useState([])
    const [currencyInLocal,setCurrencyInLocal]=useState([])
    const [lastUpdate, setLastUpdate] = useState([
        {isTick: false, name: "USD", value: 10000 },
    ])

    const [currenciesOwned, setCurrenciesOwned] = useState([
        {isTick: false, name: "USD", value: 10000 },
        
    ])

    let name= localStorage.name
    let surname=localStorage.surname

    
    useEffect(() =>{
        setLocalData(data.map((item)=>{
            
            return item[0];
        }))
    },[data])

    useEffect(() =>{
        setCurrencyInLocal(localData.filter((item)=>{
            if(localStorage.hasOwnProperty(item)){
                return item;
            }
        }))
    },[localData])



    useEffect(() =>{
        setLastUpdate(currencyInLocal.map((item,i)=>{
            return{
                name: item , value: localStorage.getItem(item), isTick: false
            }
        }))
    },[currencyInLocal])

    useEffect(() => {
        lastUpdate.map((item,i)=>{
            item.id=i
        })
    },[lastUpdate])




    return (
        <div >
            <Header name={name} surname={surname} currenciesOwned={currenciesOwned} setCurrenciesOwned={setCurrenciesOwned} lastUpdate={lastUpdate} setLastUpdate={setLastUpdate}/>
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
            lastUpdate={lastUpdate} setLastUpdate={setLastUpdate}
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
            lastUpdate={lastUpdate} setLastUpdate={setLastUpdate}
            />
            <Footer currenciesOwned={currenciesOwned} lastUpdate={lastUpdate}/>
        </div>
        
    )
}

export default Main;

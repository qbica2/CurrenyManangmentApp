import React,{useState,useEffect} from 'react'

function Footer({currenciesOwned}) {

    const [date,setDate]=useState("")
    const [time,setTime]=useState()
    const [minutes,setMinutes]=useState()

    let today = new Date();

useEffect(() => {
    
      setDate(`${today.getDate()}.${today.getMonth()+1}.${today.getFullYear()}`);
      setTime(today.getHours());
      setMinutes(today.getMinutes())

setInterval(() => {
    setMinutes((m)=>
    m+1)
},2000*60
)

},[currenciesOwned])

    return (
        <div>
            <h3>Last Updated:{date},{time}.{minutes}</h3>
        </div>
    )
}

export default Footer;

import React,{useState,useEffect} from 'react'

function Footer({currenciesOwned,lastUpdate}) {

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
    m+2)
},2000*60
)

},[lastUpdate])

    return (
        <div>
            <h3>Last Updated:{date},{time}.{minutes}</h3>
        </div>
    )
}

export default Footer;

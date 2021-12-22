import React ,{useState}from 'react'
import styles from './styles.module.css'
import {useNavigate} from 'react-router-dom'

function Register() {

const [user,setUser]=useState([]) ;
const [name,setName]=useState("") ;
const [surname,setSurname]=useState("") ;
const [username,setUsername]=useState("") ;
const [email,setEmail]=useState("") ;
const [password,setPassword]=useState("") ;
const [confirmPassword,setConfirmPassword]=useState("") ;
const [balance,setBalance]=useState(10000) ;


let navigate=useNavigate();


const submitHandler = (e)=>{
    e.preventDefault()

    if(name===""){
        alert("Please enter your name")
        return false;
    }
    if(surname===""){
        alert("Please enter your surname")
        return false;
    }
    if(username===""){
        alert("Please enter your username")
        return false;
    }
    if(email===""){
        alert("Please enter your email")
        return false;
    }
    if(password===""){
        alert("Please enter your password")
        return false;
    }
    if(password!==confirmPassword){
        alert("passwords do not match")
        return false;
    }


    setUser([
        {
            name : name ,
            surname : surname,
            username : username,
            mail : email,
            password : password,
            balance: balance
        }
    ])
    
    localStorage.setItem("name",name);
    localStorage.setItem("surname",surname);
    localStorage.setItem("username",username);
    localStorage.setItem("email",email);
    localStorage.setItem("password",password);
    localStorage.setItem("balance",balance)
    localStorage.setItem("USD",10000)

    setName("");
    setSurname("");
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("")
    
    navigate("/success");
    }

    return (
        <div className={styles.App}>
            <h1>Welcome </h1>
            <h2>Plese register to continue</h2>
            <form >
                <input 
                type="text" 
                name="name" 
                placeholder="Enter your name" 
                id="name"
                className={styles.name}
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
                <input 
                type="text" 
                name="surname" 
                placeholder="Enter your surname" 
                id="surname"
                className={styles.surname}
                value={surname}
                onChange={(e)=>{setSurname(e.target.value)}}
                />
                <input 
                type="text" 
                name="username" 
                placeholder="Enter your username" 
                id="username"
                className={styles.username}
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                />
                <input 
                type="email" 
                name="email" 
                placeholder="Enter your email" 
                id="email" 
                className={styles.mail}
                value={email}
                onChange={(e) =>setEmail(e.target.value)}
                />
                <input 
                type="password" 
                name="password" 
                placeholder="Enter your password" 
                id="password" 
                className={styles.password}
                value={password}
                onChange={(e) =>setPassword(e.target.value)}
                />
                <input 
                type="password" 
                name="password2" 
                placeholder="Confirm your password" 
                id="password2"
                className={styles.password} 
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                />
                <input type="submit" value="Sign Up" onClick={submitHandler}/>
            </form>
            
        </div>
    )
}

export default Register;

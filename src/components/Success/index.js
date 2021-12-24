import React,{useState} from 'react'
import styles from './styles.module.css'
import {useNavigate} from "react-router-dom"

function Success() {
    const[loginUsername,setLoginUsername]=useState("")
    const[loginPassword,setLoginPassword]=useState("")
    const[loggedUser,setLoggedUSer]=useState([])

    let navigate= useNavigate();

    const loginHandler = (e)=>{
        e.preventDefault()

        if(loginUsername===""){
            alert("Please enter your username")
            return false;
        }
        if(loginPassword===""){
            alert("Please enter your password")
            return false;
        }
        
        setLoggedUSer([
            {
                username: loginUsername,
                password: loginPassword
            }
        ])

        if(localStorage.username!==loginUsername || localStorage.password!==loginPassword){
            alert("username or password is not correct")
            return false;
        }

        navigate("/main")

    }

    return (
        <div className={styles.App}>

            <form onSubmit={loginHandler}>
            <h1>Successfully registered! </h1>
            <h2>Please login to continue</h2>
                <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    id="username"
                    value={loginUsername}
                    onChange={(e)=>setLoginUsername(e.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    id="password"
                    value={loginPassword}
                    onChange={(e)=>setLoginPassword(e.target.value)}
                />
                <input type="submit" value="Login" onClick={loginHandler}/>
                <p>Don't have an account?<a href="/register" >Sign up</a></p>
            </form >
        </div>
    )
}

export default Success;

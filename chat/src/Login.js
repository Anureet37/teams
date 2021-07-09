import React from 'react'
import "./Login.css"
import {Button}from "@material-ui/core" ;
import {auth ,provider} from './firebase';
import { actionTypes } from './reducer';
import { useStateValue } from "./StateProvider";

function Login() {
    const [{}, dispatch ]=useStateValue();

    const signIn=()=>{
        auth
            .signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch((error) => alert(error.message));
    };

    return (
        <div className="login">
           <div className="login__container">
                <img src="https://i.pinimg.com/originals/d0/04/28/d00428efa0bf27b9edd37eac32dfd2c1.png" alt=""
                />
                <div  className="login__text">
                    <h1>Sign in</h1>
                </div>
                <Button type="submit" onClick={signIn}>
                    Sign in with Google
                </Button>
            </div> 

        </div>
    )
}

export default Login

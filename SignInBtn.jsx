import React, {useContext} from 'react'
import {auth, provider,} from "./firebase";
import "./SignInBtn.css"
import { UserContext } from './User';
import { signInWithGoogle } from "./Services/Auth";

function SignInBtn() {
    const [user, setUser] = useContext(UserContext).user;

    const signIn = async () => {
        let userBySignIn;
        if(userBySignIn){
            setUser(false);
        }else{
            userBySignIn= await signInWithGoogle();
            if (userBySignIn) setUser(userBySignIn);
            console.log(userBySignIn);
        }
        
      };

    return (
        <div className="signInBtn" onClick={signIn}>
            <p>Sign In! </p>
        </div>
    );
}

export default SignInBtn

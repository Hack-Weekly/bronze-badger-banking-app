// TODO : add error message handle on login submit
import React from 'react';
import { useRef, useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./login.scss";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    // error message will be displayed if errMsg is not empty
    // we will set the error message when an error
    // occurs during login (e.g. wrong username or password)
    const [errMsg, setErrMsg] = useState<string>("");
    const errRef = useRef<HTMLParagraphElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        emailRef.current?.focus();
    }, []);

    useEffect(() => {
        if (errMsg) {
            errRef.current?.classList.remove("hidden");
        }
    }, [errMsg]);
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target as HTMLFormElement);
            const data = Object.fromEntries(formData.entries());
            const response = await axios.post("http://localhost:3000/auth/login", data, {
                withCredentials: true,
            });
            if (response.status == 201){
                navigate('/');
            }
            // Handle the response as needed, eg. set user authentication state.
            console.log(response.status);
        } catch (error) {
            console.error("Login failed:", error);
            setErrMsg("Login failed. Please check your credentials.");
        }
    };


    return (
        <div className="login">
            <form onSubmit = {handleSubmit}>
                {errMsg && (
                    <p ref={errRef} className="error">
                        {errMsg}
                    </p>
                )}
                <h1>Login</h1>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    value={email}
                    required
                    ref={emailRef}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    value={password}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;

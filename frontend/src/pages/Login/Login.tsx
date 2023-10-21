// TODO : add error message handle on login submit

import { useRef, useState, useEffect } from "react";
import "./login.scss";

const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    // error message will be displayed if errMsg is not empty
    // we will set the error message when an error
    // occurs during login (e.g. wrong username or password)
    const [errMsg, setErrMsg] = useState<string>("");
    const errRef = useRef<HTMLParagraphElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        usernameRef.current?.focus();
    }, []);

    useEffect(() => {
        if (errMsg) {
            errRef.current?.classList.remove("hidden");
        }
    }, [errMsg]);

    return (
        <div className="login">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const data = Object.fromEntries(formData.entries());
                    // no back end yet so just log the data
                    console.log(data);
                    // data.username and data.password are the values from the form
                }}
            >
                {errMsg && (
                    <p ref={errRef} className="error">
                        {errMsg}
                    </p>
                )}
                <h1>Login</h1>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    value={username}
                    required
                    ref={usernameRef}
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

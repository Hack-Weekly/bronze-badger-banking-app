// TODO: add error message handling for login submit errors
// on server error response
import { useRef, useState, useEffect } from "react";
import "./signup.scss";

const SignUp = () => {
    const [formData, setFormData] = useState<{ username: string; password: string; confirmPassword: string }>({
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [errMsg, setErrMsg] = useState<string>("");

    const errRef = useRef<HTMLParagraphElement>(null);
    const userRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        userRef.current?.focus();
    }, []);

    useEffect(() => {
        if (errMsg) {
            errRef.current?.classList.remove("hidden");
        }
    }, [errMsg]);

    useEffect(() => {
        if (formData.password !== formData.confirmPassword) {
            setErrMsg("Passwords do not match");
        } else {
            setErrMsg("");
        }
    }, [formData.password, formData.confirmPassword]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isPasswordValid = (password: string) => {
        // match any string that contains at least
        // - one lowercase letter
        // - one uppercase letter,
        // - one digit
        // - is between 8 and 24 characters long.
        const PWD_REGEX: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,24}$/;
        return PWD_REGEX.test(password);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isPasswordValid(formData.password)) {
            // no back end yet so just log the data
            console.log(formData);
            // data.username and data.password are the values from the form
        } else {
            setErrMsg("Invalid password");
        }
    };

    return (
        <div className="signup">
            <form onSubmit={handleSubmit}>
                <p ref={errRef} className={errMsg ? "error" : "hidden"}>
                    {errMsg}
                </p>
                <h1>Sign Up</h1>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    required
                    onChange={handleInputChange}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    placeholder="Password"
                    required
                    onChange={handleInputChange}
                />
                {!isPasswordValid(formData.password) && !(formData.password === "") && (
                    <p id="passwordReqs" className="instructions">
                        Password must contain:
                        <br />
                        - At least one lowercase letter
                        <br />
                        - At least one uppercase letter
                        <br />
                        - At least one digit
                        <br />- Be between 8 and 24 characters long
                    </p>
                )}
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirm-password"
                    placeholder="Confirm Password"
                    required
                    onChange={handleInputChange}
                />
                <button type="submit">Sign Up</button>
                <p>
                    Already have an account?
                    <br />
                    <button className="signin-button">Sign In</button>
                </p>
            </form>
        </div>
    );
};

export default SignUp;

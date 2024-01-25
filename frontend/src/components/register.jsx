import { useState } from "react";
import AuthService from "../services/authService";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

function Register(){
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [invalidUsername, setInvalidUsername] = useState(false);
    const [accountCreated, setAccountCreated] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();

        if(!invalidPassword){
            setInvalidUsername(false);
            setInvalidPassword(false);
            try{
                const res = await AuthService.register(username, password);
                if(res.status === 200){
                    setAccountCreated(true);
                }
            }
            catch(err){
                if(err.response.status === 401){
                    setInvalidUsername(true);
                }
            }
        }
    };

    const handleUsername = (enteredUsername) => {
        setInvalidUsername(false);
        enteredUsername = enteredUsername.replace(' ', '');
        setUsername(enteredUsername);
    };

    const handlePassword = (enteredPwd) => {
        enteredPwd = enteredPwd.replace(' ', '');
        if(enteredPwd !== passwordConfirm) setInvalidPassword(true);
        else setInvalidPassword(false);
        setPassword(enteredPwd);
    };

    const handlePasswordConfirm = (enteredPwd) => {
        enteredPwd = enteredPwd.replace(' ', '');
        if(enteredPwd !== password) setInvalidPassword(true);
        else setInvalidPassword(false);
        setPasswordConfirm(enteredPwd);
    };

    const loginLink = <Link to='/login' className='font-semibold hover:text-blue-400 hover:underline'>Login</Link>

    return(
        <>
            <div className="w-full h-full z-0 bg-gray-100 p-24">
                <div className="flex w-full justify-center items-center h-full rounded 2xl:p-40 lg:p-16 bg-white">
                    {!accountCreated && 
                        <form onSubmit={onSubmit} className="flex flex-col w-1/2 h-3/4 justify-evenly items-center">
                            <div className="w-full">
                                <h1 className="select-none font-quicksand text-5xl">Create Account</h1>
                            </div>
                            <input required placeholder="Username" spellCheck="false" value={username} onChange={(e) => handleUsername(e.target.value)} className="select-none w-full h-20 p-10 font-quicksand text-xl border-2 border-gray-100 outline-none rounded-xl"/>
                            <input required type="password" placeholder="Password" spellCheck="false" value={password} onChange={(e) => handlePassword(e.target.value)} className="select-none w-full h-20 p-10 font-quicksand text-xl border-2 border-gray-100 outline-none rounded-xl"/>
                            <input required type="password" placeholder="Confirm Password" spellCheck="false" value={passwordConfirm} onChange={(e) => handlePasswordConfirm(e.target.value)} className="select-none w-full h-20 p-10 font-quicksand text-xl border-2 border-gray-100 outline-none rounded-xl"/>
                            {invalidUsername && <div className="w-full"><p className="select-none font-quicksand text-base">* Username already exists</p></div>}
                            {invalidPassword && <div className="w-full"><p className="select-none font-quicksand text-base">* Passwords do not match</p></div>}
                            <button className="select-none flex justify-center items-center w-full h-20 p-10 font-quicksand font-semibold text-xl text-white rounded-xl border-2 border-blue-400 bg-blue-400 hover:bg-blue-600 ease-in-out duration-300">Register</button>
                            <div className="w-full">
                                <p className="select-none font-quicksand text-lg">Already have an account? {loginLink}</p>
                            </div>
                        </form>
                    }
                    {accountCreated &&
                        <div className="flex flex-col w-1/2 h-1/2 justify-evenly items-center">
                            <div className="flex flex-col items-center w-full">
                                <IoIosCheckmarkCircleOutline className="select-none text-9xl text-green-300"></IoIosCheckmarkCircleOutline>
                                <p className="select-none font-quicksand font-semibold text-xl">Account created!</p>
                            </div>
                            <button onClick={() => navigate('/login')} className="select-none flex items-center justify-center w-52 rounded px-2 py-1 font-quicksand font-semibold text-base text-white border-2 border-blue-400 bg-blue-400 hover:bg-blue-600 ease-in-out duration-300">Login</button>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Register
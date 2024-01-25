import { useContext, useEffect, useState } from "react"
import AuthService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import FakeBoardItem from "./fakeBoardItem";

function Login(){

    const navigate = useNavigate();
    const { setAuthInfo } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalidLogin, setInvalidLogin] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('accessToken')){
            navigate('/dashboard');
        }
    }, [navigate]);

    const onSubmit = async (e) => {
        e.preventDefault();

        try{
            setInvalidLogin(false);

            const res = await AuthService.login(username, password);

            //clear username and password
            setUsername('');
            setPassword('');

            //set global authentication info and add token to local storage
            const accessToken = res.data.accessToken;
            const userId = res.data.userId;
            const retUsername = res.data.username;
            setAuthInfo({ userId: userId, accessToken: accessToken, username: retUsername })
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('userId', userId);
            localStorage.setItem('username', retUsername);
            
            navigate('/dashboard');
        }
        catch(err){
            if(err.response.status === 401){
                setInvalidLogin(true);
            }
        }
    }

    return (
        <>
            <div className="w-full h-full z-0 bg-gray-100 p-24">
                <div className="flex w-full h-full rounded 2xl:p-12 lg:p-8 sm:p-6 bg-white">
                    <div className="flex flex-col items-center justify-center w-2/5 h-full 2xl:p-32 lg:p-22 sm:p-10 bg-gray-50 rounded">
                        <div className="flex flex-col items-center justify-center w-full h-3/4">
                            <h1 className="select-none font-quicksand lg:text-5xl sm:text-3xl font-bold mb-3">Board App</h1>
                            <div className="lg:w-72 sm:w-32 h-fit">
                                <FakeBoardItem priority={'blue'} title={'Hello!'} description={'Welcome to Board App :)'}></FakeBoardItem>
                            </div>
                            <div className="lg:w-72 sm:w-32 h-fit">
                                <FakeBoardItem priority={'yellow'} title={'Please'} description={''}></FakeBoardItem>
                            </div>
                            <div className="lg:w-72 sm:w-32 h-fit">
                                <FakeBoardItem priority={'red'} title={'Sign In'} description={''}></FakeBoardItem>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center w-3/5 h-full 2xl:p-32 lg:p-22 sm:p-10">
                        <form onSubmit={onSubmit} className="flex flex-col w-full h-5/6 justify-evenly items-center">
                            <div className="w-full">
                                <h1 className="select-none font-quicksand lg:text-5xl sm:text-4xl">Login</h1>
                            </div>
                            <input required placeholder="Username" spellCheck="false" value={username} onChange={(e) => setUsername(e.target.value.replace(' ', ''))} className="select-none w-full h-20 lg:p-10 sm:p-5 font-quicksand text-xl border-2 border-gray-100 outline-none rounded-xl"/>
                            <input required type="password" placeholder="Password" spellCheck="false" value={password} onChange={(e) => setPassword(e.target.value.replace(' ', ''))} className="select-none w-full h-20 lg:p-10 sm:p-5 font-quicksand text-xl border-2 border-gray-100 outline-none rounded-xl"/>
                            {invalidLogin && <div className="w-full"><p className="font-quicksand text-base">* Invalid username or password</p></div>}
                            <button className="select-none flex justify-center items-center w-full h-20 lg:p-10 sm:p-5 font-quicksand font-semibold text-xl text-white rounded-xl border-2 border-blue-400 bg-blue-400 hover:bg-blue-600 ease-in-out duration-300">Login</button>
                            <div className="flex w-full h-16 justify-center items-center">
                                <div className="w-1/2 ml-0.5 border-b-2 border-gray-300"></div>
                                <p className="select-none mx-2 font-quicksand font-semibold text-gray-400">or</p>
                                <div className="w-1/2 mr-0.5 border-b-2 border-gray-300"></div>
                            </div>
                            <button onClick={(e) => {e.preventDefault(); navigate('/register')}} className="select-none flex justify-center items-center w-full h-20 lg:p-10 sm:p-5 font-quicksand font-semibold text-xl rounded-xl border-2 border-gray-300 bg-gray-300 hover:bg-gray-500 ease-in-out duration-300">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
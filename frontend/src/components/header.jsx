import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

function Header(){

    const navigate = useNavigate();
    const { authInfo, setAuthInfo } = useContext(AuthContext);

    const [username, setUsername] = useState(' ');
    const [showContextMenu, setShowContextMenu] = useState(false);
    const contextMenuRef = useRef(null);

    useEffect(() => {
        setUsername(authInfo?.username);
    }, [authInfo]);

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        setAuthInfo(null);
        navigate('/login');
    };

    const ClickOutside = (ref) => {
        useEffect(() => {
            function handleClickOutside(event){
                if (ref.current && !ref.current.contains(event.target)) {
                    setShowContextMenu(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref])
    };
    ClickOutside(contextMenuRef);

    return(
        <div className="flex items-center w-full h-[5%] py-8 px-10 bg-indigo-950">
            <div className="flex items-center justify-center w-11 h-11 ml-auto">
                <div onClick={() => setShowContextMenu(true)} className="flex items-center justify-center w-full h-full bg-white rounded-full border-4 border-gray-500 hover:bg-gray-300 hover:cursor-pointer ease-in-out duration-300">
                    {username != undefined && <p className="select-none font-quicksand font-semibold">{username.charAt(0).toUpperCase()}</p>}
                </div>
                {/*profile context menu*/}
                {showContextMenu && <div ref={contextMenuRef} className="w-16 h-fit rounded absolute top-14 bg-white border-2 border-gray-500">
                    <div onClick={() => logout()} className="flex items-center justify-center w-full h-8 hover:bg-gray-300 hover:cursor-pointer ease-in-out duration-300">
                        <p className="font-quicksand text-sm font-bold">Logout</p>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Header
import { useState } from "react"
import Login from "./AuthForms/Login"
import Register from "./AuthForms/Resgister"
import { useNavigate } from "react-router-dom";

function AuthPage({ initialShowLogin = true }) {

    const [showLogin, setShowLogin] = useState(initialShowLogin);
    const navigate = useNavigate();

    const toggleForm = () => {
        setShowLogin(!showLogin);
    }

    const navigateBack = () => {
        navigate('/');
    }

    return(
        <>
            <div className="h-32 flex justify-between items-center px-5">
                <div onClick={toggleForm} className="border-b border-r border-c4 px-10 py-2 cursor-pointer hover:bg-c2">
                    {showLogin ? <p className="">SignUp</p> : <p className="">Login</p>}
                </div>
                <div onClick={navigateBack} className="border-b border-l border-c4 px-10 py-2 cursor-pointer hover:bg-c2">
                    <p className="">Return</p>
                </div>

            </div>
            <div className="">

                {showLogin ? 
                    <Login />
                : 
                    <Register />
                }

            </div>
        </>
    )
}

export default AuthPage
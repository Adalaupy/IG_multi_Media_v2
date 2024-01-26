 import React, { useEffect } from 'react'
import './Login.css'
import { useVariableListContext } from '../contexts/VariableListProvider'
import { useNavigate } from 'react-router-dom'
import { Main_Handle_Event } from '../utils/Handle_Event'



const Login = () => {



    const { UserName, Password, setUserName, setPassword, isLoginSuccess, setisLoginSuccess, BASE } = useVariableListContext()
    const navigate = useNavigate()


    const { Handle_Login } = Main_Handle_Event()



    useEffect(() => {


        if (isLoginSuccess == 1) {

            navigate({`${BASE}content`})
            setisLoginSuccess(0)

        }


    }, [isLoginSuccess])









    return (

        <div className="login-main">




            <div className="login-box">
                <h1>Login</h1>

                <form className="login-info-box">


                    <div className="input-box user-box">
                        <input value={UserName} onChange={(e) => setUserName(e.target.value)} type="text" name="" required="" placeholder='Username' />
                    </div>


                    <div className="input-box  pw-box">

                        <input autoComplete='on' value={Password} onChange={(e) => setPassword(e.target.value)} type="password" name="" required="" placeholder='Password' />
                    </div>




                    <div id='login-btn' 
                        onClick={(e) => Handle_Login(e)} 
                        onKeyDown={(e) => {
                            if (e.key == "Enter") {
                               Handle_Login(e) 
                            }
                    }}>
                        Login
                    </div>


                </form>

            </div>

        </div>
    )
}

export default Login

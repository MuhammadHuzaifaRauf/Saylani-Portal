alert("email = admin@super.com Password = 123456")
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../../config/firebase'
import { message } from 'antd'

const initialState = { email: "", password: "" }

export default function Login() {
    

    const navigate = useNavigate()
    const [state, setState] = useState(initialState)
    
    const handleChange = e => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
    }
    const handleLogin = e => {
        e.preventDefault()
        const { email, password } = state
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                message.success("User SignIn Successfuly")
                navigate('/')
            })
            .catch((error) => {
                message.error("Something Went Wrong")
                
            });
            setState(initialState)
            
        }
        return (
            <>

            <div className="formDiv" id='formDiv'>
                <div className="container">
                    <div className="row justify-content-center mt-3" id='loginRow'>
                        <div className="col-12 col-md-6 col-lg-5" id='resetPassCard'>
                            <form id='loginForm' className='px-2 py-4'>
                                <h2 className='text-center pb-4 mt-4 fw-bold'>Sign In</h2>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="email">Email address</label>
                                    <input type="email" className="form-control bg-warning" id="email" name='email' value={state.email} onChange={handleChange} />
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input type="password" className="form-control bg-warning" id="password" name='password' value={state.password} onChange={handleChange} />
                                </div>

                                <div className="text-center">
                                    <button className="btn btn-danger text-white w-50 my-3 justify-content-center" onClick={handleLogin} >Sign in</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div >
            </div >

        </>
    )
}



import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Link, Redirect, withRouter, useHistory } from 'react-router-dom';

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({});
    const [isAuth, setIsAuth] = useState(false);
    const history = useHistory();

    useEffect(()=>{
            setUser(props.user)
            setIsAuth(props.auth)
        }
    ,[props.user,props.auth])
    

    const checkUser = () => {
        if(!isAuth && user && Object.keys(user).length === 0){
            return false
        }
        else if(Object.keys(user).length > 0){
            if(user.username === username && user.password === password){
                localStorage.setItem('is_authenticated',true)
                return true
            }
            else{
                return false
            }
        }
        return false
    }

    const onSubmit = e => {
        e.preventDefault();
        let check = checkUser();
        if(check){
            setTimeout(() => {
                props.onLoad(true)
                history.push('/')
            }, 1000);
        }
        else{
            alert('User not found')
        }

    }
    return (
        <div className="col-md-6 m-auto">
            <div className="card card-body mt-5">
            <h2 className="text-center">Login</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                <label>Username</label>
                <input
                    type="text"
                    className="form-control"
                    name="username"
                    onChange={(e)=>{setUsername(e.target.value)}}
                    value={username}
                />
                </div>
                <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={(e)=>{setPassword(e.target.value)}}
                    value={password}
                />
                </div>
                <div className="form-group">
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
                </div>
                <p>
                Don't have an account? <Link to="/register">Register</Link>
                </p>
            </form>
            </div>
        </div>
    )
}

export default withRouter(Login)

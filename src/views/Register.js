import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Link, Redirect, withRouter, useHistory} from 'react-router-dom';

function Register(props) {
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ password2, setPassword2 ] = useState('')
    const [validated, setValidated] = useState(false);
    const [user, setUser] = useState({});
    const [isAuth, setIsAuth] = useState(false);
    const history = useHistory();

    useEffect(()=>{
            setUser(props.user)
            setIsAuth(props.auth)
        }
    ,[props.user,props.auth])


    const onSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);
        if(password !== password2){
            alert('Passwords do not match')
        }
        else{
            let user = {
                username,
                email,
                password
            }
            localStorage.setItem('user',JSON.stringify(user));
            localStorage.setItem('is_authenticated',true)
            setTimeout(() => {
                props.onLoad(true)
                history.push('/')
            }, 1000);
        }
    }
    return (
        <div className="col-md-6 m-auto">
            <div className="card card-body mt-5">
                <h2 className="text-center">Register</h2>
                <form className="form" method="post" onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            onChange={(e)=>{setUsername(e.target.value)}}
                            value={username}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            onChange={(e)=>{setEmail(e.target.value)}}
                            value={email}
                            required
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
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password2"
                            onChange={(e)=>{setPassword2(e.target.value)}}
                            value={password2}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Register
                        </button>
                    </div>
                    <p>
                    Already have an account? <Link to='/login'>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register




import React, {useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';

function Header(props) {
    const [user, setUser] = useState({});
    const [isAuth, setIsAuth] = useState(false);
    const [load,setLoad] = useState(false)

    const autoRefresh = () => {
        window.location.reload()
    }

    useEffect(()=>{
            setUser(props.user)
            setIsAuth(props.auth)
            setLoad(props.reload)
        }
    ,[props.user,props.auth,props.reload])

    const logout = () => {
        setUser({})
        setIsAuth(false)
        setLoad(false)
        props.onLoad(false)
        localStorage.setItem('is_authenticated',false)
    }
    const authLinks = (
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <span className='navbar-text mr-3'>
                <strong>
                    { user ? `Welcome ${user.username}` : ''}
                </strong>
            </span>
            <Link to='/login'>
                <li className="nav-item">
                    <button onClick={logout} className='nav-link btn btn-info btn-sm text-light'>
                        Logout
                    </button>
                </li>
            </Link>
        </ul>
    );

    const guestLinks = (
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item">
                <Link to="/register" className="nav-link">
                    Register
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/login" className="nav-link">
                    Login
                </Link>
            </li>
        </ul>
    );


    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="container">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a className="navbar-brand" href="#">Dashboard App</a>
                </div>
                { isAuth ? authLinks : guestLinks }
            </div>
        </nav>
    )
}

export default Header;

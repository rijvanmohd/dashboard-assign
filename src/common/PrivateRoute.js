import React, {useEffect,useState} from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

function PrivateRoute({ component: Component,auth,user, ...rest}) {
    const [userData, setUserData] = useState({});
    const [isAuth, setIsAuth] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(true)

    useEffect(()=>{
            let user = JSON.parse(localStorage.getItem('user'));
            let is_authenticated = localStorage.getItem('is_authenticated')==='true'?true:false;
            setUserData(user)
            setIsAuth(is_authenticated)
            setIsAuthenticating(false)
            return ()=>{
                setUserData({})
                setIsAuth(false)
            }
        }
    ,[])
    return ( 
        <Route 
            {...rest}
            render = { props => {
                if(!isAuth && !isAuthenticating){
                    return <Redirect to='/login' />
                }
                if(isAuth){
                    return <Component {...rest} auth={isAuth} user={user}/>;
                }
            }}
        />
    )
}

export default withRouter(PrivateRoute);

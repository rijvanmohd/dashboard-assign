import {useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './common/PrivateRoute';
import Dashboard from './views/Dashboard';
import Register from './views/Register';
import Login from './views/Login';
import Header from './layout/Header';
import './App.css';

function App() {
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
        let user = JSON.parse(localStorage.getItem('user'));
        let is_authenticated = localStorage.getItem('is_authenticated')==='false'?false:true;
        setUser(user)
        setIsAuth(is_authenticated)
      }
  ,[loading])


  const checkLoading = (val) => {
    setLoading(val)
  }

  return (
    <div className="App">
      <Router>
					<>
						<Header auth={isAuth} user={user} reload={loading} onLoad={checkLoading}/>
							<Switch>
								<PrivateRoute exact path="/" component={Dashboard} auth={isAuth} user={user}/>
					
								<Route exact path="/register">
                  <Register auth={isAuth} user={user} onLoad={checkLoading}/>
                </Route>
								<Route exact path="/login">
                  <Login auth={isAuth} user={user} onLoad={checkLoading}/>
                </Route>
							</Switch>
					</>
				</Router>
    </div>
  );
}

export default App;

import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/Users/Users';
import User from './components/Users/User';
import Search from './components/Search/Search';
import Alert from './components/layout/Alert';
import About from './pages/About';
import './App.css';
import axios from 'axios';

const NAVBAR_TITLE = 'PornHub';
const SET_ALERT_TIMEOUT = 3000;
const PATH_HOME = '/';
const PATH_ABOUT = '/about';
const PATH_USER = '/user/:login';

function App() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    // [GET USERS];
    const searchUsers = async text => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
            ${process.env.REACT_APP_GITHUB_CLIENT_ID}client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        setUsers(res.data.items);
        setLoading(false);
    };

    // [GET SINGLE USER];
    const getUser = async username => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=
            ${process.env.REACT_APP_GITHUB_CLIENT_ID}client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        setUser(res.data);
        setLoading(false);
    };

    // [GET USER REPOS];
    const getUserRepos = async username => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asd&client_id=
            ${process.env.REACT_APP_GITHUB_CLIENT_ID}client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        setRepos(res.data);
        setLoading(false);
    };

    const clearUsers = () => {
        setUsers([]);
        setLoading(false);
    };

    const showAlert = (msg, type) => {
        setAlert({ msg, type: type });
        setTimeout(() => setAlert(null), SET_ALERT_TIMEOUT);
    };

    return (
        <Router>
            <div className='App'>
                <Navbar title={NAVBAR_TITLE} />
                <div className='container'>
                    <Alert alert={alert} />
                    <Switch>
                        <Route
                            exact
                            path={PATH_HOME}
                            render={props => (
                                <Fragment>
                                    <Search searchUsers={searchUsers} clearUsers={clearUsers} showClear={users.length > 0 ? true : false} setAlert={showAlert} />
                                    <Users loading={loading} users={users} />
                                </Fragment>
                            )}
                        />
                        <Route exact path={PATH_ABOUT} component={About} />
                        <Route exact path={PATH_USER} render={props => <User {...props} getUser={getUser} getUserRepos={getUserRepos} user={user} repos={repos} loading={loading} />} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;

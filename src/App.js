import React, { Fragment, Component } from 'react';
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
class App extends Component {
    state = {
        users: [],
        user: {},
        repos: [],
        loading: false,
        alert: null
    };

    // [GET USERS];
    searchUsers = async text => {
        this.setState({
            loading: true
        });
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
            ${process.env.REACT_APP_GITHUB_CLIENT_ID}client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        this.setState({
            users: res.data.items,
            loading: false
        });
    };

    // [GET SINGLE USER];
    getUser = async username => {
        this.setState({
            loading: true
        });
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=
            ${process.env.REACT_APP_GITHUB_CLIENT_ID}client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        this.setState({
            user: res.data,
            loading: false
        });
    };

    // [GET USER REPOS];
    getUserRepos = async username => {
        this.setState({
            loading: true
        });
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asd&client_id=
            ${process.env.REACT_APP_GITHUB_CLIENT_ID}client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        this.setState({
            repos: res.data,
            loading: false
        });
    };

    clearUsers = () => {
        this.setState({
            users: [],
            loading: false
        });
    };

    setAlert = (msg, type) => {
        this.setState({
            alert: {
                msg: msg,
                type: type
            }
        });
        setTimeout(() => {
            this.setState({
                alert: null
            });
        }, SET_ALERT_TIMEOUT);
    };

    render() {
        const { users, user, repos, loading, alert } = this.state;
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
                                        <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={users.length > 0 ? true : false} setAlert={this.setAlert} />
                                        <Users loading={loading} users={users} />
                                    </Fragment>
                                )}
                            />
                            <Route exact path={PATH_ABOUT} component={About} />
                            <Route exact path={PATH_USER} render={props => <User {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} user={user} repos={repos} loading={loading} />} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;

import React, { Fragment, Component } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../Repos/Repos';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PATH_HOME = '/';
const LINK_BACK_TITLE = 'Back To Search';
const LINK_TO_PROFILE_TITLE = 'Visit PornHub Profile';

export class User extends Component {
    componentDidMount() {
        // this.props.match.params.login comes from {...props}
        this.props.getUser(this.props.match.params.login);
        this.props.getUserRepos(this.props.match.params.login);
    }

    static propTypes = {
        loading: PropTypes.bool,
        user: PropTypes.object.isRequired,
        repos: PropTypes.any.isRequired,
        getUser: PropTypes.func.isRequired,
        getUserRepos: PropTypes.func.isRequired
    };

    render() {
        const { name, avatar_url, location, bio, blog, login, html_url, followers, following, public_repos, public_gists, hireable, company } = this.props.user;
        const { loading, repos } = this.props;
        if (loading) return <Spinner />;
        return (
            <Fragment>
                <Link to={PATH_HOME} className='btn btn-light'>
                    {LINK_BACK_TITLE}
                </Link>
                Hireable: {hireable ? <span>success</span> : <span>danger</span>}
                <div className='card grid-2'>
                    <div className='all-center'>
                        <img src={avatar_url} alt='Avatar img' className='round-img' style={{ width: '150px' }} />
                        <h1>{name}</h1>
                        <p>Location: {location}</p>
                    </div>
                    <div className=''>
                        {bio && (
                            <Fragment>
                                <h3>Bio</h3>
                                <p>{bio}</p>
                            </Fragment>
                        )}
                        <a href={html_url} className='btn btn-dark my-1'>
                            {LINK_TO_PROFILE_TITLE}
                        </a>
                        <ul>
                            <li>
                                {login && (
                                    <Fragment>
                                        <strong>Username: </strong>
                                        {login}
                                    </Fragment>
                                )}
                            </li>
                            <li>
                                {company && (
                                    <Fragment>
                                        <strong>Company: </strong>
                                        {company}
                                    </Fragment>
                                )}
                            </li>
                            <li>
                                {blog && (
                                    <Fragment>
                                        <strong>Website: </strong>
                                        {blog}
                                    </Fragment>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
                <ul className='card text-center'>
                    <li className='badge badge-primary'>Followers: {followers}</li>
                    <li className='badge badge-success'>Following: {following}</li>
                    <li className='badge badge-light'>Public Repos: {public_repos}</li>
                    <li className='badge badge-dark'>Public Gists: {public_gists}</li>
                </ul>
                <Repos repos={repos} />
            </Fragment>
        );
    }
}

export default User;

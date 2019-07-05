import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LINK_TO_TITLE = 'More';

const UserItem = ({ user: { avatar_url, login } }) => {
    return (
        <div className='card text-center'>
            <img src={avatar_url} alt='' className='round-img' style={{ width: '60px' }} />
            <h3>{login}</h3>
            <div>
                <Link to={`/user/${login}`} className='btn btn-dark btn-sm my-1' style={{ marginRight: '0' }}>
                    {LINK_TO_TITLE}
                </Link>
            </div>
        </div>
    );
};

UserItem.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserItem;

import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CLEAR_BTN_TITLE = 'Clear';
const SET_ALERT_TITLE = 'Please enter something';

const Search = ({ searchUsers, showClear, clearUsers, setAlert }) => {
    const [text, setText] = useState('');

    const onChange = event => {
        setText(event.target.value);
    };

    const onSubmit = event => {
        event.preventDefault();
        if (text === '') {
            setAlert(SET_ALERT_TITLE, 'light');
        } else {
            searchUsers(text);
            setText('');
        }
    };

    return (
        <div>
            <form className='form' onSubmit={onSubmit}>
                <input type='text' name='text' placeholder='Search Users...' value={text} onChange={onChange} />
                <input type='submit' value='Search' className='btn btn-dark btn-block' />
            </form>
            {showClear && (
                <button className='btn btn-light btn-block' onClick={clearUsers}>
                    {CLEAR_BTN_TITLE}
                </button>
            )}
        </div>
    );
};

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
};

export default Search;

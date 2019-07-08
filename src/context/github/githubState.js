import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import { SEARCH_USERS, GET_USERS, CLEAR_USERS, GET_REPOS } from '../types';

// const GithubState = props = {
//     const initialState = {

//     }
// };

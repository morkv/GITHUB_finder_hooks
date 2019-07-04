import React, { Component } from 'react';

export default class Search extends Component {
    state = {
        text: ''
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmit = event => {
        event.preventDefault();
        console.log(this.state.text);
    };

    render() {
        return (
            <div>
                <form className='form' onSubmit={this.onSubmit}>
                    <input type='text' name='text' placeholder='Search Users...' value={this.state.text} onChange={this.onChange} />
                    <input type='submit' value='Search' className='btn btn-dark btn-block' />
                </form>
            </div>
        );
    }
}

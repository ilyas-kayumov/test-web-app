import React from 'react';

export class Form extends React.Component {
    render() {
        return (
            <form className='pure-form pure-form-aligned' onSubmit={this.props.form.handleSubmit}>
                {this.props.children}
            </form>
        );
    }
}
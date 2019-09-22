import React from 'react';

export class Button extends React.Component {
    render() {
        return (
            <div className='pure-controls'>
                <button type={this.props.type} className='pure-button pure-button-primary'>
                    {this.props.children}
                </button>
                <span className='pure-form-message-inline'>
                    {this.props.error}
                </span>
            </div>
        );
    }
}
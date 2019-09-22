import React from 'react';

export class Field extends React.Component {
    render() {
        return (
            <div className='pure-control-group'>
                <label htmlFor={this.props.name}>
                    {this.props.displayName}:
                </label>
                {this.props.children}
                <span className='pure-form-message-inline'>
                    {this.props.error}
                </span>
            </div>
        );
    }
}

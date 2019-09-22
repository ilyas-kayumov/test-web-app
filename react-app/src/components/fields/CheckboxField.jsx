import React from 'react';

export class CheckboxField extends React.Component {
    render() {
        return (
            <div className='pure-controls'>
                <label htmlFor={this.props.name} className='pure-checkbox'>
                    <input type='checkbox' id={this.props.name} name={this.props.name} checked={this.props.data.value} onChange={this.props.form.handleChange} /> {this.props.children}
                    <span className='pure-form-message-inline'>
                        {this.props.data.error}
                    </span>
                </label>
            </div>
        );
    }
}

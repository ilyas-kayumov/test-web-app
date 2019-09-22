import React from 'react';
import { Field } from './Field';

export class TextField extends React.Component {
    render() {
        return (
            <Field name={this.props.name} displayName={this.props.children} error={this.props.data.error}>
                <input type='text' id={this.props.name} name={this.props.name} value={this.props.data.value} placeholder={this.props.children} onChange={this.props.form.handleChange} />
            </Field>
        );
    }
}
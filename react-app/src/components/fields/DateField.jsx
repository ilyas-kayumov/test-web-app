import React from 'react';
import { Field } from './Field';

export class DateField extends React.Component {
    render() {
        return (
            <Field name={this.props.name} displayName={this.props.children} error={this.props.data.error}>
                <input type='date' id={this.props.name} name={this.props.name} value={this.props.data.value} onChange={this.props.form.handleChange} />
            </Field>
        );
    }
}
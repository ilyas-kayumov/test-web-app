import React from 'react';
import { Field } from './Field';

export class SelectField extends React.Component {
    render() {
        let countries = this.props.options.map(c => 
            <option key={c.toLowerCase()} value={c.toLowerCase()}> {c} </option>
        );

        return (
            <Field name={this.props.name} displayName={this.props.children} error={this.props.data.error}>
                <select name={this.props.name} value={this.props.data.value} onChange={this.props.form.handleChange}>
                    {countries}
                </select>
            </Field>
        );
    }
}
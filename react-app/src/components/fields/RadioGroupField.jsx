import React from 'react';
import { Field } from './Field';

export class RadioGroupField extends React.Component {
    render() {
        let options = this.props.options.map((c, i) =>
            <span className="radio-group-button" key={c.toLowerCase()}>
                <input type='radio' name={this.props.name} value={c.toLowerCase()} /> {c}
            </span>
        );

        return (
            <Field name={this.props.name} displayName={this.props.children} error={this.props.data.error}>
                <span value={this.props.data.value} onChange={this.props.form.handleChange}>
                    {options}
                </span>
            </Field>
        );
    }
}
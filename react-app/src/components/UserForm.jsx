import React from 'react';
import { FieldData } from '../FieldData';
import { CheckboxField } from './fields/CheckboxField';
import { TextField } from './fields/TextField';
import { DateField } from './fields/DateField';
import { Button } from './Button';
import { SelectField } from './fields/SelectField';
import { RadioGroupField } from './fields/RadioGroupField';
import { Form } from './Form';
import { validateFieldOnChange, validateFieldOnSubmission } from '../FormValidation.js';

export class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: new FieldData('', ''),
            lastName: new FieldData('', ''),
            email: new FieldData('', ''),
            country: new FieldData('', ''),
            dateOfBirth: new FieldData('', ''),
            gender: new FieldData('', ''),
            agreement: new FieldData(false, ''),
            submitError: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;

        let error = validateFieldOnChange(name, value);

        this.updateSubmitErrorOnFieldChange(name, error);

        this.setState({ [name]: new FieldData(value, error) });
    }

    updateSubmitErrorOnFieldChange(name, error) {
        if (error === '' && this.state.submitError !== '') {
            let anyErrors = false;
            for (let key in this.state) {
                if (key === 'submitError' || key === name) {
                    continue;
                }

                if (this.state[key].error !== '') {
                    anyErrors = true;
                    break;
                }
            }

            if (!anyErrors) {
                this.updateSubmitError(false);
            }
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        let anyErrors = false;
        for (let key in this.state) {
            if (key === 'submitError') {
                continue;
            }

            let fieldData = this.state[key];

            if (fieldData.error !== '') {
                anyErrors = true;
                continue;
            }

            let value = fieldData.value;
            let error = validateFieldOnSubmission(key, value);

            if (error !== '') {
                anyErrors = true;
                this.setState({ [key]: new FieldData(value, error) });
            }
        }

        this.updateSubmitError(anyErrors);

        if (!anyErrors) {
            this.submit();
        }
    }

    updateSubmitError(anyErrors) {
        let error = 'Some form fields are filled incorrectly, please, check them';
        this.setState({submitError: anyErrors ? error : ''});
    }

    async submit() {
        let data = {};
        for (let key in this.state) {
            if (key === 'agreement' || key === 'submitError') {
                continue;
            }

            data[key] = this.state[key].value;
        }

        let result = await fetch('/api/users', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        if (result.status === 201 /* CREATED */) {
            alert("User has been created");
        }
        else {
            alert("Error: " + result.statusText);
        }
    }

    render() {
        let s = this.state;
        return (
            <Form form={this}>
                <TextField form={this} name='firstName' data={s.firstName}> First Name </TextField>
                <TextField form={this} name='lastName' data={s.lastName}> Last Name </TextField>
                <TextField form={this} name='email' data={s.email}> E-Mail </TextField>
                <SelectField form={this} name='country' data={s.country} options={['', 'Canada', 'France', 'Germany', 'Italy', 'Japan', 'United States']}> Country </SelectField>
                <DateField form={this} name='dateOfBirth' data={s.dateOfBirth}> Date of Birth </DateField>
                <RadioGroupField form={this} name='gender' data={s.gender} options={['Male', 'Female', 'Other']}> Gender </RadioGroupField>
                <CheckboxField form={this} name='agreement' data={s.agreement} > I've read the terms and conditions </CheckboxField>
                <Button type='submit' error={s.submitError}> Submit </Button>
            </Form>
        );
    }
}
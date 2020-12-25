import React, { useState, useEffect } from 'react';

import Inputs from './Inputs'
import validate from './validateinfo'

function Form({ handleUser, name, title, inputs, button, link, linkTo }) {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    if (Object.keys(values).length === 0) {
        inputs.map(input => { values[input.name] = "" });
    }

    const handleFieldChange = (name, value) => {
        setValues({ ...values, [name]: value });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        (name == "login" || name == "registration") && setErrors(await validate(name, values));
        setIsSubmitted(true);
    }

    useEffect(() => {
        if (Object.keys(errors).length == 0 && isSubmitted) {
            handleUser(values);
        }
    });

    return (
        <div className="form-content-right">
            <form className="form" onSubmit={handleSubmit}>
                <h1>{title}</h1>
                <Inputs inputs={inputs} errors={errors} onChange={handleFieldChange} />
                <button className="form-input-btn" type="submit">{button}</button>
                <span className="form-input-login">
                    {link} <a href={linkTo}>here</a>
                </span>
            </form>
        </div>
    )
}

export default Form

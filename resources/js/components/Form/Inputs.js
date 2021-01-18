import React, { useState } from 'react'

import Input from './Input'

function Inputs({ inputs, errors, onChange }) {

    const handleChange = (event) => {
        onChange(event.target.name, event.target.value);
    };

    return (
        inputs.map(input => <Input key={input.name} input={input} error={errors[input.name]} onChange={handleChange} />)
    );
}

export default Inputs

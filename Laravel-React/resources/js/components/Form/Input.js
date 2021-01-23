import React, { useState } from 'react'

function Input({ input, error, onChange }) {
    const [value, setValue] = useState(input.value)
    return (
        <div className="form-inputs">
            <label htmlFor={input.name} className="form-label">{input.label}</label>
            <input id={input.name} type={input.type} name={input.name} className="form-input" value={value} placeholder={input.placeholder} onChange={event => { onChange(event); setValue(event.target.value) }} />
            {error && <p>{error}</p>}
        </div>
    )
}

export default Input

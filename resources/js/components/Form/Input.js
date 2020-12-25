import React from 'react'

function Input({ input, error, onChange }) {
    return (
        <div className="form-inputs">
            <label htmlFor={input.name} className="form-label">{input.label}</label>
            <input id={input.name} type={input.type} name={input.name} className="form-input" placeholder={input.placeholder} onChange={event => onChange(event)} />
            {error && <p>{error}</p>}
        </div>
    )
}

export default Input

import React, { SelectHTMLAttributes } from 'react'
import './style.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    label: string;
    options: Array<{
        value: string;
        label: string;
    }>
}

const Select: React.FunctionComponent<SelectProps>  = ({ label, name, options, ...rest }) => {
    
        return (
            <div className="select-block">
                <label htmlFor={name}>{label}</label>
                <select defaultValue=""  id={name} {...rest}>
                    <option value="" disabled  hidden >Selecione uma opção</option>
                    {options.map(op => {
                        return <option key={op.value} value={op.value}> {op.label} </option>
                    })}
                </select> 
            </div>
        )
    
}

export default Select;

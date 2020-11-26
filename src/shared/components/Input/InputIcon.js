import React from 'react'
import { Input } from 'semantic-ui-react'

export default function InputIcon(props) {
    return (
        <Input icon={props.icon} iconPosition={props.iconPosition} placeholder={props.placeholder} />
    )
}

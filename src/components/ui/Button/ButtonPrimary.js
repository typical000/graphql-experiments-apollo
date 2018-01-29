import React from 'react'
import Button from './Button'
import {compose} from './propTypeHelper'

export default props => <Button {...compose(props, 'primary')} />

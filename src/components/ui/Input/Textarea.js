import React from 'react'
import TextareaAutosize from 'react-autosize-textarea'
import BaseInput from './BaseInput'

export default (props) => (
  <BaseInput {...props}>
    <TextareaAutosize />
  </BaseInput>
)

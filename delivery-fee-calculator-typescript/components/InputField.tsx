'use client'

import React from 'react'
import styles from './InputField.module.css'

type InputFieldProps = {
  label: string
  unit?: string
  value: string
  onChange: (value: string) => void
  validator?: (value: string) => boolean
  dataTestId?: string
  hasError?: boolean
  setHasError?: React.Dispatch<React.SetStateAction<boolean>>
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  unit,
  value,
  onChange,
  validator,
  dataTestId,
  hasError = false, // default value
  setHasError,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value

    // Call validator if provided and if input does not pass validator it is ignored
    if (!validator || validator(newValue)) {
      onChange(newValue)
      // Empty input error is removed
      if (hasError && setHasError) {
        setHasError(false)
      }
    }
  }

  // If hasError is true, add inputFieldError style class
  const inputClassName = hasError
    ? `${styles.inputField} ${styles.inputFieldError}`
    : styles.inputField

  return (
    <div className={styles.inputFieldContainer}>
      <input
        className={
          inputClassName /*if hasError is true, add inputFieldError style class */
        }
        type='text'
        value={value}
        onChange={handleChange}
        placeholder=' '
        data-test-id={dataTestId}
      />
      <label className={styles.inputLabel}>{label}</label>
    </div>
  )
}

export default InputField

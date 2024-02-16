'use client'

import React from 'react'
import Styles from './SelectionField.module.css'

type SelectionFieldProps = {
  label: string
  options: string[]
  onSelect: (option: string) => void
  selectedOption: string
  dataTestId?: string
}

const SelectionField: React.FC<SelectionFieldProps> = ({
  label,
  options,
  onSelect,
  selectedOption,
  dataTestId,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value)
  }

  return (
    <div className={Styles.selectionContainer}>
      <select
        className={Styles.selectDropdown}
        value={selectedOption}
        onChange={handleChange}
        data-test-id={dataTestId}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <label className={Styles.selectionLabel}>{label}</label>
    </div>
  )
}

export default SelectionField

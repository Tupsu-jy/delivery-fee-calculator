'use client'

import React, { useState } from 'react'
import InputField from '@/components/InputField'
import SlidingRadioButton from '@/components/SlidingRadioButton'
import SelectionField from '@/components/SelectionField'
import { Weekday, DeliveryTimeOption } from '@/types/enums'
import {
  getISOFormattedDeliveryTime,
  getWeekdaysExcludingTodayAndTomorrow,
  transformCalculatorInputToDeliveryFeeRequestData,
} from '@/utils/functions'
import { validateDeliveryFeeRequestData } from '@/types/models'
import { calculateDeliveryFeeKotlin } from '@/utils/api'
import styles from './page.module.css'

const timesInDay: string[] = []
for (let hour = 0; hour < 24; hour++) {
  for (let minute = 0; minute < 60; minute += 10) {
    const formattedHour: string = hour.toString().padStart(2, '0')
    const formattedMinute: string = minute.toString().padStart(2, '0')
    timesInDay.push(`${formattedHour}:${formattedMinute}`)
  }
}

const CalculatorForm = () => {
  // State for each input field value
  const [cartValue, setCartValue] = useState('')
  const [deliveryDistance, setDeliveryDistance] = useState('')
  const [numberOfItems, setNumberOfItems] = useState('')

  // State for the sliding radio button
  const [deliveryTimeOption, setDeliveryTimeOption] =
    useState<DeliveryTimeOption>(DeliveryTimeOption.Now)

  // State for the selection fields, only relevant if 'later' is selected
  const [selectedDay, setSelectedDay] = useState<Weekday>(Weekday.Today)
  const [selectedTime, setSelectedTime] = useState('00:00')

  // State for the information shown to the user
  const [deliveryFee, setDeliveryFee] = useState('')
  const [error, setError] = useState('')

  // States to track if the input has an error
  const [cartValueError, setCartValueError] = useState(false)
  const [deliveryDistanceError, setDeliveryDistanceError] = useState(false)
  const [numberOfItemsError, setNumberOfItemsError] = useState(false)

  // Event handlers
  const handleCartValueChange = (value: string) => setCartValue(value)
  const handleDeliveryDistanceChange = (value: string) =>
    setDeliveryDistance(value)
  const handleNumberOfItemsChange = (value: string) => setNumberOfItems(value)
  const handleDeliveryTimeOptionToggle = (option: string) =>
    setDeliveryTimeOption(option as DeliveryTimeOption)
  const handleDaySelect = (day: string) => setSelectedDay(day as Weekday)
  const handleTimeSelect = (time: string) => setSelectedTime(time)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    // Resets
    setCartValueError(false)
    setDeliveryDistanceError(false)
    setNumberOfItemsError(false)
    setError('')
    setDeliveryFee('')

    let hasError = false
    if (!cartValue) {
      setCartValueError(true)
      hasError = true
    }
    if (!deliveryDistance) {
      setDeliveryDistanceError(true)
      hasError = true
    }
    if (!numberOfItems) {
      setNumberOfItemsError(true)
      hasError = true
    }

    if (hasError) {
      setError('Please fill in all required fields.')
      return
    }

    if (!selectedDay || !selectedTime || !deliveryTimeOption) {
      setError('Something went wrong with time input.')
      return
    }

    const requestData = transformCalculatorInputToDeliveryFeeRequestData({
      selectedDay,
      selectedTime,
      deliveryTimeOption,
      cartValue,
      deliveryDistance,
      numberOfItems,
    })

    if (!validateDeliveryFeeRequestData(requestData)) {
      return
    }

    try {
      const result = await calculateDeliveryFeeKotlin(requestData)
      let deliveryFeeInEuros = (result.deliveryFee / 100).toFixed(2)
      setDeliveryFee(deliveryFeeInEuros)
    } catch (err) {
      // If there's an error, update the error state
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  return (
    <div className={styles.calculatorContainer}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h1>Delivery Fee Calculator</h1>
        <InputField
          label='Cart Value in €'
          unit='€'
          onChange={handleCartValueChange}
          value={cartValue}
          dataTestId='cartValue'
          validator={(value) => /^(?:\d{0,7}|\d{0,6}[.,]\d{0,1})$/.test(value)}
          hasError={cartValueError}
          setHasError={setCartValueError}
        />
        <InputField
          label='Delivery Distance in meters'
          unit='m'
          onChange={handleDeliveryDistanceChange}
          value={deliveryDistance}
          dataTestId='deliveryDistance'
          validator={(value) => /^\d{0,7}$/.test(value)}
          hasError={deliveryDistanceError}
          setHasError={setDeliveryDistanceError}
        />
        <InputField
          label='Amount of Items'
          onChange={handleNumberOfItemsChange}
          value={numberOfItems}
          dataTestId='amountOfItems'
          validator={(value) => /^\d{0,7}$/.test(value)}
          hasError={numberOfItemsError}
          setHasError={setNumberOfItemsError}
        />
        <SlidingRadioButton
          choices={[
            DeliveryTimeOption.Now.valueOf(),
            DeliveryTimeOption.Later.valueOf(),
          ]}
          onToggle={handleDeliveryTimeOptionToggle}
          selected={deliveryTimeOption}
          dataTestId='deliveryTimeOption'
        />
        {deliveryTimeOption === 'later' && (
          <div className={styles.selectionFieldsContainer}>
            <SelectionField
              label='Day'
              options={
                Object.values(Weekday)
                /*getWeekdaysExcludingTodayAndTomorrow() can't test with this on*/
              }
              onSelect={handleDaySelect}
              selectedOption={selectedDay}
              dataTestId='selectedDay'
            />
            <SelectionField
              label='Time'
              options={timesInDay}
              onSelect={handleTimeSelect}
              selectedOption={selectedTime}
              dataTestId='selectedTime'
            />
          </div>
        )}
        <button
          className={styles.button}
          type='submit'
          data-test-id='calculateButton'
        >
          Calculate Delivery Price
        </button>
        {/* Either deliveryFee or error is shown. Not both. */}
        {deliveryFee && !error && (
          <div data-test-id='fee'>Delivery Fee: {deliveryFee} €</div>
        )}
        {error && (
          <div data-test-id='error' className={styles.errorMessage}>
            {error}
          </div>
        )}
      </form>
    </div>
  )
}

export default CalculatorForm

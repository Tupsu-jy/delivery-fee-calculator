import React from 'react'
import styles from './SlidingRadioButton.module.css'

type SlidingRadioButtonProps = {
  choices: string[]
  onToggle: (option: string) => void
  selected: string
  dataTestId?: string
}

const SlidingRadioButton: React.FC<SlidingRadioButtonProps> = ({
  choices,
  onToggle,
  selected,
  dataTestId,
}) => {
  const getActiveIndex = () => choices.indexOf(selected)

  const sliderWidth = {
    width: `calc(${100 / choices.length}% - 8px)`,
    left: `calc(${getActiveIndex() * (100 / choices.length)}% + 4px)`, // Add 2px to account for the left offset
  }

  return (
    <div className={styles.sliderContainer} data-test-id={dataTestId}>
      <div className={styles.sliderBackground} style={sliderWidth}></div>
      {choices.map((choice) => (
        <button
          type='button'
          key={choice}
          className={`${styles.sliderChoice} ${
            choice === selected ? styles.active : ''
          }`}
          onClick={() => onToggle(choice)}
        >
          {choice}
        </button>
      ))}
    </div>
  )
}

export default SlidingRadioButton

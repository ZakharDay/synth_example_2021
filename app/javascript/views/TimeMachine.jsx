import classnames from 'classnames'
import React, { PureComponent } from 'react'

import ToggleButton from '../control_components/ToggleButton'
import Slider from '../control_components/Slider'

export default class TimeMachine extends PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { mountSpace } = this.props
    mountSpace()
  }

  // 1 hour = 60 minutes = 60 × 60 seconds = 3600 seconds = 3600 × 1000 milliseconds = 3,600,000 ms
  // 3600*1000*24*365
  // 31536000000
  // 15768000000 half of year

  render() {
    const {
      isVisible,
      timeShift,
      currentDate,
      handleSynthRoomVisibilityChange,
      handleTimeShiftChange
    } = this.props

    const { hours, days, months, years } = timeShift

    const classes = classnames({
      controls: true,
      visible: !isVisible
    })

    return (
      <div className="TimeMachine">
        <ToggleButton
          text="S"
          isOn={isVisible}
          handleClick={handleSynthRoomVisibilityChange}
        />

        <div className={classes}>
          <Slider
            name={`${currentDate.hours} hours`}
            property="hours"
            min={-12}
            max={12}
            step={1}
            value={hours}
            handleChange={handleTimeShiftChange}
          />

          <Slider
            name={`${currentDate.days} day`}
            property="days"
            min={-15}
            max={15}
            step={1}
            value={days}
            handleChange={handleTimeShiftChange}
          />

          <Slider
            name={`${currentDate.months} month`}
            property="months"
            min={-6}
            max={6}
            step={1}
            value={months}
            handleChange={handleTimeShiftChange}
          />

          <Slider
            name={`${currentDate.years} year`}
            property="years"
            min={-50}
            max={50}
            step={1}
            value={years}
            handleChange={handleTimeShiftChange}
          />
        </div>
      </div>
    )
  }
}

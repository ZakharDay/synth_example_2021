import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import ToneSynth from '../module_components/ToneSynth'
import ChorusEffect from '../module_components/ChorusEffect'
import FreeverbEffect from '../module_components/FreeverbEffect'
import PingPongDelayEffect from '../module_components/PingPongDelayEffect'
import TremoloEffect from '../module_components/TremoloEffect'
import VibratoEffect from '../module_components/VibratoEffect'
import Channel from '../module_components/Channel'

export default class SynthRoom extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { instruments, handlePropertyValueChange } = this.props
    const instrumentElements = []

    instruments.forEach((instrument, i) => {
      const { id, name, type, node, settings } = instrument
      let instrumentElement

      switch (type) {
        case 'ToneSynth':
          instrumentElement = (
            <ToneSynth
              id={id}
              name={name}
              node={node}
              settings={settings}
              handlePropertyValueChange={handlePropertyValueChange}
              key={i}
            />
          )
          break
        case 'Chorus':
          instrumentElement = (
            <ChorusEffect
              id={id}
              name={name}
              node={node}
              settings={settings}
              handlePropertyValueChange={handlePropertyValueChange}
              key={i}
            />
          )
          break
        case 'Freeverb':
          instrumentElement = (
            <FreeverbEffect
              id={id}
              name={name}
              node={node}
              settings={settings}
              handlePropertyValueChange={handlePropertyValueChange}
              key={i}
            />
          )
          break
        case 'PingPongDelay':
          instrumentElement = (
            <PingPongDelayEffect
              id={id}
              name={name}
              node={node}
              settings={settings}
              handlePropertyValueChange={handlePropertyValueChange}
              key={i}
            />
          )
          break
        case 'Tremolo':
          instrumentElement = (
            <TremoloEffect
              id={id}
              name={name}
              node={node}
              settings={settings}
              handlePropertyValueChange={handlePropertyValueChange}
              key={i}
            />
          )
          break
        case 'Vibrato':
          instrumentElement = (
            <VibratoEffect
              id={id}
              name={name}
              node={node}
              settings={settings}
              handlePropertyValueChange={handlePropertyValueChange}
              key={i}
            />
          )
          break
        case 'Channel':
          instrumentElement = (
            <Channel
              id={id}
              name={name}
              node={node}
              settings={settings}
              handlePropertyValueChange={handlePropertyValueChange}
              key={i}
            />
          )
          break
      }

      instrumentElements.push(instrumentElement)
    })

    return <div className="SynthRoom">{instrumentElements}</div>
  }
}

SynthRoom.propTypes = {
  instruments: PropTypes.array.isRequired,
  handlePropertyValueChange: PropTypes.func.isRequired
}

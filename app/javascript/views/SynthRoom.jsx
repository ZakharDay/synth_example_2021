import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import ToneSynth from '../module_components/ToneSynth'

import AutoFilterEffect from '../module_components/AutoFilterEffect'
import AutoPannerEffect from '../module_components/AutoPannerEffect'
import AutoWahEffect from '../module_components/AutoWahEffect'
import BitCrusherEffect from '../module_components/BitCrusherEffect'
import ChebyshevEffect from '../module_components/ChebyshevEffect'
import ChorusEffect from '../module_components/ChorusEffect'
import DistortionEffect from '../module_components/DistortionEffect'
import FeedbackDelayEffect from '../module_components/FeedbackDelayEffect'
import FreeverbEffect from '../module_components/FreeverbEffect'
import FrequencyShifterEffect from '../module_components/FrequencyShifterEffect'
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
      const instrumentModuleElements = []

      instrument.forEach((instrumentModule, i) => {
        const { id, name, type, node, settings } = instrumentModule

        const components = {
          ToneSynth: ToneSynth,
          AutoFilterEffect: AutoFilterEffect,
          AutoPannerEffect: AutoPannerEffect,
          AutoWahEffect: AutoWahEffect,
          BitCrusherEffect: BitCrusherEffect,
          ChebyshevEffect: ChebyshevEffect,
          ChorusEffect: ChorusEffect,
          DistortionEffect: DistortionEffect,
          FeedbackDelayEffect: FeedbackDelayEffect,
          FreeverbEffect: FreeverbEffect,
          FrequencyShifterEffect: FrequencyShifterEffect,
          PingPongDelayEffect: PingPongDelayEffect,
          TremoloEffect: TremoloEffect,
          VibratoEffect: VibratoEffect,
          Channel: Channel
        }

        const ComponentType = components[type]

        // let instrumentModuleElement
        //
        // switch (type) {
        //   case 'ToneSynth':
        //     instrumentModuleElement = (
        //       <ToneSynth
        //         id={id}
        //         name={name}
        //         node={node}
        //         settings={settings}
        //         handlePropertyValueChange={handlePropertyValueChange}
        //         key={i}
        //       />
        //     )
        //     break
        //   case 'AutoFilter':
        //     instrumentModuleElement = (
        //       <AutoFilterEffect
        //         id={id}
        //         name={name}
        //         node={node}
        //         settings={settings}
        //         handlePropertyValueChange={handlePropertyValueChange}
        //         key={i}
        //       />
        //     )
        //     break
        //   case 'AutoPanner':
        //     instrumentModuleElement = (
        //       <AutoPannerEffect
        //         id={id}
        //         name={name}
        //         node={node}
        //         settings={settings}
        //         handlePropertyValueChange={handlePropertyValueChange}
        //         key={i}
        //       />
        //     )
        //     break
        //   case 'AutoWah':
        //     instrumentModuleElement = (
        //       <AutoWahEffect
        //         id={id}
        //         name={name}
        //         node={node}
        //         settings={settings}
        //         handlePropertyValueChange={handlePropertyValueChange}
        //         key={i}
        //       />
        //     )
        //     break
        //   case 'BitCrusher':
        //     instrumentModuleElement = (
        //       <BitCrusherEffect
        //         id={id}
        //         name={name}
        //         node={node}
        //         settings={settings}
        //         handlePropertyValueChange={handlePropertyValueChange}
        //         key={i}
        //       />
        //     )
        //     break
        //   case 'Chebyshev':
        //     instrumentModuleElement = (
        //       <ChebyshevEffect
        //         id={id}
        //         name={name}
        //         node={node}
        //         settings={settings}
        //         handlePropertyValueChange={handlePropertyValueChange}
        //         key={i}
        //       />
        //     )
        //     break
        //   case 'Chorus':
        //     instrumentModuleElement = (
        //       <ChorusEffect
        //         id={id}
        //         name={name}
        //         node={node}
        //         settings={settings}
        //         handlePropertyValueChange={handlePropertyValueChange}
        //         key={i}
        //       />
        //     )
        //     break
        //   case 'Distortion':
        //     instrumentModuleElement = (
        //       <DistortionEffect
        //         id={id}
        //         name={name}
        //         node={node}
        //         settings={settings}
        //         handlePropertyValueChange={handlePropertyValueChange}
        //         key={i}
        //       />
        //     )
        //     break
        //   case 'FeedbackDelay':
        //     instrumentModuleElement = (
        //       <FeedbackDelayEffect
        //         id={id}
        //         name={name}
        //         node={node}
        //         settings={settings}
        //         handlePropertyValueChange={handlePropertyValueChange}
        //         key={i}
        //       />
        //     )
        //     break
        //   case 'Freeverb':
        //     instrumentModuleElement = (
        //       <FreeverbEffect
        //         id={id}
        //         name={name}
        //         node={node}
        //         settings={settings}
        //         handlePropertyValueChange={handlePropertyValueChange}
        //         key={i}
        //       />
        //     )
        //     break
        //   case 'FrequencyShifter':
        //     instrumentModuleElement = (
        //       <FrequencyShifterEffect
        //         id={id}
        //         name={name}
        //         node={node}
        //         settings={settings}
        //         handlePropertyValueChange={handlePropertyValueChange}
        //         key={i}
        //       />
        //     )
        //     break
        //   case 'PingPongDelay':
        //     instrumentModuleElement = (
        //       <PingPongDelayEffect
        //         id={id}
        //         name={name}
        //         node={node}
        //         settings={settings}
        //         handlePropertyValueChange={handlePropertyValueChange}
        //         key={i}
        //       />
        //     )
        //     break
        //   case 'Tremolo':
        //     instrumentModuleElement = (
        //       <TremoloEffect
        //         id={id}
        //         name={name}
        //         node={node}
        //         settings={settings}
        //         handlePropertyValueChange={handlePropertyValueChange}
        //         key={i}
        //       />
        //     )
        //     break
        //   case 'Vibrato':
        //     instrumentModuleElement = (
        //       <VibratoEffect
        //         id={id}
        //         name={name}
        //         node={node}
        //         settings={settings}
        //         handlePropertyValueChange={handlePropertyValueChange}
        //         key={i}
        //       />
        //     )
        //     break
        //   case 'Channel':
        //     instrumentModuleElement = (
        //       <Channel
        //         id={id}
        //         name={name}
        //         node={node}
        //         settings={settings}
        //         handlePropertyValueChange={handlePropertyValueChange}
        //         key={i}
        //       />
        //     )
        //     break
        // }

        instrumentModuleElements.push(
          <ComponentType
            id={id}
            name={name}
            node={node}
            settings={settings}
            handlePropertyValueChange={handlePropertyValueChange}
            key={i}
          />
        )
      })

      instrumentElements.push(
        <div className="Row" key={i}>
          {instrumentModuleElements}
        </div>
      )
    })

    return <div className="SynthRoom">{instrumentElements}</div>
  }
}

SynthRoom.propTypes = {
  instruments: PropTypes.array.isRequired,
  handlePropertyValueChange: PropTypes.func.isRequired
}

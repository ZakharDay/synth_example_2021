import * as Tone from 'tone'
// import * as melodySynth from '../tunes/melody_synth'
// import * as bassSynth from '../tunes/bass_synth'
// import * as spaceSynth from '../tunes/space_synth'
import * as allEffectsSynth from '../tunes/all_effects_synth'

import React, { PureComponent } from 'react'

import WelcomeScreen from '../views/WelcomeScreen'
import SynthRoom from '../views/SynthRoom'

export default class SynthContainer extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      webAudioStarted: false,
      instruments: []
    }
  }

  startWebAudio = async () => {
    await Tone.start()
    this.initInstruments()

    this.setState({
      webAudioStarted: true
    })
  }

  initInstruments = () => {
    Tone.Transport.bpm.value = 120
    Tone.Transport.start()

    // melodySynth.part.start()
    // bassSynth.sequention.start(0)
    // spaceSynth.sequention.start(0)

    const sequention = allEffectsSynth.sequentions[0]().start(0)
    // allEffectsSynth.sequentions[0].start(0)

    const instruments = [
      // melodySynth.instrument,
      // bassSynth.instrument
      // spaceSynth.instrument
      allEffectsSynth.instrument
    ]

    this.setState({ instruments, sequention })
  }

  handlePropertyValueChange = (id, property, value) => {
    console.log(property, value)
    const instruments = []

    this.state.instruments.forEach((instrument, i) => {
      const newInstrument = []

      instrument.forEach((instrumentModule, i) => {
        const newInstrumentModule = Object.assign({}, instrumentModule)

        if (instrumentModule.id === id) {
          if (property.length === 1) {
            const propertyName = property[0]
            newInstrumentModule.settings[propertyName] = value
          } else if (property.length === 2) {
            const scopeName = property[0]
            const propertyName = property[1]
            newInstrumentModule.settings[scopeName][propertyName] = value
          }
        }

        newInstrument.push(newInstrumentModule)
      })

      instruments.push(newInstrument)
    })

    this.setState({
      instruments
    })
  }

  handleSequenceChange = (key) => {
    const { sequention } = this.state
    sequention.clear()

    const newSequention = allEffectsSynth.sequentions[key]()
    newSequention.start(0)

    this.setState({ sequention: newSequention })
  }

  renderWelcomeScreen = () => {
    return <WelcomeScreen handleStartWebAudio={this.startWebAudio} />
  }

  renderSynthRoom = () => {
    const { instruments } = this.state

    return (
      <SynthRoom
        instruments={instruments}
        handlePropertyValueChange={this.handlePropertyValueChange}
        handleSequenceChange={this.handleSequenceChange}
      />
    )
  }

  render() {
    const { webAudioStarted } = this.state

    return (
      <div className="SynthContainer">
        {webAudioStarted === true
          ? this.renderSynthRoom()
          : this.renderWelcomeScreen()}
      </div>
    )
  }
}

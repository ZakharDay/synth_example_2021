import * as Tone from 'tone'
import * as melodySynth from '../tunes/melody_synth'
import * as bassSynth from '../tunes/bass_synth'
// import * as spaceSynth from '../tunes/space_synth'
// import * as allEffectsSynth from '../tunes/all_effects_synth'
// import * as drumSampler from '../tunes/drum_sampler'
import * as sequencedSynth from '../tunes/sequenced_synth'

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

  mountSpace = () => {
    this.setupSun()
    this.setupMoon()
    this.setupSaturn()
    // setInterval(this.mountSpace, 1000)
  }

  setupSaturn = () => {
    const { altaz, constellation, aberration } = this.props.saturn.position
    const { dDec, dRA } = aberration

    const {
      dLocalApparentSiderialTime,
      atmosphericRefraction,
      topocentric,
      transit
    } = altaz

    // const { dDec, dRA, deg } = atmosphericRefraction
    const { altitude, azimuth } = topocentric
    const { dApproxRiseUT, dApproxSetUT } = transit

    const { instruments } = this.state

    const saturn = instruments[2]
    saturn[1].node.triggerAttack(Math.abs(azimuth) * 4)
    saturn[2].node.frequency.value = Math.abs(altitude)
    saturn[5].node.frequency.value = Math.abs(dDec)
  }

  setupMoon = () => {
    const { altaz, constellation } = this.props.sun.position

    const {
      dLocalApparentSiderialTime,
      atmosphericRefraction,
      topocentric,
      transit
    } = altaz

    const { dDec, dRA, deg } = atmosphericRefraction
    const { altitude, azimuth } = topocentric
    const { dApproxRiseUT, dApproxSetUT } = transit

    const { instruments } = this.state

    const moon = instruments[1]
    moon[1].node.triggerAttack(Math.abs(azimuth) * 4)
    // moon[2].node.frequency.value = altitude
    // moon[6].node.frequency.value = altitude * dLocalApparentSiderialTime
  }

  setupSun = () => {
    const { altaz, constellation } = this.props.sun.position

    const {
      dLocalApparentSiderialTime,
      atmosphericRefraction,
      topocentric,
      transit
    } = altaz

    const { dDec, dRA, deg } = atmosphericRefraction
    const { altitude, azimuth } = topocentric
    const { dApproxRiseUT, dApproxSetUT } = transit

    const { instruments } = this.state

    const sun = instruments[0]
    sun[1].node.triggerAttack(Math.abs(azimuth))
    sun[2].node.frequency.value = Math.abs(altitude)

    sun[6].node.frequency.value =
      Math.abs(altitude) * Math.abs(dLocalApparentSiderialTime)
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

    // const sequention = allEffectsSynth.sequentions[0]().start(0)
    // allEffectsSynth.sequentions[0].start(0)

    // const sequention = drumSampler.part.start()

    const instruments = [
      // spaceSynth.instrument
      // allEffectsSynth.instrument
      // drumSampler.instrument,
      sequencedSynth.instrument,
      bassSynth.instrument,
      melodySynth.instrument
    ]

    this.setState({ instruments })
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
          } else if (property.length === 3) {
            let searchedEvent

            newInstrumentModule.settings.sequence.forEach((event, i) => {
              if (
                event.noteName === property[0] &&
                event.time === property[1]
              ) {
                searchedEvent = event
                newInstrumentModule.settings.sequence.splice(i, 1)
              }
            })

            if (searchedEvent === undefined) {
              newInstrumentModule.settings.sequence.push({
                time: property[1],
                noteName: property[0],
                duration: '4n',
                velocity: 1
              })
            }
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

  renderWelcomeScreen = () => {
    return <WelcomeScreen handleStartWebAudio={this.startWebAudio} />
  }

  renderSynthRoom = () => {
    const { instruments } = this.state

    return (
      <SynthRoom
        instruments={instruments}
        handlePropertyValueChange={this.handlePropertyValueChange}
        mountSpace={this.mountSpace}
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

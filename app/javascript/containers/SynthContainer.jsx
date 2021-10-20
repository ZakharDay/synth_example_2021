import * as Tone from 'tone'

import * as sunSynth from '../tunes/sun_synth'
import * as moonSynth from '../tunes/moon_synth'
import * as saturnSynth from '../tunes/saturn_synth'
import * as plutoSynth from '../tunes/pluto_synth'
import * as neptuneSynth from '../tunes/neptune_synth'
import * as marsSynth from '../tunes/mars_synth'

import React, { PureComponent } from 'react'

import WelcomeScreen from '../views/WelcomeScreen'
import SynthRoom from '../views/SynthRoom'

import { moshier, constant, processor } from '../ephemeris-0.1.0-modified'

// prettier-ignore
const planets = ['sun', 'mercury', 'venus', 'moon', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto', 'chiron', 'sirius']

function getCurrentDate() {
  const now = new Date(Date.now())
  now.setMonth(now.getMonth() + 4)

  const date = {
    year: now.getFullYear(),
    month: now.getMonth(),
    day: now.getDate(),
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds()
  }

  return date
}

function getAstronomicalObjectsData() {
  const date = getCurrentDate()
  const astronomicalObjects = {}

  constant.tlong = 55.755803
  constant.glat = 37.6171107
  processor.init()

  planets.forEach((planet, i) => {
    const data = moshier.body[planet]
    processor.calc(date, data)

    astronomicalObjects[data.key] = data
  })

  return astronomicalObjects
}

let astronomicalObjects = {}

export default class SynthContainer extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      webAudioStarted: false,
      instruments: []
    }
  }

  mountSpace = () => {
    astronomicalObjects = getAstronomicalObjectsData()

    this.setupSun()
    this.setupMoon()
    this.setupSaturn()
    this.setupPluto()
    this.setupNeptune()
    this.setupMars()

    // Mercury
    // Venus
    // Jupiter
    // Uranus

    // Chiron
    // Sirius

    // setInterval(this.mountSpace, 1000)
  }

  setupSun = () => {
    const { altaz, constellation } = astronomicalObjects.sun.position

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
    const chorusEffect = sun[1]
    const vibratoEffect = sun[2]

    sun[0].node.triggerAttack(Math.abs(azimuth))

    this.handlePropertyValueChange(
      chorusEffect.id,
      ['frequency'],
      Math.abs(altitude)
    )

    this.handlePropertyValueChange(
      vibratoEffect.id,
      ['frequency'],
      Math.abs(altitude) * Math.abs(dLocalApparentSiderialTime)
    )

    // sun[1].node.frequency.value = Math.abs(altitude)
    //
    // sun[2].node.frequency.value =
    //   Math.abs(altitude) * Math.abs(dLocalApparentSiderialTime)
  }

  setupMoon = () => {
    const { altaz, constellation } = astronomicalObjects.sun.position

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
    moon[0].node.triggerAttack(Math.abs(azimuth) * 4)
    // moon[2].node.frequency.value = altitude
    // moon[6].node.frequency.value = altitude * dLocalApparentSiderialTime
  }

  setupSaturn = () => {
    const {
      altaz,
      constellation,
      aberration
    } = astronomicalObjects.saturn.position

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
    const autoFilterEffect = saturn[1]
    const phaserEffect = saturn[3]

    saturn[0].node.triggerAttack(Math.abs(azimuth) * 4)

    this.handlePropertyValueChange(
      autoFilterEffect.id,
      ['frequency'],
      Math.abs(altitude)
    )

    this.handlePropertyValueChange(
      phaserEffect.id,
      ['frequency'],
      Math.abs(dDec)
    )

    // saturn[1].node.frequency.value = Math.abs(altitude)
    // saturn[3].node.frequency.value = Math.abs(dDec)
  }

  setupPluto = () => {
    astronomicalObjects = getAstronomicalObjectsData()

    let {
      altitude,
      azimuth
    } = astronomicalObjects.pluto.position.altaz.topocentric

    const { instruments } = this.state
    const pluto = instruments[3]
    const toneSynth = pluto[0]
    const chorusEffect = pluto[1]

    setInterval(() => {
      astronomicalObjects = getAstronomicalObjectsData()
      altitude = astronomicalObjects.pluto.position.altaz.topocentric.altitude
      azimuth = astronomicalObjects.pluto.position.altaz.topocentric.azimuth

      console.log('Pluto', Math.abs(azimuth) * 60)

      // pluto[0].node.detune.value = altitude
      // pluto[1].node.frequency.value = Math.abs(altitude)

      toneSynth.node.triggerAttackRelease(Math.abs(azimuth) * 8, '4n')

      this.handlePropertyValueChange(
        toneSynth.id,
        ['detune'],
        Math.floor(altitude)
      )

      this.handlePropertyValueChange(
        chorusEffect.id,
        ['frequency'],
        Math.abs(altitude)
      )
    }, Math.abs(azimuth) * 60)
  }

  setupNeptune = () => {
    astronomicalObjects = getAstronomicalObjectsData()
    let { azimuth } = astronomicalObjects.neptune.position.altaz.topocentric
    const { instruments } = this.state
    const neptune = instruments[4]
    let timeNow = Math.floor(Math.abs(Tone.now() + Math.abs(azimuth) * 150))

    setInterval(() => {
      timeNow = timeNow + Math.floor(Math.abs(azimuth) * 150)
      astronomicalObjects = getAstronomicalObjectsData()
      azimuth = astronomicalObjects.neptune.position.altaz.topocentric.azimuth
      const { aberration, nutation } = astronomicalObjects.neptune.position

      let noteDataSet = [
        aberration.dRA,
        aberration.dDec,
        nutation.dRA,
        nutation.dDec
      ]

      noteDataSet = noteDataSet.sort(() => 0.5 - Math.random())

      noteDataSet.forEach((noteDataItem, i) => {
        neptune[0].node.triggerAttackRelease(
          Math.floor(Math.abs(azimuth * noteDataItem)),
          '4n',
          Tone.now() + ((i + 1) / 2) * (i + 1)
        )
      })

      console.log('Neptune', Math.abs(azimuth) * 150)
    }, Math.abs(azimuth) * 150)
  }

  setupMars = () => {
    astronomicalObjects = getAstronomicalObjectsData()
    let { azimuth } = astronomicalObjects.mars.position.altaz.topocentric

    const { instruments } = this.state
    const mars = instruments[5]

    setInterval(() => {
      astronomicalObjects = getAstronomicalObjectsData()
      azimuth = astronomicalObjects.mars.position.altaz.topocentric.azimuth
      const noteLength = [2, 4, 8]
      const coef = noteLength[Math.floor(Math.random() * noteLength.length)]
      mars[0].node.triggerAttackRelease(Math.abs(azimuth) * coef, `${coef}n`)

      console.log('Mars', Math.abs(azimuth) * 110)
    }, Math.abs(azimuth) * 110)
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

    // plutoSynth.instrument[0].node.start()

    const instruments = [
      sunSynth.instrument,
      moonSynth.instrument,
      saturnSynth.instrument,
      plutoSynth.instrument,
      neptuneSynth.instrument,
      marsSynth.instrument
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

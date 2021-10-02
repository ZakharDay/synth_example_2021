import * as Tone from 'tone'
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

  generateUniqId = () => {
    return Math.floor(Math.random() * Date.now())
  }

  initInstruments = () => {
    const melodySynthSettings = {
      volume: 0.8,
      detune: 0,
      portamento: 0.05,
      envelope: {
        attack: 0.05,
        attackCurve: 'exponential',
        decay: 0.2,
        decayCurve: 'exponential',
        sustain: 0.2,
        release: 1.5,
        releaseCurve: 'exponential'
      },
      oscillator: {
        type: 'amtriangle',
        modulationType: 'sine',
        // partialCount: 0,
        // partials: [],
        phase: 0,
        harmonicity: 0.5
      }
    }

    const melodySynthChorusSettings = {
      wet: 0,
      type: 'sine',
      frequency: 1.5,
      delayTime: 3.5,
      depth: 0.7,
      spread: 180
    }

    const melodySynthFreeverbSettings = {
      wet: 0,
      roomSize: 0.7,
      dampening: 1000
    }

    const melodySynthPingPongDelaySettings = {
      wet: 0,
      delayTime: 0.25,
      maxDelayTime: 1
    }

    const melodySynthTremoloSettings = {
      wet: 0,
      frequency: 10,
      type: 'sine',
      depth: 0.5,
      spread: 180
    }

    const melodySynthVibratoSettings = {
      wet: 0,
      maxDelay: 0.005,
      frequency: 5,
      depth: 0.1,
      type: 'sine'
    }

    const melodySynthChannelSettings = {
      pan: 0,
      volume: 0,
      mute: false,
      solo: false
    }

    const melodySynthNode = new Tone.Synth(melodySynthSettings)

    const melodySynthChorusNode = new Tone.Chorus(
      melodySynthChorusSettings
    ).start()

    const melodySynthFreeverbNode = new Tone.Freeverb(
      melodySynthFreeverbSettings
    )

    const melodySynthPingPongDelayNode = new Tone.PingPongDelay(
      melodySynthPingPongDelaySettings
    )

    const melodySynthTremoloNode = new Tone.Tremolo(melodySynthTremoloSettings)
    const melodySynthVibratoNode = new Tone.Vibrato(melodySynthVibratoSettings)

    const melodySynthChannelNode = new Tone.Channel(
      melodySynthChannelSettings
    ).toDestination()

    melodySynthNode.chain(
      melodySynthChorusNode,
      melodySynthFreeverbNode,
      melodySynthPingPongDelayNode,
      melodySynthTremoloNode,
      melodySynthVibratoNode,
      melodySynthChannelNode
    )

    const instruments = [
      {
        id: this.generateUniqId(),
        name: 'Melody Synth',
        type: 'ToneSynth',
        node: melodySynthNode,
        settings: melodySynthSettings
      },
      {
        id: this.generateUniqId(),
        name: 'Chorus',
        type: 'Chorus',
        node: melodySynthChorusNode,
        settings: melodySynthChorusSettings
      },
      {
        id: this.generateUniqId(),
        name: 'Freeverb',
        type: 'Freeverb',
        node: melodySynthFreeverbNode,
        settings: melodySynthFreeverbSettings
      },
      {
        id: this.generateUniqId(),
        name: 'Ping Pong Delay',
        type: 'PingPongDelay',
        node: melodySynthPingPongDelayNode,
        settings: melodySynthPingPongDelaySettings
      },
      {
        id: this.generateUniqId(),
        name: 'Tremolo',
        type: 'Tremolo',
        node: melodySynthTremoloNode,
        settings: melodySynthTremoloSettings
      },
      {
        id: this.generateUniqId(),
        name: 'Vibrato',
        type: 'Vibrato',
        node: melodySynthVibratoNode,
        settings: melodySynthVibratoSettings
      },
      {
        id: this.generateUniqId(),
        name: 'Channel',
        type: 'Channel',
        node: melodySynthChannelNode,
        settings: melodySynthChannelSettings
      }
    ]

    // prettier-ignore
    // const seq = new Tone.Sequence(
    //   (time, note) => {
    //     melodySynthNode.triggerAttackRelease(note, 0.8, time)
    //   },
    //   [
    //     'C4', 'E4', 'G4', 'C4', 'E4', 'G4', 'C4', 'E4', 'G4', 'C4', 'E4', 'G4',
    //     'E4', 'G4', 'B3', 'E4', 'G4', 'B3', 'E4', 'G4', 'B3', 'E4', 'G4', 'B3'
    //   ]
    // ).start(0)

    // const seq = new Tone.Sequence(
    //   (time, note) => {
    //     melodySynthNode.triggerAttackRelease(note, '2n.', time)
    //   },
    //   ['C4', 'E4', 'G4', 'B3'],
    //   '1n'
    // ).start(0)

    const seq = new Tone.Sequence(
      (time, note) => {
        melodySynthNode.triggerAttackRelease(note, '1m', time)
      },
      ['C4', 'D4', 'E3', 'E4'],
      '1m'
    ).start(0)

    // const v = 1
    //
    // const part = new Tone.Part(
    //   function (time, note) {
    //     melodySynthNode.triggerAttackRelease(
    //       note.noteName,
    //       note.duration,
    //       time,
    //       note.velocity
    //     )
    //   },
    //   [
    //     {
    //       time: '0:0:0',
    //       noteName: 'F4',
    //       duration: '1n',
    //       velocity: v
    //     },
    //     {
    //       time: '0:0:1',
    //       noteName: 'A4',
    //       duration: '1n',
    //       velocity: v
    //     },
    //     {
    //       time: '0:0:3',
    //       noteName: 'G4',
    //       duration: '1n',
    //       velocity: v
    //     },
    //     {
    //       time: '0:1:0',
    //       noteName: 'B4',
    //       duration: '1n',
    //       // 0.5
    //       velocity: v
    //     },
    //     {
    //       time: '0:1:0.5',
    //       noteName: 'C5',
    //       // noteName: 'C#5',
    //       duration: '1n',
    //       // 0.5
    //       velocity: v
    //     },
    //     {
    //       time: '0:1:1',
    //       noteName: 'E4',
    //       duration: '1n',
    //       velocity: v
    //     },
    //     {
    //       time: '0:1:2',
    //       noteName: 'G4',
    //       duration: '1n',
    //       velocity: v
    //     },
    //     {
    //       time: '0:1:3',
    //       noteName: 'A4',
    //       duration: '1n',
    //       velocity: v
    //     },
    //     {
    //       time: '0:2:0',
    //       noteName: 'F4',
    //       // noteName: 'F#4',
    //       duration: '1n',
    //       // 0.5
    //       velocity: v
    //     },
    //     {
    //       time: '0:2:0.5',
    //       noteName: 'E4',
    //       duration: '1n',
    //       // 0.5
    //       velocity: v
    //     },
    //     {
    //       time: '0:2:1',
    //       noteName: 'G4',
    //       duration: '1n',
    //       velocity: v
    //     },
    //     {
    //       time: '0:2:3',
    //       noteName: 'D4',
    //       // noteName: 'D#4',
    //       duration: '1n',
    //       velocity: v
    //     },
    //     {
    //       time: '0:3:1',
    //       noteName: 'A4',
    //       duration: '1n',
    //       // 0.5
    //       velocity: v
    //     },
    //     {
    //       time: '0:3:1.5',
    //       noteName: 'B4',
    //       duration: '1n',
    //       // 0.5
    //       velocity: v
    //     },
    //     {
    //       time: '0:3:2',
    //       noteName: 'A4',
    //       duration: '1n',
    //       // 0.5
    //       velocity: v
    //     },
    //     {
    //       time: '0:3:2.5',
    //       noteName: 'B4',
    //       duration: '1n',
    //       // 0.5
    //       velocity: v
    //     },
    //     {
    //       time: '1:0:0',
    //       noteName: 'G4',
    //       duration: '1n',
    //       velocity: v
    //     },
    //     {
    //       time: '1:0:1',
    //       noteName: 'G4',
    //       duration: '1n',
    //       velocity: v
    //     },
    //     {
    //       time: '1:0:2',
    //       noteName: 'G4',
    //       duration: '1n',
    //       velocity: v
    //     },
    //     {
    //       time: '1:0:3',
    //       noteName: 'A4',
    //       duration: '1n',
    //       velocity: v
    //     },
    //     {
    //       time: '1:1:0',
    //       noteName: 'B4',
    //       duration: '1n',
    //       velocity: v
    //     },
    //     {
    //       time: '1:1:1',
    //       noteName: 'B4',
    //       duration: '1n',
    //       velocity: v
    //     },
    //     {
    //       time: '1:1:2',
    //       noteName: 'B4',
    //       duration: '1n',
    //       velocity: v
    //     },
    //     {
    //       time: '1:1:3',
    //       noteName: 'A4',
    //       duration: '1n',
    //       velocity: v
    //     },
    //     {
    //       time: '1:2:0',
    //       noteName: 'G4',
    //       duration: '1n',
    //       // 0.5
    //       velocity: v
    //     },
    //     {
    //       time: '1:2:0.5',
    //       noteName: 'A4',
    //       duration: '1n',
    //       // 0.5
    //       velocity: v
    //     },
    //     {
    //       time: '1:2:1',
    //       noteName: 'G4',
    //       duration: '1n',
    //       // 0.5
    //       velocity: v
    //     },
    //     {
    //       time: '1:2:1.5',
    //       noteName: 'A4',
    //       duration: '1n',
    //       // 0.5
    //       velocity: v
    //     },
    //     {
    //       time: '1:3:1',
    //       noteName: 'F4',
    //       duration: '1n',
    //       velocity: v
    //     },
    //     {
    //       time: '1:3:2',
    //       noteName: 'G4',
    //       duration: '1n',
    //       velocity: v
    //     },
    //     {
    //       time: '2:0:0',
    //       noteName: 'A4',
    //       duration: '1n',
    //       // 0.5
    //       velocity: v
    //     },
    //     {
    //       time: '2:0:0.5',
    //       noteName: 'G4',
    //       duration: '1n',
    //       // 0.5
    //       velocity: v
    //     },
    //     {
    //       time: '2:0:1',
    //       noteName: 'A4',
    //       duration: '1n',
    //       // 0.5
    //       velocity: v
    //     },
    //     {
    //       time: '2:0:1.5',
    //       noteName: 'G4',
    //       duration: '1n',
    //       // 0.5
    //       velocity: v
    //     },
    //     {
    //       time: '2:0:2',
    //       noteName: 'B4',
    //       duration: '1n',
    //       // 0.5
    //       velocity: v
    //     },
    //     {
    //       time: '2:0:3',
    //       noteName: 'C5',
    //       duration: '1n',
    //       // 0.5
    //       velocity: v
    //     },
    //     {
    //       time: '2:1:0',
    //       noteName: 'C5',
    //       duration: '1n',
    //       velocity: v
    //     },
    //     {
    //       time: '2:1:1',
    //       noteName: 'C5',
    //       duration: '1n',
    //       velocity: v
    //     },
    //     {
    //       time: '2:1:2',
    //       noteName: 'C5',
    //       duration: '1n',
    //       velocity: v
    //     },
    //     {
    //       time: '2:2:1',
    //       noteName: 'A4',
    //       duration: '1n',
    //       velocity: v
    //     },
    //     {
    //       time: '2:2:3',
    //       noteName: 'G4',
    //       duration: '1n',
    //       velocity: v
    //     },
    //     {
    //       time: '2:3:1',
    //       noteName: 'E4',
    //       duration: '1n',
    //       velocity: v
    //     },
    //     {
    //       time: '2:3:3',
    //       noteName: 'D4',
    //       duration: '1n',
    //       velocity: v
    //     },
    //     {
    //       time: '3:0:1',
    //       noteName: 'C4',
    //       duration: '1n',
    //       velocity: v
    //     }
    //   ]
    // )
    //
    // part.loopEnd = '4m'

    // const v = 1
    //
    // const part = new Tone.Part(
    //   function (time, note) {
    //     melodySynthNode.triggerAttackRelease(
    //       note.noteName,
    //       note.duration,
    //       time,
    //       note.velocity
    //     )
    //   },
    //   [
    //     {
    //       time: '0:0:0',
    //       noteName: 'C3',
    //       duration: '1n',
    //       velocity: v
    //     },
    //     {
    //       time: '1:0:0',
    //       noteName: 'D3',
    //       duration: '1n',
    //       velocity: v
    //     },
    //     {
    //       time: '2:0:0',
    //       noteName: 'B2',
    //       duration: '1n',
    //       velocity: v
    //     },
    //     {
    //       time: '3:0:0',
    //       noteName: 'E3',
    //       duration: '1n',
    //       velocity: v
    //     }
    //   ]
    // )
    //
    // part.loopEnd = '4m'

    Tone.Transport.bpm.value = 120
    Tone.Transport.start()

    // part.loop = true
    // part.start()

    this.setState({
      instruments
    })
  }

  handlePropertyValueChange = (id, property, value) => {
    console.log(property, value)
    // Звук лагает при изменении параметров
    // const { instruments } = this.state
    //
    // instruments.forEach((instrument, i) => {
    //   if (instrument.id === id) {
    //     const propertyLevel1 = property[0]
    //     instrument.settings[propertyLevel1] = value
    //   }
    //
    //   instruments.push(instrument)
    // })

    // Иммутабельный способ, звук не лагает
    const instruments = []

    this.state.instruments.forEach((instrument, i) => {
      const newInstrument = Object.assign({}, instrument)

      if (instrument.id === id) {
        if (property.length === 1) {
          const propertyName = property[0]
          newInstrument.settings[propertyName] = value
        } else if (property.length === 2) {
          const scopeName = property[0]
          const propertyName = property[1]
          newInstrument.settings[scopeName][propertyName] = value
        }
      }

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

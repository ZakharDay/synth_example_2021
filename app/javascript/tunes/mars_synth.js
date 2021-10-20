import * as Tone from 'tone'
import { generateUniqId } from '../utilities'

const synthSettings = {
  volume: -10,
  detune: 0,
  portamento: 0.2,
  envelope: {
    attack: 0.05,
    attackCurve: 'exponential',
    decay: 0.75,
    decayCurve: 'exponential',
    sustain: 0.8,
    release: 0.3,
    releaseCurve: 'exponential'
  },
  oscillator: {
    type: 'amsine',
    modulationType: 'sine',
    // partialCount: 0,
    // partials: [],
    phase: 0,
    harmonicity: 0.5
  }
}

const chorusSettings = {
  wet: 0.8,
  type: 'sine',
  frequency: 45,
  delayTime: 1,
  depth: 0.44,
  spread: 180
}

const distortionSettings = {
  wet: 0.4,
  distortion: 16,
  oversample: '4x'
}

const frequencyShifterSettings = {
  wet: 0.6,
  frequency: 42
}

const freeverbSettings = {
  wet: 0.9,
  roomSize: 0.08,
  dampening: 40
}

const channelSettings = {
  volume: -30,
  pan: 0,
  mute: false,
  solo: false
}

const synthNode = new Tone.Synth(synthSettings)
const chorusNode = new Tone.Chorus(chorusSettings)
const distortionNode = new Tone.Distortion(distortionSettings)
const frequencyShifterNode = new Tone.FrequencyShifter(frequencyShifterSettings)
const channelNode = new Tone.Channel(channelSettings).toDestination()
synthNode.chain(chorusNode, distortionNode, frequencyShifterNode, channelNode)

const v = 1
const d = '4n'

// prettier-ignore
const partSettings = {
  scale: [
    'A1', 'C1', 'D1', 'E1', 'G1',
    'A2', 'C2', 'D2', 'E2', 'G2',
    'A3', 'C3', 'D3', 'E3', 'G3',
    'A4', 'C4', 'D4', 'E4', 'G4',
    'A5', 'C5', 'D5', 'E5', 'G5',
    'A6', 'C6', 'D6', 'E6', 'G6',
    'A7', 'C7', 'D7', 'E7', 'G7',
    'A8', 'C8', 'D8', 'E8', 'G8'
  ],
  sequence: []
}

const partNode = new Tone.Part(function (time, note) {
  synthNode.triggerAttackRelease(
    note.noteName,
    note.duration,
    time,
    note.velocity
  )
}, [])

partNode.loopEnd = '2m'
partNode.loop = true

const instrument = [
  // {
  //   id: generateUniqId(),
  //   name: 'Sequencer',
  //   type: 'Sequencer',
  //   node: partNode,
  //   settings: partSettings
  // },
  {
    id: generateUniqId(),
    name: 'MARS',
    type: 'ToneSynth',
    node: synthNode,
    settings: synthSettings
  },
  {
    id: generateUniqId(),
    name: 'Chorus',
    type: 'ChorusEffect',
    node: chorusNode,
    settings: chorusSettings
  },
  {
    id: generateUniqId(),
    name: 'Distortion',
    type: 'DistortionEffect',
    node: distortionNode,
    settings: distortionSettings
  },
  // {
  //   id: generateUniqId(),
  //   name: 'Feedback Delay',
  //   type: 'FeedbackDelayEffect',
  //   node: feedbackDelayNode,
  //   settings: feedbackDelaySettings
  // },
  {
    id: generateUniqId(),
    name: 'Frequency Shift',
    type: 'FrequencyShifterEffect',
    node: frequencyShifterNode,
    settings: frequencyShifterSettings
  },
  {
    id: generateUniqId(),
    name: 'Channel',
    type: 'Channel',
    node: channelNode,
    settings: channelSettings
  }
]

export { instrument }

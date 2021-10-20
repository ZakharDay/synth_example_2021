import * as Tone from 'tone'
import { generateUniqId } from '../utilities'

const synthSettings = {
  volume: 0.8,
  detune: 0,
  portamento: 0.05,
  envelope: {
    attack: 0.05,
    attackCurve: 'exponential',
    decay: 0.75,
    decayCurve: 'exponential',
    sustain: 0.75,
    release: 0.95,
    releaseCurve: 'exponential'
  },
  oscillator: {
    type: 'fatsine',
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
  frequency: 11,
  delayTime: 1,
  depth: 0.12,
  spread: 180
}

const vibratoSettings = {
  wet: 0.8,
  maxDelay: 0.005,
  frequency: 332,
  depth: 0.01,
  type: 'sine'
}

const channelSettings = {
  volume: -14,
  pan: 0,
  mute: false,
  solo: false
}

const synthNode = new Tone.Synth(synthSettings)
const chorusNode = new Tone.Chorus(chorusSettings).start()
const vibratoNode = new Tone.Vibrato(vibratoSettings)
const channelNode = new Tone.Channel(channelSettings).toDestination()
synthNode.chain(chorusNode, vibratoNode, channelNode)

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
    name: 'SUN',
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
    name: 'Vibrato',
    type: 'VibratoEffect',
    node: vibratoNode,
    settings: vibratoSettings
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

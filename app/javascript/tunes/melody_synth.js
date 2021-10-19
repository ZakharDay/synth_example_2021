import * as Tone from 'tone'
import { generateUniqId } from '../utilities'

const synthSettings = {
  volume: -11,
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

const autoFilterSettings = {
  wet: 0.25,
  type: 'sine',
  frequency: 1,
  depth: 0.22,
  baseFrequency: 200,
  octaves: 2.6,
  filter: {
    type: 'lowpass',
    frequency: 100,
    rolloff: -96,
    Q: 1
  }
}

const autoWahSettings = {
  wet: 0,
  baseFrequency: 100,
  octaves: 6,
  sensitivity: 0,
  Q: 2,
  gain: 2,
  follower: 0.1
}

const chorusSettings = {
  wet: 0.8,
  type: 'sine',
  frequency: 11,
  delayTime: 1,
  depth: 0.12,
  spread: 180
}

const phaserSettings = {
  wet: 0.8,
  frequency: 0.5,
  octaves: 3,
  stages: 10,
  Q: 10,
  baseFrequency: 350
}

const pingPongDelaySettings = {
  wet: 0.45,
  delayTime: 0.25,
  maxDelayTime: 0.13
}

const freeverbSettings = {
  wet: 0.55,
  roomSize: 0.23,
  dampening: 40
}

const channelSettings = {
  volume: -14,
  pan: 0,
  mute: false,
  solo: false
}

const synthNode = new Tone.Synth(synthSettings)
const autoFilterNode = new Tone.AutoFilter(autoFilterSettings).start()
const autoWahNode = new Tone.AutoWah(autoWahSettings)
const chorusNode = new Tone.Chorus(chorusSettings)
const phaserNode = new Tone.Phaser(phaserSettings)
const pingPongDelayNode = new Tone.PingPongDelay(pingPongDelaySettings)
const freeverbNode = new Tone.Freeverb(freeverbSettings)
const channelNode = new Tone.Channel(channelSettings).toDestination()

synthNode.chain(
  autoFilterNode,
  autoWahNode,
  chorusNode,
  phaserNode,
  pingPongDelayNode,
  freeverbNode,
  channelNode
)

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
  sequence: [
    {
      time: '0:0:0',
      noteName: 'G4',
      duration: d,
      velocity: v
    },
    {
      time: '0:0:2',
      noteName: 'C5',
      duration: d,
      velocity: v
    },
    {
      time: '0:1:2',
      noteName: 'D5',
      duration: d,
      velocity: v
    },
    {
      time: '0:2:0',
      noteName: 'G4',
      duration: d,
      velocity: v
    },
    {
      time: '0:2:2',
      noteName: 'D5',
      duration: d,
      velocity: v
    },
    {
      time: '0:3:0',
      noteName: 'G4',
      duration: d,
      velocity: v
    },
    {
      time: '0:3:2',
      noteName: 'A4',
      duration: d,
      velocity: v
    },
    {
      time: '1:2:0',
      noteName: 'G4',
      duration: d,
      velocity: v
    },
    {
      time: '1:3:0',
      noteName: 'G4',
      duration: d,
      velocity: v
    }
  ]
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
  {
    id: generateUniqId(),
    name: 'Sequencer',
    type: 'Sequencer',
    node: partNode,
    settings: partSettings
  },
  {
    id: generateUniqId(),
    name: 'SATURN',
    type: 'ToneSynth',
    node: synthNode,
    settings: synthSettings
  },
  {
    id: generateUniqId(),
    name: 'Auto Filter',
    type: 'AutoFilterEffect',
    node: autoFilterNode,
    settings: autoFilterSettings
  },
  {
    id: generateUniqId(),
    name: 'Auto Wah',
    type: 'AutoWahEffect',
    node: autoWahNode,
    settings: autoWahSettings
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
    name: 'Phaser',
    type: 'PhaserEffect',
    node: phaserNode,
    settings: phaserSettings
  },
  {
    id: generateUniqId(),
    name: 'Ping Pong Delay',
    type: 'PingPongDelayEffect',
    node: pingPongDelayNode,
    settings: pingPongDelaySettings
  },
  {
    id: generateUniqId(),
    name: 'Freeverb',
    type: 'FreeverbEffect',
    node: freeverbNode,
    settings: freeverbSettings
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

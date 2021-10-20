// saturn
// pluto
// neptune

import * as Tone from 'tone'

const freeverbSettings = {
  wet: 0.55,
  roomSize: 0.23,
  dampening: 40
}

const freeverbNode = new Tone.Freeverb(freeverbSettings)

export { freeverbNode }

import React from 'react'
import ReactDOM from 'react-dom'
import SynthContainer from '../containers/SynthContainer'
import { moshier, constant, processor } from '../ephemeris-0.1.0-modified'

// prettier-ignore
const planets = ['sun', 'mercury', 'venus', 'moon', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto', 'chiron', 'sirius']

function getCurrentDate() {
  const now = new Date(Date.now())
  now.setMonth(now.getMonth())

  // dApproxRiseUT:
  // 0.527719253988346 october
  // 0.6446183304350812 november
  // 0.7843465637181565 december
  // 0.8982950490417676 january
  // 0.9081020218049337 february
  // 0.7886182203210013 march
  // 0.6166110992941003 april
  // 0.41804922556116525 may
  // 0.27665320428184637 june
  // 0.23636575039454144 july
  // 0.3010179221332363 august
  // 0.41319301216322424 september
  // 0.5267948062278955 october

  // dApproxSetUT:
  // 3.7414873087499925 october
  // 3.54809191821477 november
  // 3.4129101858268087 december
  // 3.4025205031445718 january
  // 3.5125417311543106 february
  // 3.660454096953498 march
  // 3.7804810015238575 april
  // 3.9036952926449535 may
  // 4.021036485657554 june
  // 4.101911753785461 july
  // 4.078837833882609 august
  // 3.9425724595269904 september
  // 3.74308245151618 october

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

document.addEventListener('DOMContentLoaded', () => {
  const astronomicalObjects = getAstronomicalObjectsData()

  ReactDOM.render(
    <SynthContainer {...astronomicalObjects} />,
    document.body.appendChild(document.createElement('div'))
  )
})

import './WebMidi.css'
import { WebMidi } from 'webmidi'
import React, { useState, useRef } from 'react'

import Dropdown from '../Dropdown'

import { onEnabled, MidiDevOut, MidiOutPlay } from './WebMidi.js'

WebMidi.enable()
  .then(onEnabled)
  .catch(err => console.log(err))

export function WebMidiCont () {
  function OpenMidiWin () {
    if (document.getElementById('midiInfo').style.display === 'block') {
      document.getElementById('midiInfo').style.display = 'none'
    } else {
      document.getElementById('contentmenu').style.width = '0%'
      document.getElementById('setingsMenu').style.width = '0%'
      document.getElementById('midiInfo').style.display =
        'block' /** from 100% to 25% **/
    }
    console.log('testMidiWin')
  }
  window.OpenMidiWin = OpenMidiWin

  const [deviceNameInArr, setDeviceNameInArr] = useState([])
  const [deviceNameOutArr, setDeviceNameOutArr] = useState([])
  const [selDevOut, setSelDevOut] = useState([])
  console.log(
    '🚀 ~ file: MidiComponent.js ~ line 30 ~ WebMidiCont ~ selDevOut',
    selDevOut
  )
  window.OpenMidiWin = OpenMidiWin

  function CheckMidiDevices () {
    let midiInputDevArr = []
    let midiOutDevArr = []
    // WebMidi.inputs.forEach((input) => midiInputDevArr.push(input.name));
    // setDeviceNameInArr(midiInputDevArr);
    // Outputs
    WebMidi.outputs.forEach(output => {
      return midiOutDevArr.push(output.name)
    })
    setDeviceNameOutArr(midiOutDevArr)
    console.log(
      '🚀 ~ file: MidiComponent.js ~ line 43 ~ CheckMidiDevices ~ WebMidi.outputs',
      WebMidi.outputs
    )

    return
  }
  //   CheckMidiDevices();

  let midiDevOut = MidiDevOut()
  window.midiDevOut = midiDevOut
  console.log(
    '🚀 ~ file: MidiComponent.js ~ line 41 ~ WebMidiCont ~ midiDevOut',
    midiDevOut
  )
  const numberOfMeasures = useRef(['0', '1', '2', '3', '4', '5', '6'])

  const handleMeasuresToStudyChange = (element, index, oldValue, newValue) => {
    let selDev = newValue
    setSelDevOut(selDev)
    console.log(
      '🚀 ~ file: MidiComponent.js ~ line 52 ~ handleMeasuresToStudyChange ~ selDev',
      selDev
    )
  }

  function MidiOutSelDev (note, dur, vol) {
    MidiOutPlay(note, dur, vol, selDevOut)
  }
  window.MidiOutSelDev = MidiOutSelDev

  return (
    <div className='midiInfo' id='midiInfo'>
      {deviceNameInArr}
      {deviceNameOutArr}
      <button
        onClick={() => {
          CheckMidiDevices()
        }}
      >
        Check For Midi Output Devices
      </button>
      <div>
        <Dropdown
          options={{
            // value:
            onchange: handleMeasuresToStudyChange,
            data: numberOfMeasures.current,
            newOptions: false,
            width: '100px'
          }}
        />
      </div>
      <p>Selected Output Device: {selDevOut}</p>
    </div>
  )
}

// export default WebMidiCont;

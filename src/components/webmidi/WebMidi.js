import './WebMidi.css'
import { WebMidi } from 'webmidi'
import React, { useState, useRef } from 'react'

import Dropdown from '../Dropdown'

let deviceNameInArr = []
let deviceNameOutArr2 = []

export function onEnabled () {
  // Display available MIDI input devices
  if (WebMidi.inputs.length < 1) {
    console.log(
      '🚀 ~ file: WebMidi.js ~ line 13 ~ onEnabled ~ WebMidi.inputs.length',
      WebMidi.inputs.length
    )
    console.log('No device detected.')
  } else {
    document.getElementById('midiButton').style.display = 'block'
    // WebMidi.inputs.forEach((device, index) => {
    //   deviceNameInArr.push(device.name);
    // });

    WebMidi.outputs.forEach(output =>
      console.log(output.manufacturer, output.name)
    )
    console.log(
      '🚀 ~ file: WebMidi.js ~ line 23 ~ onEnabled ~ output.name',
      WebMidi.outputs
    )

    // document.getElementById('midiDevice').innerHTML = deviceNameOutArr;
    // console.log(
    //   '🚀 ~ file: midi.js ~ line 14 ~ onEnabled ~ deviceName',
    //   deviceNameOutArr
    // );
    // const myOutput = WebMidi.getOutputByName(deviceName);

    // channel.playNote('C3');
    // const mySynth = WebMidi.inputs[0];
    WebMidi.inputs[0].addListener(
      'noteon',
      e => {
        // console.log(`${e.note.number}`);
        PushKeyboardPlay(e.note.number)
        window.LiveFeedbackNotes(e.note.number)
      },
      {
        channels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
      }
    )
  }
}
window.WebMidi = WebMidi
function PushKeyboardPlay (note) {
  if (note === 21) {
    window.FeedbackOpen()
  } else {
    if (note === 108) {
      window.deleteAndstartCounter()
    } else {
      const newEvents = {
        midiNumber: note,
        time: 0,
        duration: 0
      }
      window.recordings = {
        events: window.recordings.events.concat(newEvents),
        currentTime: 0
      }
      window.CountUserInp()
    }
  }
}

export function MidiDevOut () {
  let midiDevOut = []
  WebMidi.outputs.forEach(output => midiDevOut.push(output.name))
  return midiDevOut
}

export function MidiOutPlay (note, dur, vol, device) {
  let output = WebMidi.outputs[device]
  let channel = output.channels[1]
  channel.playNote(note, { duration: dur, attack: vol })
}

// Function triggered when WEBMIDI.js is ready

//   curentNote = e.note.number;
//   const newEvents = {
//     midiNumber: e.note.number,
//     time: 0,
//     duration: 0,
//   };
//   window.recordings = {
//     events: window.recordings.events.concat(newEvents),
//     currentTime: 0,
//   };

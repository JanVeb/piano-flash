import '../App.css'
import { React, useState } from 'react'

import PianoController from './PianoController'
// import SoundFont2 from 'sf2-player';
// import { Notes } from '@material-ui/icons';

// const sf2 = new SoundFont2();

export default function PianoKeyboard () {
  // const [soundFont, setSoundFont] = useState(false);

  // sf2
  //   .loadSoundFontFromURL(
  //     ''
  //     // 'assets/piano/Giga_Piano.sf2'
  //   )
  //   .then(() => {
  //     // sf2.loadSoundFontFromURL('assets/piano/MasonHamlin-A-v7.sf2').then(() => {
  //     sf2.bank = sf2.banks[0].id;
  //     sf2.program = sf2.programs[0].id;
  //     setSoundFont(true);
  //   });

  // window.sf2 = sf2;

  const [pianoKeyFirst, setPianoKeyFirst] = useState(getFirstKey())
  function PianoKeyFirst (pianoKeyFirstSet) {
    setPianoKeyFirst(pianoKeyFirstSet)
  }
  window.PianoKeyFirst = PianoKeyFirst

  function getFirstKey () {
    let settings = JSON.parse(localStorage.getItem('settings'))
    let firstKey = !settings['pianoKeyFirst'] ? 'f1' : settings['pianoKeyFirst']
    return firstKey
  }

  const [pianoKeyLast, setPianoKeyLast] = useState(getLastKey())
  function PianoKeyLast (pianoKeyLastSet) {
    setPianoKeyLast(pianoKeyLastSet)
  }
  window.PianoKeyLast = PianoKeyLast
  function getLastKey () {
    let settings = JSON.parse(localStorage.getItem('settings'))
    let lastKey = !settings['pianoKeyLast'] ? 'e7' : settings['pianoKeyLast']
    return lastKey
  }

  return (
    <div
    // className="pianos"
    >
      {/* {pianoKeys} */}
      <PianoController
        firstNote='f4'
        secondNote={pianoKeyLast}
        // soundFont={soundFont}
      />
      <PianoController
        firstNote={pianoKeyFirst}
        secondNote='e4'
        // soundFont={soundFont}
      />
      {/* <PianoController firstNote="f5" secondNote="e7" soundFont={soundFont} />
      <PianoController firstNote="f3" secondNote="e5" soundFont={soundFont} />
      <PianoController firstNote="f1" secondNote="e3" soundFont={soundFont} /> */}
    </div>
  )
}

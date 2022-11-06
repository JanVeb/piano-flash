import '../App.css'

import React, { useState, useEffect } from 'react'

import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano'
import 'react-piano/dist/styles.css'

// import useWindowDimensions from '../pages/DimensionsProvider'
import SoundfontProvider from '../pages/SoundfontProvider'

// import HowlerFVPiano from '../components/howlerFVPiano/HowlerFVPiano';

// webkitAudioContext fallback needed to support Safari
const audioContext = new (window.AudioContext || window.webkitAudioContext)()

window.recordings = {
  events: [],
  currentTime: null
}

// these 3 variables need to be outside of the export function, otherwise, playing the upper and botom on screen keyboards will save events separately
var imageOffset = 0
var userToScoreNotesLength = 0

// translated notes move cursor
let cursorpositionsMapTrans = {}
let preCountCursorPositionTrans = 0
let currentNoteTrans = 0
// osmd move cursor
let cursorpositionsMap = {}
let preCountCursorPosition = 0
let currentNote = 0

window.measureSelectedNotes = []

function FilterNotesPianoC () {
  window.measureSelectedNotes = []
  let fisrtMeasureNumber = window.osmd.Sheet.sourceMeasures[0].MeasureNumberXML
  let FirstMeasure1or0 = fisrtMeasureNumber === 0 ? 1 : 0
  let settings = JSON.parse(localStorage.getItem('settings'))
  for (let i = 0; i < window.allNotes.length; i++) {
    for (
      var e = settings['measureStart'] - FirstMeasure1or0;
      e <= settings['measureEnd'];
      e++
    ) {
      if (window.allNotes[i].noteObject.sourceMeasure.MeasureNumberXML === e) {
        window.measureSelectedNotes.push({
          note: window.allNotes[i].note,
          measure: window.allNotes[i].noteObject.sourceMeasure.MeasureNumberXML,
          noteObject: window.allNotes[i].noteObject,
          time: window.allNotes[i].time
        })

        // window.measureSelectedNotes.push(window.measureSelectedNotes[i].noteObject.sourceMeasure.MeasureNumberXML)
      }
    }
  }
}
window.FilterNotesPianoC = FilterNotesPianoC

export default function PianoController (props) {
  var state = {
    keysDown: {},
    notesRecorded: true,
    keyDownTimestamp: null
  }
  useEffect(() => {
    let settings = JSON.parse(localStorage.getItem('settings'))
    setTimeout(
      () =>
        (document.getElementsByClassName('closeSplashAni')[0].style.display =
          'block'),
      30
    )

    // setTimeout(
    //   () => (window.osmd.PlaybackManager.sf2Player = window.sf2),
    //   1500
    // );
    setTimeout(
      () => (document.getElementById('toggle5').style.visibility = 'hidden'),
      500
    )
    // setTimeout(
    //   () => (document.getElementById('pianoWindow').style.height = '44vh'),
    //   500
    // );
    //AndroidOrWeb
    setTimeout(
      () => (document.getElementById('scrollText').style.height = '34px'),
      500
    )
    //AndroidOrWeb
    setTimeout(
      () => (document.getElementsByClassName('page')[0].style.height = '100vh'),
      500
    )
    setTimeout(
      () =>
        (document.getElementById('backTrackVol').defaultValue =
          settings['backTrackVol'] * 100),
      2000
    )

    setTimeout(() => window.bgcolor(), 1500)
    document.documentElement.style.setProperty(
      'background',
      settings['darkMode'] === 'Off' ? 'rgb(244, 244, 244)' : 'rgb(30, 30, 30)'
    )
    document.getElementById('translateNotesWindow').scrollTop = 60
    window.getOSMDSizeScale()
    setTimeout(() => window.StartExercise(), 1500)
    // setTimeout(() => window.AddPaddingToCurrsor(), 1500);
  }, [props.soundFont])

  var recording_mode = 'RECORDING'

  const onPlayNoteInput = midiNumber => {
    state['notesRecorded'] = false
    state['keyDownTimestamp'] = Date.now()
  }

  const onStopNoteInput = (midiNumber, { prevActiveNotes }) => {
    if (state['notesRecorded'] === false) {
      recordNotes(prevActiveNotes, state.keyDownTimestamp)
      state['notesRecorded'] = true
      state['keyDownTimestamp'] = null
    }
  }

  const recordNotes = (midiNumbers, keyDownTimestamp) => {
    if (recording_mode !== 'RECORDING') {
      return
    }
    var now = Date.now()
    const newEvents = midiNumbers.map(midiNumber => {
      window.LiveFeedbackNotes(midiNumber)
      return {
        midiNumber,
        time: keyDownTimestamp,
        duration: (now - keyDownTimestamp) / 1000
      }
    })
    window.recordings = {
      events: window.recordings.events.concat(newEvents),
      currentTime: now
    }
    window.CountUserInp()
    // if (settings['mesaureDistance'] === '1000') {
    // WholeScoreMoveCursor() //move cursor
    // } else {
    //   SliceOfScoreMoveCursor();
    // }

    if (
      document.getElementById('translateNotesWindow').style.display === 'block'
    ) {
      CalcTransCursorPos()
    }
  }

  // --------------------------- translated notes move cursor

  // Move translated cursor when play in on

  const element = document.getElementById('translateNotesWindow')
  let cursorIndex = 0

  // function MyNamespace() {
  //   // FluidCursorStart();
  //   if (element.style.display === 'block') {
  //     imageOffset = 50 * cursorIndex + 100;
  //     element.scrollLeft = (imageOffset - 100) * getTranslatedNotesSize();

  //     document.getElementById('cursorOnTranslatedN').style.left =
  //       imageOffset + 'px';
  //   }
  //   cursorIndex++;
  //   console.log(
  //     '🚀 ~ file: PianoController.js ~ line 171 ~ MyNamespace ~ cursorIndex',
  //     cursorIndex
  //   );

  //   // test acesing gNotes
  //   // for (let i = 0; i < window.osmd.cursor.GNotesUnderCursor().length; i++) {
  //   //   let currentId =
  //   //     window.osmd.cursor.GNotesUnderCursor()[i].vfnote[0].attrs.id;
  //   //   document.querySelector(
  //   //     `#vf-${currentId} > g.vf-note > g.vf-notehead > path`
  //   //   ).attributes.fill.nodeValue = 'white';
  //   // }
  // }

  // window.MyNamespace = MyNamespace;

  function OnStopResetTranslate () {
    cursorIndex = 0
    imageOffset = 50 * cursorIndex + 100
    element.scrollLeft = (imageOffset - 100) * getTranslatedNotesSize()

    document.getElementById('cursorOnTranslatedN').style.left =
      imageOffset + 'px'
  }
  window.OnStopResetTranslate = OnStopResetTranslate

  function PrecountCursorPositionsTranslated () {
    for (let i = 0; i + 1 < window.measureSelectedNotes.length; i++) {
      // if (i < window.allNotesWRest.length) {
      if (
        window.measureSelectedNotes[i].time !==
        window.measureSelectedNotes[i + 1].time
      ) {
        preCountCursorPositionTrans++
      }
      if (window.measureSelectedNotes[i].note > 12) {
        currentNoteTrans++
      }
      cursorpositionsMapTrans[currentNoteTrans] = preCountCursorPositionTrans
      // }
    }
  }

  function getTranslatedNotesSize () {
    let settings = JSON.parse(localStorage.getItem('settings'))
    return settings['osmdSize']
  }

  function moveTranslateCursor () {
    if (preCountCursorPositionTrans === 0) {
      // populate cursorpositionsMap if its empty
      PrecountCursorPositionsTranslated()
    }
    if (window.measureSelectedNotes.length <= window.recordings.events.length) {
      // dont move cursor to previous position if user played more notes than there are notes in score
      return
    }

    imageOffset =
      50 * cursorpositionsMapTrans[window.recordings.events.length] + 100
    element.scrollLeft = (imageOffset - 100) * getTranslatedNotesSize()

    document.getElementById('cursorOnTranslatedN').style.left =
      imageOffset + 'px'
  }

  function CalcTransCursorPos () {
    if (
      window.recordings.events.length <=
      window.measureSelectedNotes.length - 1
    ) {
      if (
        window.measureSelectedNotes[window.recordings.events.length - 1]
          .time !==
        window.measureSelectedNotes[window.recordings.events.length].time
      ) {
        // userToScoreNotesLength++;
      }
    }
    moveTranslateCursor()
  }

  function CalcTransCursorPosDel () {
    // if (window.recordings.events.length >= 1) {
    //   if (window.recordings.events.length <= window.measureSelectedNotes.length - 1) {
    //     if (
    //       window.measureSelectedNotes[window.recordings.events.length - 1].time !==
    //       window.measureSelectedNotes[window.recordings.events.length].time
    //     ) {
    //       userToScoreNotesLength--;
    //     }
    //   }

    // return  userToScoreNotesLength;
    if (window.recordings.events.length === 0) {
      imageOffset = 100
      element.scrollLeft = (imageOffset - 50) * getTranslatedNotesSize()

      document.getElementById('cursorOnTranslatedN').style.left =
        imageOffset + 'px'
    } else {
      moveTranslateCursor()

      // } else {
      // userToScoreNotesLength = 0;
      // moveTranslateCursor();
    }
  }

  window.CalcTransCursorPosDel = CalcTransCursorPosDel

  function CalcTransCursorPosDelAll () {
    cursorpositionsMapTrans = {}
    preCountCursorPositionTrans = 0
    currentNoteTrans = 0
    // moveTranslateCursor();
    imageOffset = 100
    element.scrollLeft = (imageOffset - 50) * getTranslatedNotesSize()

    document.getElementById('cursorOnTranslatedN').style.left =
      imageOffset + 'px'
  }
  window.CalcTransCursorPosDelAll = CalcTransCursorPosDelAll

  //-----------------------

  function WholeScoreMoveCursor () {
    if (window.measureSelectedNotes.length <= window.recordings.events.length) {
      // dont move cursor to previous position if user played more notes than there are notes in score
      return
    }
    window.osmd.PlaybackManager.setPlaybackStart(
      window.measureSelectedNotes[
        window.recordings.events.length
      ].noteObject.getAbsoluteTimestamp()
    )
    // window.SetLSDPosition();
  }

  function previous () {
    WholeScoreMoveCursor()
  }

  function clearCursorPositions () {
    // currentNote = 0; //need this or not for translated?
    // window.osmd.PlaybackManager.setPlaybackStart(
    //   window.measureSelectedNotes[
    //     window.recordings.events.length
    //   ].noteObject.getAbsoluteTimestamp()
    // );
    // window.SetLSDPosition();
  }

  window.previous = previous // used in UserInputWindow.js
  window.clearCursorPositions = clearCursorPositions

  const noteRange = {
    first: MidiNumbers.fromNote(props.firstNote),
    last: MidiNumbers.fromNote(props.secondNote)
  }

  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: noteRange.first,
    lastNote: noteRange.last,
    keyboardConfig: [] //KeyboardShortcuts.HOME_ROW,
  })

  const calcWidth = containerWidth => {
    return containerWidth
  }

  let settings = !JSON.parse(localStorage.getItem('settings'))
    ? {}
    : JSON.parse(localStorage.getItem('settings'))
  if (settings['noteLabelsOnOff'] === undefined) {
    settings['noteLabelsOnOff'] = true
    localStorage.setItem('settings', JSON.stringify(settings))
  }
  const [renderNotes, setRenderNotes] = useState(settings['noteLabelsOnOff'])

  function RenderNotesF () {
    if (renderNotes === true) {
      setRenderNotes(false)
      // localStorage.setItem("noteLabelsOnOff", JSON.stringify(false));
    } else {
      setRenderNotes(true)
      // localStorage.setItem("noteLabelsOnOff", JSON.stringify(true));
    }
  }
  window.RenderNotesF = RenderNotesF

  const autoColorSet = {
    // color set from MuseScore Color notehead plugin version 1.1 by Werner Schweer and others
    C: '#BABD00', //"#eeee00",
    D: '#9b30ff',
    E: '#ee9a00',
    F: '#8b4513',
    G: '#ff0000',
    A: '#1e90ff',
    B: '#00ff00'
  }

  return (
    <div
    // style={{ width: 'window.innerWidth()', height: 'window.innerHeight()' }}
    >
      {/* <HowlerFVPiano /> */}
      {/*need this imort in order for window.noteOn from holwer works in SoundFontProvider */}
      {/* <DimensionsProvider> */}
      {/* {({ containerWidth, containerHeight }) => ( */}
      <SoundfontProvider
        // instrumentName="Grand Piano"
        // instrumentName="acoustic_grand_piano"
        audioContext={audioContext}
        // hostname={soundfontHostname}
        render={({ playNote, stopNote }) => (
          <Piano
            noteRange={noteRange}
            // width={calcWidth(containerWidth, containerHeight)}
            height={'10vh'}
            playNote={playNote}
            stopNote={stopNote}
            onPlayNoteInput={onPlayNoteInput}
            onStopNoteInput={onStopNoteInput}
            keyboardShortcuts={keyboardShortcuts}
            renderNoteLabel={({
              keyboardShortcut,
              midiNumber,
              isActive,
              isAccidental
            }) =>
              isAccidental === true ? null : (
                <div>
                  <p> {renderNotes ? midiNumber : null}</p>
                  <p
                    style={{
                      color:
                        autoColorSet[
                          window.midiToNote[midiNumber].replace(/[^a-z]/gi, '')
                        ]
                    }}
                  >
                    {' '}
                    {renderNotes ? window.midiToNote[midiNumber] : null}
                  </p>
                </div>
              )
            }
            // disabled={!props.soundFont}
            className='PianoJanisTheme'
          />
        )}
      />
      {/* )} */}
      {/* </DimensionsProvider> */}
    </div>
  )
}
// calculate cursor positions
// const element = document.getElementById('translateNotesWindow');

// function getTranslatedNotesSize() {
//   let settings = JSON.parse(localStorage.getItem('settings'));
//   return settings['osmdSize'];
// }

// for (let i = 0; i < 100; i++) {
// imageOffset =
// 50 * i + 100;
// element.scrollLeft = (imageOffset - 100) * getTranslatedNotesSize();

// document.getElementById('cursorOnTranslatedN').style.left =
// imageOffset + 'px';
// }

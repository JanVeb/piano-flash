import React, { useState } from 'react'
import '../App.css'

// import { PlayArrow, SkipPrevious, Pause, Spellcheck } from '@material-ui/icons'
import MetronomeComp from './Metronome'

import {
  NotesToPlay,
  CountdownPlay,
  CountdownStop,
  BackTrackPlay,
  BackTrackStop,
  BackTrackPause
} from '../components/howlerFVPiano/HowlerFVPiano'

// import { BeamType } from 'musicxml-interfaces';
// import { ReactComponent as pianoIcon } from '../../assets/keys/pianoIcon.svg';

// !!!need this import, it apears its not used, but its used under window.MidiToNote, otherwise app doesnt work
import MidiToNote from '../data/MidiToNote'

window.initialisePlayer = 0
// let cursorpositionsMapTrans = {};
// let preCountCursorPositionTrans = 0;
// let currentNoteTrans = 0;
// let notesByBeat = [];

let index = -1
let stopPlay = false
let cursorIndex = 0

export default function PlayerController ({ player, setCurentCursorNotes }) {
  const [playPauseIcon, setPlayPauseIcon] = useState(true)

  let correctVolume = 0.8
  let prevBeat

  let timeOutVar

  function StartCountdown () {
    if (playPauseIcon === false) {
      StartPlay()
    } else {
      StopStartTimer(true)
      CountdownNumbers(true)

      CountdownStop()

      StopStartTimer(false)
      CountdownNumbers(false)
      CountdownPlay()
      CountdownNumbers()
    }
  }

  function StopStartTimer (terminator) {
    if (playPauseIcon === false) {
      return
    }
    if (terminator) {
      clearTimeout(timeOutVar)
    } else {
      // do something
      timeOutVar = setTimeout(function () {
        StartPlay()
      }, 5000)
    }
  }

  let tcg3
  let tcg2
  let tcg1
  let tcg0
  let tcgSET
  let tcgGO
  let tcgWindow
  let countdownText = document.getElementById('countdownNumber')
  let countdownWindow = document.getElementById('countdownWindow')
  function CountdownNumbers (terminateCountGraphic) {
    if (terminateCountGraphic) {
      clearTimeout(tcg3)
      clearTimeout(tcg2)
      clearTimeout(tcg1)
      clearTimeout(tcgSET)
      clearTimeout(tcgGO)
      clearTimeout(tcg3)
      clearTimeout(tcgWindow)
      countdownText.innerHTML = '3'
      countdownWindow.style.display = 'none'
    } else {
      countdownWindow.style.display = 'block'
      tcg2 = setTimeout(() => (countdownText.innerHTML = '2'), 1000)
      tcg1 = setTimeout(() => (countdownText.innerHTML = '1'), 2000)
      tcg0 = setTimeout(() => (countdownText.innerHTML = '0'), 3000)
      tcgSET = setTimeout(() => (countdownText.innerHTML = 'SET'), 4000)
      tcgGO = setTimeout(() => (countdownText.innerHTML = 'GO'), 4500)
      tcgWindow = setTimeout(
        () => (countdownWindow.style.display = 'none'),
        5000
      )
      tcg3 = setTimeout(() => (countdownText.innerHTML = '3'), 5000)
    }
  }

  function StartPlay () {
    if (playPauseIcon === false) {
      stopPlay = true
      setPlayPauseIcon(true)
      BackTrackPause()
    } else {
      stopPlay = false
      index = -1
      PlayFunc(window.cursorNotes)
      BackTrackPlay()

      setPlayPauseIcon(false)
    }
  }
  const stop = () => {
    StopStartTimer(true)
    CountdownNumbers(true)
    CountdownStop()
    cursorIndex = 0
    index = -1
    BackTrackStop()
    stopPlay = true
    // window.stopPlay = true;
    // CalculateNextTimePlay();
    // player.playbackManager.pause();
    // player.playbackManager.reset();

    document.getElementById('cursorOnSVGScore').style.top =
      window.cursorNotes[0][0].cT + 140 + 'px'
    document.getElementById('cursorOnSVGScore').style.left =
      window.cursorNotes[0][0].cL + 'px'
    document.getElementById('cursorOnSVGScore').style.height =
      window.cursorNotes[0][0].cH + 120 + 'px'
    document
      .getElementById('cursorOnSVGScore')
      .scrollIntoView({ behavior: 'auto', block: 'start' })
    document.getElementById('cursorOnSVGScore').style.backgroundColor = 'lime'

    window.OnStopResetTranslate()
    setPlayPauseIcon(true)
  }
  window.stop = stop

  // const play = () => {
  //   setPlayPauseIcon(true);

  //   setPlayPauseIcon(false);
  // };

  // const play = () => {
  //   if (window.initialisePlayer === 0) {
  //     player.playbackManager.play();
  //     // CalculateNextTimePlay()

  //     setTimeout(() => stop(), 300);
  //     // setTimeout(isPlayingListener, 500);
  //     window.initialisePlayer++;
  //     setTimeout(() => CheckIfInitialised(), 350);
  //   }
  //   if (player.playbackManager.isPlaying === true) {
  //     // stop and start again
  //     player.playbackManager.pause();
  //     setPlayPauseIcon(true);
  //   } else {
  //     StopPlayOnSelMeasures();
  //     player.playbackManager.play();
  //     setPlayPauseIcon(false);
  //     // setIsPlayingListener();
  //   }
  //   // setIsPlayingListener();
  // };

  let cursorPositionsDistance = 0
  let fluidDuration = 0

  let cursorLeft = 0
  function MoveCursors (measureSelectedNotes2) {
    if (measureSelectedNotes2.length - 1 <= cursorIndex) {
      cursorPositionsDistance = 30
    } else {
      cursorPositionsDistance =
        measureSelectedNotes2[cursorIndex + 1][0].cL -
        measureSelectedNotes2[cursorIndex][0].cL
    }

    fluidDuration =
      (measureSelectedNotes2[cursorIndex + 1][0].rT -
        measureSelectedNotes2[cursorIndex][0].rT) /
      30 /
      (GetTempo() / 100)
    cursorLeft = measureSelectedNotes2[cursorIndex][0].cL
    document.getElementById('cursorOnSVGScore').style.top =
      measureSelectedNotes2[cursorIndex][0].cT * OsmdSize() + 140 + 'px'
    document.getElementById('cursorOnSVGScore').style.backgroundColor = 'lime'

    document
      .getElementById('cursorOnSVGScore')
      .scrollIntoView({ behavior: 'auto', block: 'start' })
    FluidCursorStart(measureSelectedNotes2)
    setTimeout(() => MoveCursors(), measureSelectedNotes2[cursorIndex][0].rT)
  }

  function startCursor () {
    cursorIndex = 0
    MoveCursors()
  }
  window.startCursor = startCursor

  function FluidCursorStart (measureSelectedNotes2) {
    for (let i = 0; i <= 29; i++) {
      setTimeout(function () {
        FluidCursorMove(i, measureSelectedNotes2)
      }, i * fluidDuration)
    }
    cursorIndex++
  }

  function FluidCursorMove (fluidIndex, measureSelectedNotes2) {
    // document.getElementById('osmdCanvasPage1').scrollLeft =
    //   cursorLeft * OsmdSize() +
    //   (fluidIndex * cursorPositionsDistance) / 30 -
    //   100;
    if (cursorPositionsDistance > 0) {
      document.getElementById('cursorOnSVGScore').style.left =
        cursorLeft * OsmdSize() +
        (fluidIndex * cursorPositionsDistance) / 30 +
        'px'
      document.getElementById('cursorOnSVGScore').style.height =
        measureSelectedNotes2[cursorIndex][0].cH + 120 + 'px'
    } else {
      document.getElementById('cursorOnSVGScore').style.left =
        cursorLeft * OsmdSize() + (fluidIndex * 30) / 30 + 'px'
    }
    if (fluidIndex === 15) {
      document.getElementById('cursorOnSVGScore').style.backgroundColor = 'blue'
    }
  }

  function OsmdSize () {
    let settings = JSON.parse(localStorage.getItem('settings'))
    return settings['osmdSize']
  }
  // move cursor on letterSheet
  const element = document.getElementById('translateNotesWindow')

  function getTranslatedNotesSize () {
    let settings = JSON.parse(localStorage.getItem('settings'))
    return settings['osmdSize']
  }

  function ResetCursor () {
    stop()
  }

  window.ResetCursor = ResetCursor

  function CheckForGrace (measureSelectedNotes2) {
    // osmd.cursor.NotesUnderCursor()[2].parentStaffEntry.voiceEntries[0].graceNoteSlash WILL NEED TO DIFERENTIATE BETWEEN GRACE AND GRACE WITH SLASH (Appoggiatura and Acciaccatura)

    let graceNotes = []
    if (measureSelectedNotes2.length - 1 > index) {
      for (let i = 0; i < measureSelectedNotes2[index + 1].length; i++) {
        if (measureSelectedNotes2[index + 1][i].iG === true) {
          graceNotes.push({
            n: measureSelectedNotes2[index + 1][i].n,
            l: measureSelectedNotes2[index + 1][i].l,
            nPx: measureSelectedNotes2[index + 1][i].nPx,
            m: measureSelectedNotes2[index + 1][i].nM,
            v:
              measureSelectedNotes2[index + 1][i].v === 'NaN'
                ? correctVolume
                : measureSelectedNotes2[index + 1][i].v === undefined
                ? correctVolume
                : measureSelectedNotes2[index + 1][i].v
          })
        }
      }
    }
    let graceIndex = 0
    // order grace notes by their position on musicSheet
    graceNotes.sort(function (a, b) {
      return a.nPx - b.nPx
    })
    if (graceNotes.length > 0) {
      setTimeout(
        () => PlayGrace(),
        measureSelectedNotes2[index + 1][0].rT / (graceNotes.length + 2)
        //  -
        // measureSelectedNotes2[index][0].rT) /
        // 1000) /
        // (cursorData.bpm / 60)
      )
    }
    function PlayGrace () {
      if (graceIndex < graceNotes.length) {
        NotesToPlay(
          graceNotes[graceIndex].n,
          graceNotes[graceIndex].l * 4 * 1000,
          graceNotes[graceIndex].v - 0.1
        )
        graceIndex++
        setTimeout(
          () => PlayGrace(),
          measureSelectedNotes2[index + 1][0].rT / (graceNotes.length + 2)
        )
        // -
        // measureSelectedNotes2[index][0].rT) /
        // 1000) /
        // (cursorData.bpm / 60)
      }
    }
  }

  function GetTempo () {
    let settings =
      JSON.parse(localStorage.getItem('settings')) === null
        ? {}
        : JSON.parse(localStorage.getItem('settings'))
    return settings['tempo']
  }
  function PlayFunc (measureSelectedNotes2) {
    index++

    if (measureSelectedNotes2.length - 1 > index && stopPlay === false) {
      if (
        measureSelectedNotes2[index + 1][0].rT < 0 ||
        measureSelectedNotes2[index + 1][0].nM -
          measureSelectedNotes2[index][0].nM >
          1
        // measureSelectedNotes2[index][0].rT <
        // 1000
        // 0
      ) {
        setTimeout(() => PlayFunc(measureSelectedNotes2), prevBeat)
      } else {
        setTimeout(
          () => PlayFunc(measureSelectedNotes2),
          (measureSelectedNotes2[cursorIndex + 1][0].rT -
            measureSelectedNotes2[cursorIndex][0].rT) /
            (GetTempo() / 100)
        )
      }

      prevBeat =
        (measureSelectedNotes2[cursorIndex + 1][0].rT -
          measureSelectedNotes2[cursorIndex][0].rT) /
        (GetTempo() / 100)
    }

    // let cursorDuration =
    //   measureSelectedNotes2[index + 1][0].rT -
    //   measureSelectedNotes2[index][0].rT;
    if (stopPlay === true) {
      return
    }
    setCurentCursorNotes(measureSelectedNotes2[cursorIndex])
    MoveCursors(measureSelectedNotes2)

    CheckForGrace(measureSelectedNotes2)

    for (let i = 0; i < measureSelectedNotes2[index].length; i++) {
      if (measureSelectedNotes2[index][i].i2ndTie === false) {
        if (measureSelectedNotes2[index][i].iG === false) {
          if (
            measureSelectedNotes2[index][i].v === 'NaN' ||
            measureSelectedNotes2[index][i].v === undefined
          ) {
            NotesToPlay(
              measureSelectedNotes2[index][i].n,
              measureSelectedNotes2[index][i].l * 4 * 1000,
              correctVolume
            )
          } else {
            NotesToPlay(
              measureSelectedNotes2[index][i].n,
              measureSelectedNotes2[index][i].l * 4 * 1000,
              measureSelectedNotes2[index][i].v
            )
            correctVolume = measureSelectedNotes2[index][i].v
          }
        }
      }
    }

    if (measureSelectedNotes2.length - 1 === index) {
      stopPlay = true
      setPlayPauseIcon(true)
      index = -1
    }
  }

  //custom play function

  return (
    <div>
      <MetronomeComp />
      <button
        id='playButton'
        className='playButton'
        component='span'
        onClick={StartCountdown}
        // onClick={StartPlay}
      >
        <div style={{ color: 'whiteSmoke' }}>
          {/* {playPauseIcon ? <PlayArrow /> : <Pause />} mIcon */}
          {/* {playPauseIcon ? 'Play' : 'Pause'} */}
          <div
            className={playPauseIcon ? 'playIcon' : 'pauseIcon'}
            style={{ color: 'white !important', fontSize: '145px' }}
          ></div>
        </div>
      </button>
      <button
        id='stopButton'
        className='stopButton'
        component='span'
        onClick={stop}
      >
        <div
          className='stopIcon'
          style={{ color: 'white !important', fontSize: '145px' }}
        ></div>
      </button>

      <div
        style={{
          display: 'none',
          position: 'fixed',
          left: '40%',
          top: '30%',
          width: '20%',
          height: '40%',
          border: '5px solid Blue',
          backgroundColor: 'rgba(255, 255, 255, 0.7',
          zIndex: 10
        }}
        id='countdownWindow'
        className='countdownWindow'
      >
        <p
          id='countdownNumber'
          style={{
            fontSize: '60px',
            textAlign: 'center',
            color: 'blue'
            // top: '-100px',
            // flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
          }}
        >
          3
        </p>
      </div>
    </div>
  )
}

// document.getElementById('scrollKeyboardButton').style.display = 'none';
// document.getElementById('feedbackButton').style.display = 'none';
// document.getElementById('pianoWindowButton').style.display = 'none';
// document.getElementById('settingsButton').style.display = 'none';
// document.getElementById('contentButton').style.display = 'none';
// document.getElementById('translateNotesButton').style.display = 'none';
// document.getElementById('deleteButton').style.display = 'none';
// document.getElementById('playButton').style.display = 'none';
// document.getElementById('stopButton').style.display = 'none';

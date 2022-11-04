import { React, useState, useRef } from 'react'
// import swal from 'sweetalert'

// import React, { Component } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faTwitter,
//   faLinkedin,
//   faDiscord,
//   faYoutube
// } from '@fortawesome/fontawesome-free-brands'

import Dropdown from './Dropdown'
// import { Settings } from '@material-ui/icons'
import { IonButton } from '@ionic/react'

export default function SettingsMenu ({
  darkMode,
  setDarkMode,
  buttonsFlashPerf,
  setButtonsFlashPerf
}) {
  /* Open when someone clicks on the span element */
  window.SettingsButton = SettingsButton
  function SettingsButton () {
    if (document.getElementById('myNav').style.width === '60%') {
      document.getElementById('myNav').style.width = '0'
    } else {
      document.getElementById('myNav2').style.width = '0%'
      document.getElementById('myNav').style.width =
        '60%' /** from 100% to 25% **/
    }
  }

  function clearCurresntDeck () {
    let settings = JSON.parse(localStorage.getItem('settings'))
    localStorage.removeItem(window.selectedDeck + settings['mesaureDistance'])

    // window.FilterNotesPianoC();
    // window.StartExercise();
    setTimeout(() => window.StartExercise(), 1000)
    setTimeout(() => window.FilterNotesPianoC(), 2000)
    setTimeout(() => window.OsmdOverlays(), 3000)
  }

  function clearLocalStorage () {
    localStorage.clear()
    window.checkIfFirstStart()
    setTimeout(() => window.StartExercise(), 500)
    setTimeout(() => window.FilterNotesPianoC(), 700)
    setTimeout(() => window.OsmdOverlays(), 800)
  }

  const [noteColorOnOff, setnoteColorOnOff] = useState(getNoteColor())

  const NoteColor2 = () => {
    let settings = JSON.parse(localStorage.getItem('settings'))
    if (settings['noteColor'] === 1 || settings['noteColor'] === null) {
      settings['noteColor'] = 0
      localStorage.setItem('settings', JSON.stringify(settings))
      window.osmd.setOptions({ coloringMode: 0 })
      setnoteColorOnOff(0)
    } else {
      settings['noteColor'] = 1
      localStorage.setItem('settings', JSON.stringify(settings))
      window.osmd.setOptions({ coloringMode: 1 })
      setnoteColorOnOff(1)
    }
    // window.osmd.updateGraphic()
    window.osmd.render()
    // window.AddPaddingToCurrsor();
    setTimeout(
      () =>
        (document.getElementsByClassName('loadingWindow2')[0].style.display =
          'none'),
      50
    )
  }

  var noteColorText = {
    1: 'On',
    0: 'Off'
  }

  var noteLabelsText = {
    true: 'On',
    false: 'Off'
  }

  function DarkMode () {
    let settings = JSON.parse(localStorage.getItem('settings'))
    if (settings['darkMode'] !== 'On') {
      settings['darkMode'] = 'On'
      localStorage.setItem('settings', JSON.stringify(settings))
      setDarkMode('On')
      window.osmd.setOptions({ defaultColorMusic: 'WhiteSmoke' })
      for (var i = 0; i < window.allNotes.length; i++) {
        window.allNotes[i].noteObject.NoteheadColor = 'WhiteSmoke'
      }
    } else {
      settings['darkMode'] = 'Off'
      localStorage.setItem('settings', JSON.stringify(settings))
      setDarkMode('Off')
      window.osmd.setOptions({ defaultColorMusic: 'black' })
      for (var i = 0; i < window.allNotes.length; i++) {
        window.allNotes[i].noteObject.NoteheadColor = 'black'
      }
    }

    setTimeout(
      () =>
        document.documentElement.style.setProperty(
          'background',
          settings['darkMode'] === 'Off'
            ? 'rgb(244, 244, 244)'
            : 'rgb(30, 30, 30)'
        ),
      50
    )
    window.osmd.render()
    // window.AddPaddingToCurrsor();
    setTimeout(
      () =>
        (document.getElementsByClassName('loadingWindow2')[0].style.display =
          'none'),
      50
    )
    // window.DarkModeForElise();
  }

  const OsmdSize = useRef([
    '0.4',
    '0.5',
    '0.6',
    '0.7',
    '0.8',
    '0.9',
    '1.0',
    '1.1',
    '1.2',
    '1.3',
    '1.4',
    '1.5',
    '1.6',
    '1.7',
    '1.8',
    '1.9',
    '2.0'
    // "2.1",
    // "2.2",
    // "2.3",
    // "2.4",
    // "2.5",
    // "2.6",
    // "2.7",
    // "2.8",
    // "2.9",
    // "3.0",
  ])

  const handleOSMDSizeOnChange = (element, index, oldValue, newValue) => {
    let settings = JSON.parse(localStorage.getItem('settings'))
    settings['osmdSize'] = newValue
    localStorage.setItem('settings', JSON.stringify(settings))
    window.getOSMDSizeScale()
    if (
      document.getElementById('translateNotesWindow').style.display === 'block'
    ) {
      document.getElementById('translateNotesWindow').style.display = 'none'
      window.OpenTranslateNotes()
    }
    // window.AddPaddingToCurrsor();
    window.OsmdOverlays()
    window.ScaleLSD()
    // window.SetLSDPosition();
  }

  const firstKey = useRef([
    'c0',
    'd0',
    'e0',
    'f0',
    'g0',
    'a0',
    'b0',
    'c1',
    'd1',
    'e1',
    'f1',
    'g1',
    'a1',
    'b1',
    'c2',
    'd2',
    'e2',
    'f2'
  ])

  const handlePianoKeyFirst = (element, index, oldValue, newValue) => {
    let settings = JSON.parse(localStorage.getItem('settings'))
    settings['pianoKeyFirst'] = newValue
    localStorage.setItem('settings', JSON.stringify(settings))
    window.PianoKeyFirst(newValue)
  }

  function getFirstKey () {
    let settings = JSON.parse(localStorage.getItem('settings'))
    let firstKey = !settings['pianoKeyFirst'] ? 'f1' : settings['pianoKeyFirst']
    return firstKey
  }

  const lastKey = useRef([
    'b5',
    'c6',
    'd6',
    'e6',
    'f6',
    'g6',
    'a6',
    'b6',
    'c7',
    'd7',
    'e7',
    'f7',
    'g7',
    'a7',
    'b7',
    'c8',
    'd8',
    'e8',
    'f8',
    'g8',
    'a8'
  ])

  const handlePianoKeyLast = (element, index, oldValue, newValue) => {
    let settings = JSON.parse(localStorage.getItem('settings'))
    settings['pianoKeyLast'] = newValue
    localStorage.setItem('settings', JSON.stringify(settings))
    window.PianoKeyLast(newValue)
  }

  function getLastKey () {
    let settings = JSON.parse(localStorage.getItem('settings'))
    let lastKey = !settings['pianoKeyLast'] ? 'e7' : settings['pianoKeyLast']
    return lastKey
  }

  // const [noteLabelsOnOff, setNoteLabelsOnOff] = useState(true);
  function RenderNotes () {
    let settings = JSON.parse(localStorage.getItem('settings'))
    // if (!settings["noteLabelsOnOff"]) {
    if (settings['noteLabelsOnOff'] === true) {
      window.RenderNotesF()
      // setNoteLabelsOnOff(false);
      settings['noteLabelsOnOff'] = false
    } else {
      window.RenderNotesF()
      // setNoteLabelsOnOff(true);
      settings['noteLabelsOnOff'] = true
    }
    localStorage.setItem('settings', JSON.stringify(settings))
    window.location.reload()
    // }
  }

  function getOsmdSize () {
    let settings = JSON.parse(localStorage.getItem('settings'))
    return settings['osmdSize']
  }

  function getNoteColor () {
    let settings = JSON.parse(localStorage.getItem('settings'))
    return settings['noteColor']
  }

  function getNoteLabelsOnOff () {
    let settings = JSON.parse(localStorage.getItem('settings'))
    return settings['noteLabelsOnOff']
  }

  function getDarkMode () {
    let settings = JSON.parse(localStorage.getItem('settings'))
    return settings['darkMode']
  }

  function InfoColorWindow () {
    if (
      document.getElementById('infoColorWindow').style.height === '0%' ||
      document.getElementById('infoColorWindow').style.height === ''
    ) {
      document.getElementById('infoColorWindow').style.height = '60%' // document.getElementById("infoWindow").style.width = "40%";
    } else {
      document.getElementById('infoColorWindow').style.height = '0%'
    }
  }

  function youtubeIntroduction () {
    window.open('https://www.youtube.com/watch?v=NCQ7b8d1CTM')
  }

  function discordServer () {
    window.open('https://discord.gg/WMyqzf98bA')
  }

  {
    /* <tr style={{ display: "flex", marginLeft: '15px', marginTop: '30px' }}>
<td><button style={{ display: "flex", marginLeft: '15px', marginTop: '30px', fontColor: 'white' }} href={"https://discord.gg/WMyqzf98bA"}>Click here to go Piano App Discord server</button></td>
</tr> */
  }

  function FlashPerfMode () {
    if (buttonsFlashPerf === false) {
      setButtonsFlashPerf(true)
    } else {
      setButtonsFlashPerf(false)
    }
  }

  return (
    <div>
      <div id='infoColorWindow' className='infoColorWindow'>
        <p
          style={{
            position: 'flexible',
            margin: '30px',
            fontSize: '16px'
          }}
        >
          Color set from MuseScore Color notehead plugin version 1.1 by Werner
          Schweer and others
        </p>
        <p
          style={{
            position: 'flexible',
            margin: '30px',
            fontSize: '16px'
          }}
        >
          Note C original color{' '}
          <span style={{ color: '#eeee00' }}>#eeee00</span> was replaced with{' '}
          <span style={{ color: '#BABD00' }}>#BABD00</span> for beter visibility
          on white background
        </p>
        <button
          style={{
            position: 'absolute',
            right: '30px',
            bottom: '30px'
          }}
          className='menuButton'
          onClick={() => {
            InfoColorWindow()
          }}
        >
          Close
        </button>
      </div>
      {/* <div
        className="page"
        style={{
          fontSize: '10px',
          position: 'absolute',
          top: '43.5vh',
          left: '0px',
          margin: '0px',
          marginLeft: '0',
          // writingMode: 'vertical-lr',
          textOrientation: 'upright',
          // backgroundColor: darkMode === 'On' ? 'rgb(30, 30, 30)' : 'rgb(244, 244, 244)'
        }}
      >
        {getNoteColor() === undefined || getNoteColor() === 1 ? (
          <p>
            <span style={{ color: '#BABD00', marginLeft: '5px' }}>C</span>
            <span style={{ color: '#9b30ff' }}>D</span>
            <span style={{ color: '#ee9a00' }}>E</span>
            <span style={{ color: '#8b4513' }}>F</span>
            <span style={{ color: '#ff0000' }}>G</span>
            <span style={{ color: '#1e90ff' }}>A</span>
            <span style={{ color: '#00ff00' }}>B</span>
            <span
              style={{ color: 'grey', marginLeft: '0px', fontWeight: 'bold' }}
              // onClick={() => InfoWindow()}>?
            ></span>
          </p>
        ) : null}
      </div> */}

      <button
        style={{ bottom: buttonsFlashPerf === false ? '15px' : 'null' }}
        component='span'
        id='settingsButton'
        className='settingsButton'
        onClick={SettingsButton}
      >
        <div
          className='settingsIcon'
          style={{ color: 'white', fontSize: '45px' }}
        ></div>
      </button>

      <div id='myNav' className='contentSettingsWindow'>
        <i class='fa-brands fa-discord'></i>

        <button
          style={{ marginTop: '30px' }}
          className='menuButton'
          onClick={() => {
            youtubeIntroduction()
          }}
        >
          {/* <FontAwesomeIcon icon={faYoutube} /> mIcon */}
          Youtube Introduction and Guide video{' '}
        </button>

        <button
          className='menuButton'
          onClick={() => {
            discordServer()
          }}
        >
          {/* <FontAwesomeIcon icon={faDiscord} /> mIcon */}
          Piano Flashcards Discord Server{' '}
        </button>

        <button
          className='menuButton'
          onClick={() => {
            window.openAbout()
          }}
        >
          About
        </button>

        <div style={{ display: 'flex', marginLeft: '5px' }}>
          <div style={{ marginLeft: '10px' }}>
            <Dropdown
              options={{
                value: getOsmdSize(),
                onchange: handleOSMDSizeOnChange,
                data: OsmdSize.current,
                newOptions: false,
                width: '80px'
              }}
            />
          </div>
          <h3
            style={{
              fontSize: '12px',
              color: 'rgb(186, 186, 186)',
              marginLeft: '5px'
            }}
          >
            X1
          </h3>
          <h3
            style={{
              fontSize: '12px',
              color: 'rgb(186, 186, 186)',
              marginLeft: '20px'
            }}
          >
            Music Sheets Size
          </h3>
        </div>

        <div style={{ display: 'flex', marginLeft: '5px' }}>
          <div style={{ marginLeft: '10px' }}>
            <Dropdown
              options={{
                value: getFirstKey(),
                onchange: handlePianoKeyFirst,
                data: firstKey.current,
                newOptions: false,
                width: '80px'
              }}
            />
          </div>
          <h3
            style={{
              fontSize: '12px',
              color: 'rgb(186, 186, 186)',
              marginLeft: '5px'
            }}
          >
            First Key
          </h3>

          <div style={{ marginLeft: '10px' }}>
            <Dropdown
              options={{
                value: getLastKey(),
                onchange: handlePianoKeyLast,
                data: lastKey.current,
                newOptions: false,
                width: '80px'
              }}
            />
          </div>
          <h3
            style={{
              fontSize: '12px',
              color: 'rgb(186, 186, 186)',
              marginLeft: '5px'
            }}
          >
            Last Key
          </h3>
        </div>
        <p
          style={{
            fontSize: '12px',
            // color: 'rgb(186, 186, 186)',
            marginLeft: '10px'
          }}
        >
          48 keys: First key f2, last key e7, 72 keys: First key f1, last key
          e7, 88 keys, First key a0, last key c8,
        </p>

        <div style={{ display: 'flex' }}>
          <button
            className='menuButton'
            onClick={() => {
              // document.getElementsByClassName(
              //   'loadingWindow2'
              // )[0].style.display = 'block';
              setTimeout(() => DarkMode(), 10)
            }}
          >
            Dark Mode:{' '}
          </button>
          <p style={{ marginTop: '18px' }}>{getDarkMode()}</p>
        </div>
        <div style={{ display: 'flex' }}>
          <button
            className='menuButton'
            onClick={() => {
              // document.getElementsByClassName(
              //   'loadingWindow2'
              // )[0].style.display = 'block';
              FlashPerfMode()
            }}
          >
            Learning Mode
          </button>
          {/* <p style={{ marginTop: '18px' }}>{getDarkMode()}</p> */}
        </div>
        <div style={{ display: 'flex' }}>
          <button
            className='menuButton'
            onClick={() => {
              document.getElementsByClassName(
                'loadingWindow2'
              )[0].style.display = 'block'
              setTimeout(() => NoteColor2(), 10)
            }}
          >
            Note Coloring:
          </button>
          <p style={{ marginTop: '18px' }}>{noteColorText[noteColorOnOff]}</p>
          {getNoteColor() === undefined || getNoteColor() === 1 ? (
            <p>
              <span style={{ color: '#BABD00', marginLeft: '15px' }}>C</span>
              <span style={{ color: '#9b30ff' }}>D</span>
              <span style={{ color: '#ee9a00' }}>E</span>
              <span style={{ color: '#8b4513' }}>F</span>
              <span style={{ color: '#ff0000' }}>G</span>
              <span style={{ color: '#1e90ff' }}>A</span>
              <span style={{ color: '#00ff00' }}>B</span>
              <span
                className='dot'
                style={{ marginLeft: '15px' }}
                onClick={() => InfoColorWindow()}
              ></span>
            </p>
          ) : null}
        </div>
        <div style={{ display: 'flex' }}>
          <button
            className='menuButton'
            onClick={() => {
              RenderNotes()
            }}
          >
            Note Labels:{' '}
          </button>
          <p style={{ marginTop: '18px' }}>
            {getNoteLabelsOnOff() === undefined
              ? 'On'
              : noteLabelsText[getNoteLabelsOnOff()]}
          </p>
        </div>
        <button
          className='menuButton'
          onClick={() => {
            // swal({
            //   title: 'Are you sure?',
            //   text:
            //     'Once deleted, you will not be able to recover your progress in current deck measure selection!',
            //   icon: 'warning',
            //   buttons: true,
            //   dangerMode: true
            // }).then(willDelete => {
            //   if (willDelete) {
            //     clearCurresntDeck()
            //     swal('Poof! Your progress has been deleted!', {
            //       icon: 'success'
            //     })
            //   } else {
            //     swal('Your progress is safe!')
            //   }
            // })
          }}
        >
          Reset Current Deck Measure Selection
        </button>
        <button
          className='menuButton'
          onClick={() => {
            // swal({
            //   title: 'Are you sure?',
            //   text:
            //     'Once deleted, you will not be able to recover your overall Progress and Settings!',
            //   icon: 'warning',
            //   buttons: true,
            //   dangerMode: true
            // }).then(willDelete => {
            //   if (willDelete) {
            //     clearLocalStorage()
            //     swal('Poof! Your Progress and Settings have been deleted!', {
            //       icon: 'success'
            //     })
            //   } else {
            //     swal('Your progress is safe!')
            //   }
            // })
          }}
        >
          Clear Local Storage
        </button>
      </div>
    </div>
  )
}

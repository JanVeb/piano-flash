import '../App.css'
import '../components/webmidi/WebMidi.css'
// import "../components/stopwatchForTest/styles.css";
import React, { useState, useEffect, useRef } from 'react'
// import ReactDOM from "react-dom";
// import { ReactComponent as YourSvg } from './noteCheck3.svg';

import { IonButton } from '@ionic/react'

import PianoKeyboard from '../components/PianoKeyboard'

import ScoreDisplayAndPlayer from '../components/ScoreDisplayAndPlayer'

import SettingsMenu from '../components/SettingsMenu'
import ContentMenu from '../components/ContentMenu'
// import AdditionalButtons from "../view/AdditionalButtonsWindow";

// import { CompareArrows, Info } from '@material-ui/icons';

import LoadingWindow from '../view/LoadingWindow'

// import UserInputWindow from "../components/UserInputWindow";
import FeedbackWindow from '../components/FeedbackWindow'

import TranslateNotes from '../view/LettersSheet'
import UserInputWindowF from '../view/UserInputWindow'
import AboutPage from './About'
import { WebMidiCont } from '../components/webmidi/MidiComponent'

// import MidiController from '../components/webmidi/WebMidi'
// import { WebMidi } from 'webmidi';
// import TestNote from '../components/testNote'

// import LogueSf2 from '../components/LogueSf2';

import DrawSVGScore from '../view/DrawSVGScore'

// pinch zoom
const pinchZoom = imageElement => {
  let imageElementScale = 1

  let start = {}

  // Calculate distance between two fingers
  const distance = event => {
    return Math.hypot(
      event.touches[0].pageX - event.touches[1].pageX,
      event.touches[0].pageY - event.touches[1].pageY
    )
  }

  imageElement.addEventListener('touchstart', event => {
    // console.log('touchstart', event);
    if (event.touches.length === 2) {
      event.preventDefault() // Prevent page scroll

      // Calculate where the fingers have started on the X and Y axis
      start.x = (event.touches[0].pageX + event.touches[1].pageX) / 2
      start.y = (event.touches[0].pageY + event.touches[1].pageY) / 2
      start.distance = distance(event)
    }
  })

  imageElement.addEventListener('touchmove', event => {
    // console.log('touchmove', event);
    if (event.touches.length === 2) {
      event.preventDefault() // Prevent page scroll

      // Safari provides event.scale as two fingers move on the screen
      // For other browsers just calculate the scale manually
      let scale
      if (event.scale) {
        scale = event.scale
      } else {
        const deltaDistance = distance(event)
        scale = deltaDistance / start.distance
      }
      imageElementScale = Math.min(Math.max(1, scale), 4)

      // Calculate how much the fingers have moved on the X and Y axis
      const deltaX =
        ((event.touches[0].pageX + event.touches[1].pageX) / 2 - start.x) * 2 // x2 for accelarated movement
      const deltaY =
        ((event.touches[0].pageY + event.touches[1].pageY) / 2 - start.y) * 2 // x2 for accelarated movement

      // Transform the image to make it grow and move with fingers
      const transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${imageElementScale})`
      imageElement.style.transform = transform
      imageElement.style.WebkitTransform = transform
      imageElement.style.zIndex = '9999'
    }
  })

  imageElement.addEventListener('touchend', event => {
    // console.log('touchend', event);
    // Reset image to it's original format
    imageElement.style.transform = ''
    imageElement.style.WebkitTransform = ''
    imageElement.style.zIndex = ''
  })
}

document.querySelectorAll('translateNotesWindow').forEach(element => {
  pinchZoom(element)
})

// pinch zoom

export default function Main ({ darkMode, setDarkMode }) {
  function getNoteColor () {
    let settings =
      JSON.parse(localStorage.getItem('settings')) === null
        ? {}
        : JSON.parse(localStorage.getItem('settings'))
    return settings['noteColor']
  }

  function getDarkMode () {
    let settings =
      JSON.parse(localStorage.getItem('settings')) === null
        ? {}
        : JSON.parse(localStorage.getItem('settings'))
    return settings['darkMode']
  }

  const OSMDoptions = {
    drawComposer: false,
    drawCredits: false,
    drawTitle: false,
    drawSubtitle: false,
    drawLyricist: false,
    drawFingerings: true,
    coloringEnabled: true,
    coloringMode:
      getNoteColor() === NaN || getNoteColor() === undefined
        ? 1
        : getNoteColor(),
    renderSingleHorizontalStaffline: false,
    autoResize: true,
    followCursor: true,
    disableCursor: false,

    // drawingParameters: 'compacttight',
    drawMetronomeMarks: true,
    drawMeasureNumbersOnlyAtSystemStart: true,
    // measureNumberInterval: 1,
    // drawPartAbbreviations: true,
    // drawMeasureNumbers: true,
    defaultColorRest: 'white',
    defaultColorMusic:
      getDarkMode() === undefined || getDarkMode() === 'Off'
        ? 'black'
        : 'WhiteSmoke',
    backend: 'svg'
  }

  const [OSMD_option, setOSMD_option] = useState(OSMDoptions)
  const [scoreMetaData, setScoreMetaData] = useState({
    deck_name: 'yellow'
  })

  const [state, setState] = useState({ myThing: 1 })

  useEffect(() => {
    if (state['myThing']) {
      setState({ myNewThing: state['myThing'] + 1 })
    }
  }, [state])
  window.OSMD_option = OSMD_option
  window.scoreMetaData = scoreMetaData

  const [scoreHeight, setScoreHeight] = useState('50vh')
  function PianoWindow () {
    if (document.getElementById('pianoWindow').style.height === '44vh') {
      document.getElementById('scrollKeyboardButton').style.visibility =
        'visible'
      document.getElementById('pianoWindow').style.height = '22vh'
      document.getElementById('scrollText').style.height = '28vh'
      // setScoreHeight('74vh')

      // document.getElementById('score').style.height = '74vh'
      document.getElementById('translateNotesWindow').style.height = '74vh'
    } else {
      if (document.getElementById('pianoWindow').style.height === '22vh') {
        document.getElementById('scrollKeyboardButton').style.visibility =
          'hidden'
        document.getElementById('pianoWindow').style.height =
          '0' /** from 100% to 25% **/
        document.getElementById('scrollText').style.height = '0'
        // setScoreHeight('100vh')
        // document.getElementById('score').style.height = '100vh'
        document.getElementById('translateNotesWindow').style.height = '100vh'
        // }
      } else {
        document.getElementById('scrollKeyboardButton').style.visibility =
          'hidden'
        document.getElementById('pianoWindow').style.height =
          '44vh' /** from 100% to 25% **/
        document.getElementById('scrollText').style.height = '50vh'
        // setScoreHeight('50vh')
        // document.getElementById('score').style.height = '50vh'
        document.getElementById('translateNotesWindow').style.height = '50vh'
        // }
      }
    }
  }

  window.PianoWindow = PianoWindow

  //scroll button for piano keyboard
  let keyboardPosition = 0
  const scrollToTop = () => {
    if (keyboardPosition === 0) {
      keyboardPosition++
      document.getElementById('pianoWindow').scrollTo(0, 300)
    } else {
      keyboardPosition--
      document.getElementById('pianoWindow').scrollTo(0, 0)
    }
  }

  function checkIfFirstStart () {
    let settings =
      JSON.parse(localStorage.getItem('settings')) === null
        ? {}
        : JSON.parse(localStorage.getItem('settings'))
    if (settings['firstStart'] === undefined) {
      settings['firstStart'] = false
      settings['noteLabelsOnOff'] = true
      settings['mesaureDistance'] = '2'
      settings['measureStart'] = '1'
      settings['measureEnd'] = '2'
      settings['darkMode'] = 'Off'
      settings['noteColor'] = 1
      settings['osmdSize'] = '1.0'

      localStorage.setItem('settings', JSON.stringify(settings))
      setTimeout(
        () =>
          console.log(
            '🚀 ~ file: main.js ~ line 113 ~ checkIfFirstStart ~ (settings[firstStart]',
            settings['firstStart']
          ),
        3000
      )
    } else {
    }
  }

  // first start of the app check
  checkIfFirstStart()
  window.checkIfFirstStart = checkIfFirstStart

  let settings = JSON.parse(localStorage.getItem('settings'))
  const [measureStart, setMeasureStart] = useState(settings['measureStart'])
  const [measureEnd, setMeasureEnd] = useState(settings['measureEnd'])

  function redrawTranslatedNotes () {
    setTimeout(
      () =>
        (document.getElementById('translateNotesWindow').style.display =
          'block'),
      1000
    )
  }

  window.redrawTranslatedNotes = redrawTranslatedNotes

  function OpenTranslateNoteInfoWindow () {
    if (
      document.getElementsByClassName('infoTranslateNoteWindow')[0].style
        .height === '0%' ||
      document.getElementsByClassName('infoTranslateNoteWindow')[0].style
        .height === ''
    ) {
      document.getElementsByClassName(
        'infoTranslateNoteWindow'
      )[0].style.height = '60%' // document.getElementById("infoWindow").style.width = "40%";
    } else {
      document.getElementsByClassName(
        'infoTranslateNoteWindow'
      )[0].style.height = '0%'
    }
  }
  const [buttonsFlashPerf, setButtonsFlashPerf] = useState(0)

  function LiveFeedbackHideShow () {
    if (document.getElementById('liveFeedbackNotes').style.display === 'none') {
      document.getElementById('liveFeedbackNotes').style.display = 'block'
    } else {
      document.getElementById('liveFeedbackNotes').style.display = 'none'
    }
  }
  const [liveFeedback, setLiveFeedback] = useState([])
  function ClearLiveFeedback () {
    setLiveFeedback([])
  }
  window.onload = function () {
    var v = 'url = http://hyperaud.io/video/obama-responds.mp4'
    var p = document.getElementById('pbr')
    var c = document.getElementById('currentPbr')

    p.addEventListener(
      'input',
      function () {
        c.innerHTML = p.value
        v.playbackRate = p.value
      },
      false
    )
  }

  return (
    <div>
      {/* <DrawSVGScore /> */}
      {/* <LogueSf2 /> */}
      <WebMidiCont />
      <div id='infoTranslateNoteWindow' className='infoTranslateNoteWindow'>
        <p
          style={{
            position: 'flexible',
            margin: '30px',
            fontSize: '16px'
          }}
        >
          Letters Sheet is only meant as initial assitance, to make it easier to
          start playing music. As such, it is only available first time when
          playing selected measures of Music Score, or in case when your input
          was rated incorect, after presing the Feedback Button:
        </p>
        <div
          style={{
            position: 'flexible',
            marginLeft: '30px',
            marginTop: '-30px',
            display: 'flex'
          }}
        >
          <button style={{ width: '50px', height: '40px' }}>
            <div
              className='noteCheck2'
              style={{ color: 'white', fontSize: '40px' }}
            ></div>
          </button>
        </div>
        <button
          style={{
            position: 'absolute',
            right: '30px',
            bottom: '30px'
          }}
          className='menuButton'
          onClick={() => {
            OpenTranslateNoteInfoWindow()
          }}
        >
          Close
        </button>
        <button
          component='span'
          className='hideLiveFeedbackButton'
          id='LiveFeedbackHideShow'
          onClick={LiveFeedbackHideShow}
        >
          HLF
          {/* <div
            className='listIcon'
            style={{ color: 'white', fontSize: '45px' }}
          ></div> */}
        </button>
        <button
          component='span'
          className='clearLiveFeedback'
          id='clearLiveFeedback'
          onClick={ClearLiveFeedback}
        >
          CLF
          {/* <div
            className='listIcon'
            style={{ color: 'white', fontSize: '45px' }}
          ></div> */}
        </button>
      </div>
      <AboutPage />
      <UserInputWindowF />
      <LoadingWindow />
      <FeedbackWindow
        setMeasureStart={setMeasureStart}
        setMeasureEnd={setMeasureEnd}
        ScoreMetaData={scoreMetaData}
      />
      <div
        id='pianoWindow'
        className='pianoWindow'
        style={{ opacity: darkMode === 'On' ? '0.6' : '1', zIndex: 10 }}
      >
        <PianoKeyboard />
      </div>

      <div className='page' style={{ display: 'flex', height: scoreHeight }}>
        <button
          id='scrollKeyboardButton'
          className='scrollKeyboardButton'
          component='span'
          onClick={scrollToTop}
        >
          <div
            className='compareArrows'
            style={{ color: 'white', fontSize: '45px' }}
          ></div>
          {/* <CompareArrows style={{ transform: 'rotate(90deg)' }} /> mIcon */}
        </button>
        {/* <div className="rectangle"> */}
        <ScoreDisplayAndPlayer
          OSMDoptions={OSMD_option}
          ScoreMetaData={scoreMetaData}
          setMeasureStart={setMeasureStart}
          setMeasureEnd={setMeasureEnd}
          measureStart={measureStart}
          measureEnd={measureEnd}
          liveFeedback={liveFeedback}
          setLiveFeedback={setLiveFeedback}
        />
        {/* </div> */}
      </div>
      <div>
        <button id='translateNotesButton' onClick={window.OpenTranslateNotes}>
          {/* <p style={{fontSize: '20px'}}>♪</p><p>/C4</p> */}
          <div
            className='noteLeter'
            style={{ color: 'white', fontSize: '45px' }}
          ></div>
        </button>
        <button
          // style={{ display: deviceName !== '' ? 'block' : 'none' }}
          component='span'
          className='midiButton'
          id='midiButton'
          onClick={window.OpenMidiWin}
        >
          <p>Midi</p>
          {/* <Keyboard /> */}
          {/* <FontAwesomeIcon icon={faPiano} /> */}
          {/* <i class="fa-solid fa-piano"></i> */}
        </button>
        {/* <button
        id="infoTranslateNoteButton"
          className="infoTranslateNoteButton"
          onClick={OpenTranslateNoteInfoWindow}
        >
          <Info />
        </button> */}
        <SettingsMenu
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          buttonsFlashPerf={buttonsFlashPerf}
          setButtonsFlashPerf={setButtonsFlashPerf}
        />
        <ContentMenu
          setScoreMetaData={setScoreMetaData}
          scoreMetaData={scoreMetaData}
        />
      </div>
      <TranslateNotes />
      {/* <MidiController /> */}
    </div>
  )
}

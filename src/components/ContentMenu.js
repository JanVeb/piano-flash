import '../App.css'
import React, { useRef, useState } from 'react'
import Dropdown from './Dropdown'

import { AllDecksDict } from '../data/all_score_files'
// import { Settings, List, Keyboard, Backspace } from '@material-ui/icons';
import { IonButton } from '@ionic/react'
import { BackTrackVol } from '../components/howlerFVPiano/HowlerFVPiano'

// import UploadScore from "./UploadScore";
//window.deck = AllDecks;

export default function ContentMenu ({ setScoreMetaData, scoreMetaData }) {
  function openNav2 () {
    if (document.getElementById('myNav2').style.width === '60%') {
      document.getElementById('myNav2').style.width = '0'
    } else {
      document.getElementById('myNav').style.width = '0%'
      document.getElementById('myNav2').style.width =
        '60%' /** from 100% to 25% **/
    }
  }
  window.openNav2 = openNav2

  const numberOfMeasures = useRef(['1', '2', '4', 'Whole Score'])

  const handleMeasuresToStudyChange = (element, index, oldValue, newValue) => {
    let settings =
      JSON.parse(localStorage.getItem('settings')) === null
        ? {}
        : JSON.parse(localStorage.getItem('settings'))
    // document.getElementsByClassName('loadingWindow2')[0].style.display = 'block';
    window.stop()
    newValue === 'Whole Score'
      ? (settings['mesaureDistance'] = '1000')
      : (settings['mesaureDistance'] = newValue)
    localStorage.setItem('settings', JSON.stringify(settings))
    updateScoreMeasure()
    // window.AddPaddingToCurrsor();
    // window.FilterNotes();
    window.FilterNotesPianoC()
    window.deleteUserNotesAll()
    window.OsmdOverlays()
    if (settings['mesaureDistance'] === '1000') {
      window.osmd.PlaybackManager.setPlaybackStart(
        window.osmd.Sheet.SourceMeasures[0].absoluteTimestamp
      )
    }
  }

  function countExpiredCards (deckMeasureNumber) {
    let count = 0
    var oldItems2 =
      JSON.parse(localStorage.getItem(window.selDeck + deckMeasureNumber)) || []
    var tests2 = []
    if (Object.keys(oldItems2).length <= 1) {
      return []
    } else {
      for (let i = 0; i < Object.keys(oldItems2).length; i++) {
        tests2.push(oldItems2[i])
      }
      for (let i = 0; i < tests2.length; i++) {
        // oldItems2[i].timeStamp
        if (tests2[i].timeStamp < Date.now()) {
          count++
        }
      }
      return count
    }
  }
  window.countExpiredCards = countExpiredCards

  function updateScoreMeasure () {
    window.StartExercise()
  }

  function measureDistance () {
    let settings =
      JSON.parse(localStorage.getItem('settings')) === null
        ? {}
        : JSON.parse(localStorage.getItem('settings'))
    return settings['mesaureDistance']
  }

  function TranslatedNotesClose () {
    if (
      document.getElementById('translateNotesWindow').style.display === 'block'
    ) {
      document.getElementById('translateNotesWindow').style.display = 'none'
    }
  }

  const [filteredDecksDict, setFilteredDecksDict] = useState(
    Object.keys(AllDecksDict)
  )

  const [pullScoreListUP, setPullScoreListUP] = useState(false)
  function PullScoreListUP () {
    setPullScoreListUP(true)
  }

  function PullScoreListDown () {
    setPullScoreListUP(false)
  }

  function SaveBTVolume () {
    let settings =
      JSON.parse(localStorage.getItem('settings')) === null
        ? {}
        : JSON.parse(localStorage.getItem('settings'))
    settings['backTrackVol'] =
      document.getElementById('backTrackVol').value / 100
    localStorage.setItem('settings', JSON.stringify(settings))
    BackTrackVol(document.getElementById('backTrackVol').value)
    let volumeText = document.getElementById('volumeText')
    volumeText.innerHTML = document.getElementById('backTrackVol').value
  }

  function GetBackTrackVol () {
    let settings =
      JSON.parse(localStorage.getItem('settings')) === null
        ? {}
        : JSON.parse(localStorage.getItem('settings'))
    return settings['backTrackVol']
  }

  function SaveTempo () {
    let settings =
      JSON.parse(localStorage.getItem('settings')) === null
        ? {}
        : JSON.parse(localStorage.getItem('settings'))
    settings['tempo'] = document.getElementById('tempo').value
    localStorage.setItem('settings', JSON.stringify(settings))
    let tempoText = document.getElementById('tempoText')
    tempoText.innerHTML = document.getElementById('tempo').value
  }

  function GetTempo () {
    let settings =
      JSON.parse(localStorage.getItem('settings')) === null
        ? {}
        : JSON.parse(localStorage.getItem('settings'))
    return settings['tempo']
  }

  return (
    <div id='myNav2' className='contentSettingsWindow'>
      {/* <UploadScore/> */}

      <div
        style={{
          display: 'flex',
          marginLeft: '20px',
          marginTop: '30px',
          display: pullScoreListUP ? 'none' : 'block'
        }}
      >
        <div style={{ float: 'left' }}>
          <Dropdown
            options={{
              value:
                measureDistance() === '1000'
                  ? 'Whole Score'
                  : measureDistance(),
              onchange: handleMeasuresToStudyChange,
              data: numberOfMeasures.current,
              newOptions: false,
              width: '100px'
            }}
          />
        </div>
        <h3
          style={{
            position: 'relative',
            fontSize: '12px',
            color: 'rgb(186, 186, 186)',
            left: '20px'
          }}
        >
          Number Of Measures To Study
        </h3>
      </div>
      <div
        style={{
          display: 'flex',
          marginLeft: '20px',
          marginTop: '20px'
        }}
      >
        {' '}
        BackTrack Volume
        <p
          style={{ display: 'flex', marginLeft: '20px', marginTop: '0px' }}
          id='volumeText'
        >
          {GetBackTrackVol() * 100}
        </p>
      </div>
      <div
        style={{
          marginLeft: '20px',
          display: pullScoreListUP ? 'none' : 'block'
        }}
      >
        <input
          style={{ width: '80%', left: '20px', fill: 'blue', stroke: 'red' }}
          type='range'
          id='backTrackVol'
          min='0'
          max='100'
          fill='blue'
          stroke='red'
          onChange={SaveBTVolume}
          // value="20" //{GetBackTrackVol}
        />
      </div>
      <div
        style={{
          display: 'flex',
          marginLeft: '20px',
          marginTop: '10px'
        }}
      >
        {' '}
        Tempo
        <p style={{ marginLeft: '20px', marginTop: '0px' }} id='tempoText'>
          {GetTempo()}
        </p>
      </div>
      <div
        style={{
          marginLeft: '20px',
          display: pullScoreListUP ? 'none' : 'block'
        }}
      >
        {' '}
      </div>
      <input
        style={{
          width: '80%',
          marginLeft: '20px',
          color: 'blue',
          marginTop: '-10px'
        }}
        type='range'
        id='tempo'
        min='10'
        max='150'
        onChange={SaveTempo}
        // value="20" //{GetBackTrackVol}
      />

      <div
        style={{ display: 'flex', display: pullScoreListUP ? 'none' : 'block' }}
      >
        <p
          style={{
            fontSize: '12px',
            marginLeft: '20px',
            fontWeight: 'bold',
            color: 'rgb(186, 186, 186)'
          }}
        >
          Selected Score:
        </p>
        <p
          style={{
            fontSize: '12px',
            fontWeight: 'bold',
            marginLeft: '20px'
          }}
        >
          {scoreMetaData.deck_name}
        </p>
      </div>
      <p
        style={{
          marginLeft: '20px',
          fontSize: '8px',
          display: pullScoreListUP ? 'none' : 'block'
        }}
      >
        {' '}
        Number Of Expired Cards: Legend:
        <span style={{ color: '#00ff00' }}> - 1 Measure</span>
        <span style={{ color: '#ff0000' }}> - 2 Measures</span>
        <span style={{ color: '#eeee00' }}> - 4 Measures</span>
      </p>
      <hr />

      <div>
        <input
          style={{
            fontSize: '14px',
            width: '35%',
            position: 'relative',
            left: '20px'
          }}
          onFocus={PullScoreListUP}
          onBlur={PullScoreListDown}
          type='text'
          placeholder={
            pullScoreListUP
              ? 'click anywhere ouside to reposition'
              : 'Search Score'
          }
          onChange={e => {
            setFilteredDecksDict(
              Object.keys(AllDecksDict).filter(value => {
                console.log(value + ',' + e.target.value)
                return value
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              })
            )
          }}
        ></input>
      </div>
      <ul>
        {filteredDecksDict.map((key, index) => (
          <React.Fragment key={index}>
            <li key={index} className='listItem'>
              <div style={{ display: 'flex' }}>
                <p
                  style={{
                    fontSize: '12px',
                    padding: '0px',
                    margin: '0px'
                  }}
                  onClick={() => {
                    TranslatedNotesClose()
                    window.deleteUserNotesAll()
                    window.stop() //stop playing the score
                    setScoreMetaData({ deck_name: key })
                    if (key != scoreMetaData.deck_name) {
                      document.getElementsByClassName(
                        'loadingWindow2'
                      )[0].style.display = 'block'

                      window.CalcTransCursorPosDel()
                      window.clearCursorPositions()
                      // window.FilterNotes();
                    } else {
                    }
                  }}
                >
                  {key}
                  {/* need to check if this messes the SR */}
                  <span style={{ fontSize: '0px' }}>
                    {(window.selDeck = key)}
                  </span>
                  <span ste={{ color: '#00ff00' }}>
                    {' '}
                    {countExpiredCards(1)}
                  </span>
                  <span style={{ color: '#ff0000' }}>
                    {' '}
                    {countExpiredCards(2)}
                  </span>
                  <span style={{ color: '#eeee00' }}>
                    {' '}
                    {countExpiredCards(4)}
                  </span>
                </p>
              </div>
            </li>

            <hr />
          </React.Fragment>
        ))}
      </ul>

      <button
        component='span'
        className='contentButton'
        id='contentButton'
        onClick={openNav2}
      >
        <div
          className='listIcon'
          style={{ color: 'white', fontSize: '45px' }}
        ></div>
      </button>

      <button
        component='span'
        id='pianoWindowButton'
        className='pianoWindowButton'
        onClick={window.PianoWindow}
      >
        <div
          className='pianoIcon'
          style={{ color: 'white', fontSize: '45px' }}
        ></div>
      </button>
    </div>
  )
}

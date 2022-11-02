import React, { useState, useEffect, ReactComponent } from 'react'
// import { Spellcheck, Backspace, Check, Info } from '@material-ui/icons';
import { IonButton } from '@ionic/react'

export default function UserInputWindowF () {
  const [countUserInput, setCountUserInput] = useState(
    window.recordings.events.length
  )

  const [userInputText, setUserInputText] = useState([])

  const autoColorSet = {
    // color set from MuseScore Color notehead plugin version 1.1 by Werner Schweer and others
    C: '#eeee00',
    D: '#9b30ff',
    E: '#ee9a00',
    F: '#8b4513',
    G: '#ff0000',
    A: '#1e90ff',
    B: '#00ff00'
  }

  function CountUserInp () {
    setCountUserInput(window.recordings.events.length)

    let userInputTextArr = []

    for (let i = 0; i < window.recordings.events.length; i++) {
      let onlyLettersArray = window.midiToNote[
        window.recordings.events[i].midiNumber
      ]
        .split('')
        .filter(char => /[a-zA-Z]/.test(char))
      let colorNoteText = autoColorSet[onlyLettersArray]
      if (i + 1 < window.measureSelectedNotes.length) {
        if (
          window.measureSelectedNotes[i].noteObject.sourceMeasure
            .MeasureNumberXML ===
          window.measureSelectedNotes[i + 1].noteObject.sourceMeasure
            .MeasureNumberXML
        ) {
          userInputTextArr.push(
            <span style={{ color: colorNoteText }}>
              {window.midiToNote[window.recordings.events[i].midiNumber]}
            </span>
          )
        } else {
          userInputTextArr.push(
            <span style={{ color: colorNoteText }}>
              {window.midiToNote[window.recordings.events[i].midiNumber]}
            </span>
          )
          userInputTextArr.push(
            <span style={{ color: 'white' }}>
              &nbsp;|
              {
                window.measureSelectedNotes[i + 1].noteObject.sourceMeasure
                  .MeasureNumberXML
              }
              &nbsp;
            </span>
          )
        }
      } else {
        if (i === window.measureSelectedNotes.length) {
          userInputTextArr.push(
            <span style={{ color: 'white' }}>&nbsp;|&nbsp;|&nbsp;</span>
          )
          userInputTextArr.push(
            <span style={{ color: colorNoteText }}>
              {window.midiToNote[window.recordings.events[i].midiNumber]}
            </span>
          )
        } else {
          userInputTextArr.push(
            <span style={{ color: colorNoteText }}>
              {window.midiToNote[window.recordings.events[i].midiNumber]}
            </span>
          )
        }
      }
    }
    setUserInputText(userInputTextArr)
    const element = document.getElementById('scrollText')
    setTimeout(() => (element.scrollLeft += 200), 100)
    // setTimeout(() => hideNoteText(), 500);
  }
  window.CountUserInp = CountUserInp

  function deleteUserNotes () {
    window.recordings.events.pop()
    CountUserInp()

    window.previous() //cursor folow up user input

    if (
      document.getElementById('translateNotesWindow').style.display === 'block'
    ) {
      window.CalcTransCursorPosDel()
    }
  }

  function deleteUserNotesAll () {
    window.recordings.events.clear()
    CountUserInp()
    // stopCounter()

    window.clearCursorPositions() //cursor folow up user input

    if (
      document.getElementById('translateNotesWindow').style.display === 'block'
    ) {
      window.CalcTransCursorPosDelAll()
    }
  }

  window.deleteUserNotesAll = deleteUserNotesAll

  function deleteAndstartCounter () {
    deleteUserNotes()
  }

  return (
    <div id='scrollText' className='noteTextWindow'>
      <p
        style={{
          position: 'absolute',
          top: 0,
          overflowY: 'scroll',
          display: 'flex',
          margin: '4px',
          marginLeft: '10px',
          margingRight: '10px',
          fontSize: '16px'
        }}
      >
        {userInputText}
      </p>

      <IonButton
        // style={{position}}
        component='span'
        id='deleteButton'
        className='deleteButton'
        // onClick={deleteUserNotes}
        onTouchStart={deleteAndstartCounter}
        // onTouchCancel={deleteUserNotes}
        onTouchMove={deleteUserNotesAll}
      >
        {countUserInput}
        {/* {countUserInput > 0 ? <p>{countUserInput}</p> : <Backspace />} mIcon */}
      </IonButton>
    </div>
  )
}

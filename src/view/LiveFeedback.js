import React, { useState } from 'react'
import { beam1NotePos, beam2NotePos } from '../data/LiveNotesData'
export default function LiveFeedback ({
  curentCursorNotes,
  liveFeedback,
  setLiveFeedback
}) {
  window.beam1NotePos = beam1NotePos
  // const [liveFeedback, setLiveFeedback] = useState([])

  let noteG = (
    <svg width='10' height='10'>
      <circle cx='5' cy='5' r='5' />
      Sorry, your browser does not support inline SVG.
    </svg>
  )
  let noteIs = false
  function LiveFeedbackNotes (userNote) {
    if (curentCursorNotes.length === 0) {
      return
    }
    for (let i = 0; i < curentCursorNotes.length; i++) {
      if (userNote === curentCursorNotes[i].n) {
        noteIs = true
        let noteDiv = (
          <div
            style={{
              position: 'absolute',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              top:
                curentCursorNotes[i].sI === 2
                  ? beam2NotePos[userNote] +
                    curentCursorNotes[i].cB +
                    100 +
                    'px'
                  : beam1NotePos[userNote] +
                    curentCursorNotes[i].cT +
                    100 +
                    'px',
              left: curentCursorNotes[i].nPVer + 'px',
              zIndex: 10,
              fill: 'lime'
            }}
          >
            {noteG}
          </div>
        )
        setLiveFeedback(liveFeedback => [...liveFeedback, [noteDiv]])
      }
    }
    if (noteIs === false) {
      let noteDiv = (
        <div
          style={{
            position: 'absolute',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            top:
              userNote <= 59
                ? beam2NotePos[userNote] + curentCursorNotes[0].cB + 100 + 'px'
                : beam1NotePos[userNote] + curentCursorNotes[0].cT + 100 + 'px',
            left: curentCursorNotes[0].nPVer + 'px',
            zIndex: 8,
            fill: 'red'
          }}
        >
          {noteG}
        </div>
      )
      setLiveFeedback(liveFeedback => [...liveFeedback, [noteDiv]])
    }
    noteIs = false
  }
  window.LiveFeedbackNotes = LiveFeedbackNotes

  //testing
  function AddGNoteFeedback () {
    let notesArr = []
    for (let i = 0; i < window.cursorNotes.length; i++) {
      for (let e = 0; e < window.cursorNotes[i].length; e++) {
        let noteDiv = (
          <div
            style={{
              position: 'absolute',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              top:
                window.cursorNotes[i][e].sI === 2
                  ? beam2NotePos[window.cursorNotes[i][e].n] +
                    window.cursorNotes[i][e].cB +
                    100 +
                    'px'
                  : beam1NotePos[window.cursorNotes[i][e].n] +
                    window.cursorNotes[i][e].cT +
                    100 +
                    'px',
              left: window.cursorNotes[i][e].nPVer + 'px',
              zIndex: 10,
              fill: 'red'
            }}
          >
            {noteG}
          </div>
        )
        setLiveFeedback(liveFeedback => [...liveFeedback, [noteDiv]])
      }
    }
  }
  window.AddGNoteFeedback = AddGNoteFeedback

  return (
    <div
      className='osmdSvgPage1'
      id='osmdSvgPage1'
      style={{
        position: 'absolute',
        height: 'inherit',

        width: '100%'
      }} //need to check width issue, if width is less than 5000 score will not render
    >
      <div
        // style={{ position: 'relative', width: 'inherit', height: 'inherit' }}
        id='liveFeedbackNotes'
        className='liveFeedbackNotes'
      >
        {liveFeedback}
      </div>
    </div>
  )
}

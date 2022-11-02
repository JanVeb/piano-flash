import '../App.css'
import React, { useState, useEffect } from 'react'

// import { Spellcheck, Backspace, Check, Info } from '@material-ui/icons';

// !!!need this import, it apears its not used, but its used under window.MidiToNote, otherwise app doesnt work
import MidiToNote from '../data/MidiToNote'
// import swal from 'sweetalert'
import { IonButton } from '@ionic/react'

// window.deck = AllDecks;

export default function FeedbackWindow ({
  setMeasureStart,
  setMeasureEnd,
  scoreMetaData
}) {
  const [showInfoButton, setShowInfoButton] = useState(0)
  const [toManyNotes, setToManyNotes] = useState(0)

  function LoadingScreenThenFeedback () {
    let settings = JSON.parse(localStorage.getItem('settings'))
    if (settings['mesaureDistance'] > 2) {
      document.getElementsByClassName('loadingWindow2')[0].style.display =
        'block'
    }
    setTimeout(() => openNav3(), 10)
  }

  function TranslatedNotesClose () {
    if (
      document.getElementById('translateNotesWindow').style.display === 'block'
    ) {
      document.getElementById('translateNotesWindow').style.display = 'none'
    }
  }

  function openNav3 () {
    // function AddPaddingToCurrsor() {
    //   if (window.osmd.graphic.drawer.backend.width + 200 > window.innerWidth) {
    //     // window.AddPaddingToCurrsor();
    //   }
    // }

    if (document.getElementById('myNav3').style.height === '44%') {
      document.getElementById('myNav3').style.height = '0'
      TranslatedNotesClose()
      setShowInfoButton(0)
      if (toManyNotes === 1) {
        setToManyNotes(0)
      }
      // if (settings['noteColor'] !== 0) {
      //   window.osmd.setOptions({ coloringMode: 1 });
      //   window.osmd.render();
      // }
      // colorNotesBlack();
      // AddPaddingToCurrsor();
      document.getElementsByClassName('loadingWindow2')[0].style.display =
        'none'

      if (correctAnswer === true) {
        set_next_score()
        setCorrectAnswer(false)
        document.getElementById('translateNotesButton').style.visibility =
          'hidden'
        // document.getElementById("translateNotesButton").style.display = 'none';
      }
      setUserNotesOnScreen([])
      setScoreNotesOnScreen([])
      if (correctAnswer === false) {
        document.getElementById('translateNotesButton').style.visibility =
          'visible'
      }
      setTimeout(() => window.OsmdOverlays(), 100)
    } else {
      // FilterNotes()

      // if (
      //   JSON.parse(localStorage.getItem('noteColor')) === 1 ||
      //   JSON.parse(localStorage.getItem('noteColor')) !== NaN
      // ) {
      //   window.osmd.setOptions({ coloringMode: 0 });
      // }

      feedbackNotes()

      document.getElementById('myNav3').style.height =
        '44%' /** from 100% to 25% **/
      setShowInfoButton(1)
    }
    window.FilterNotesPianoC()
    window.deleteUserNotesAll()
  }

  // function colorNotesBlack() {
  //   let settings = JSON.parse(localStorage.getItem('settings'));
  //   if (settings['darkMode'] === 'On') {
  //     for (var i = 0; i < window.allNotes.length; i++) {
  //       window.allNotes[i].noteObject.NoteheadColor = 'WhiteSmoke';
  //     }
  //   } else {
  //     for (var i = 0; i < window.allNotes.length; i++) {
  //       window.allNotes[i].noteObject.NoteheadColor = 'black';
  //     }
  //   }
  //   window.osmd.render();
  // }

  var scoreNotesArr = []
  let userNotesArray = []
  let unevenNoteNotice
  window.unevenNoteNotice = unevenNoteNotice
  // let window.measureSelectedNotes = [];

  // function FilterNotes() {
  //   window.measureSelectedNotes = []
  //   let settings = JSON.parse(localStorage.getItem('settings'));
  //   for (let i = 0; i < window.allNotes.length; i++) {
  //     for (var e = settings['measureStart']; e <= settings['measureEnd']; e++) {
  //       if (
  //         window.allNotes[i].noteObject.sourceMeasure.MeasureNumberXML === e
  //       ) {
  //         window.measureSelectedNotes.push({
  //           note: window.allNotes[i].note,
  //           measure:
  //             window.allNotes[i].noteObject.sourceMeasure.MeasureNumberXML,
  //           noteObject: window.allNotes[i].noteObject,
  //           time: window.allNotes[i].time,
  //         });

  //         // window.measureSelectedNotes.push(window.measureSelectedNotes[i].noteObject.sourceMeasure.MeasureNumberXML)
  //       }
  //     }
  //   }
  // }
  // window.FilterNotes = FilterNotes;

  // FilterNotes()

  // useEffect(() => {
  //   FilterNotes()
  // }, [scoreMetaData, setMeasureStart]);

  function arrayScoreNotes (midiNumbers) {
    // window.measureSelectedNotes = window.allNotes;

    if (window.recordings.events.length < window.measureSelectedNotes.length) {
      let userLength = window.recordings.events.length
      let scoreLength = window.measureSelectedNotes.length
      let lengthDifrence = scoreLength - userLength
      for (let i = 0; i < lengthDifrence; i++) {
        const newEvents = {
          midiNumber: 'x',
          time: 0,
          duration: 0
        }
        window.recordings = {
          events: window.recordings.events.concat(newEvents),
          currentTime: 0
        }
      }
    }

    let shortScoreArr = []

    let shortUserArr = []

    for (let i = 0; i < window.measureSelectedNotes.length; i++) {
      if (i === 0) {
        shortScoreArr.push(window.measureSelectedNotes[i].note)
        shortUserArr.push(window.recordings.events[i].midiNumber)
      } else {
        if (
          i >= 1 &&
          window.measureSelectedNotes[i].time ===
            window.measureSelectedNotes[i - 1].time
        ) {
          shortScoreArr.push(window.measureSelectedNotes[i].note)
          shortUserArr.push(window.recordings.events[i].midiNumber)
        } else {
          if (
            i >= 1 &&
            window.measureSelectedNotes[i].time !==
              window.measureSelectedNotes[i - 1].time
          ) {
            scoreNotesArr.push(shortScoreArr)
            shortScoreArr = []
            shortScoreArr.push(window.measureSelectedNotes[i].note)

            userNotesArray.push(shortUserArr)
            shortUserArr = []
            shortUserArr.push(window.recordings.events[i].midiNumber)
          } else {
          }
        }
      }
    }
    scoreNotesArr.push(shortScoreArr)
    userNotesArray.push(shortUserArr)
  }

  let compareNotes = []
  function userScoreNotesCompare () {
    console.log(
      '🚀 ~ file: FeedbackWindow.js ~ line 200 ~ userScoreNotesCompare ~ compareNotes',
      compareNotes
    )
    compareNotes.clear()

    let noteComparison = []

    for (var i = 0; i < scoreNotesArr.length; i++) {
      for (var e = 0; e < scoreNotesArr[i].length; e++) {
        let scoreNotesComp = scoreNotesArr[i]
        let userNotesComp = userNotesArray[i][e]
        let result = scoreNotesComp.includes(userNotesComp)

        if (result === true) {
          noteComparison = 1
          compareNotes.push(noteComparison)
        } else {
          noteComparison = 0
          compareNotes.push(noteComparison)
        }
      }
    }
  }

  function userFeedback () {
    const sumOfCorrect = compareNotes.reduce(
      (partialSum, a) => partialSum + a,
      0
    )

    if (
      window.measureSelectedNotes.length < window.recordings.events.length ||
      window.measureSelectedNotes.length < 1
    ) {
      wrong_answer()
    } else {
      if (window.measureSelectedNotes.length === sumOfCorrect) {
        correct_answer()
      } else {
        wrong_answer()
      }
    }
  }

  const [userNotesOnScreen, setUserNotesOnScreen] = useState([])
  const [scoreNotesOnScreen, setScoreNotesOnScreen] = useState([])
  const [measureLine, setMeasureLine] = useState([])

  function feedbackNotes () {
    setUserNotesOnScreen([])
    setScoreNotesOnScreen([])
    setMeasureLine([])

    arrayScoreNotes()
    userScoreNotesCompare()
    userFeedback()

    // for (var i = 0; i < compareNotes.length; i++) {
    //   if (compareNotes[i] === 0) {
    //     window.measureSelectedNotes[i].noteObject.NoteheadColor = 'red';
    //   }
    // }
    // window.osmd.render();
    for (var i = 0; i < scoreNotesArr.length; i++) {
      scoreNotesArr[i].sort(function (a, b) {
        return b - a
      })
      userNotesArray[i].sort(function (a, b) {
        return b - a
      })
    }

    let a = -1
    for (var i = 0; i < userNotesArray.length; i++) {
      for (var e = 0; e < userNotesArray[i].length; e++) {
        a++
        let marginLeft = 40 + i * 50
        let marginTop = 40 + e * 30
        let marginTopUser = 52 + e * 30

        let checkColor =
          scoreNotesArr[i][e] === userNotesArray[i][e] ? 'lime' : 'red'

        let userNote = window.midiToNote[userNotesArray[i][e]]
        let ScoreNote = window.midiToNote[scoreNotesArr[i][e]]

        let notePosition = {
          C: 170,
          D: 165,
          E: 160,
          F: 155,
          G: 150,
          A: 145,
          B: 140
        }

        var getScoreLetter = ScoreNote[0]
        var getScoreNumber = ScoreNote[ScoreNote.length - 1]

        var getUserLetter
        var getUserNumber

        let user_text_element

        var scoreMarginTopMS
        var userMarginTopMS

        if (
          window.allNotes[a].noteObject.parentStaffEntry.parentStaff.id === 2
        ) {
          scoreMarginTopMS =
            notePosition[getScoreLetter] + 163 - getScoreNumber * 35
        } else {
          scoreMarginTopMS =
            notePosition[getScoreLetter] + 103 - getScoreNumber * 35
        }
        let score_text_element = []

        score_text_element.push(
          <p
            style={{
              position: 'absolute',
              left: marginLeft + 'px',
              // color: autoColorSet[getScoreLetter],
              color: 'white',
              top: marginTop + 'px',
              fontWeight: 'bold'
            }}
          >
            {/* need to find better solution to adding margin on right */}
            {ScoreNote}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
            {/* added spaces to add MARGIN on the end of feedback window??? */}
          </p>
        )

        // if (userNotesArray[i][e] !== 'x' && !userNotesArray[i].includes(scoreNotesArr[i][e])) {
        if (
          (userNotesArray[i][e] !== 'x' &&
            scoreNotesArr[i][e] === userNotesArray[i][0]) ||
          scoreNotesArr[i][e] === userNotesArray[i][1] ||
          scoreNotesArr[i][e] === userNotesArray[i][2]
        ) {
          getUserLetter = userNote[0]
          getUserNumber = userNote[userNote.length - 1]
          if (
            window.allNotes[a].noteObject.parentStaffEntry.parentStaff.id === 2
          ) {
            userMarginTopMS =
              notePosition[getUserLetter] + 163 - getUserNumber * 35
          } else {
            userMarginTopMS =
              notePosition[getUserLetter] + 103 - getUserNumber * 35
          }

          user_text_element = (
            <p
              style={{
                position: 'absolute',
                left: marginLeft + 'px',
                color: 'lime',
                top: marginTopUser + 'px',
                fontWeight: 'bold'
              }}
            >
              {userNote}
            </p>
          )
        } else {
          if (userNotesArray[i][e] !== 'x') {
            getUserLetter = userNote[0]
            getUserNumber = userNote[userNote.length - 1]
            if (
              window.allNotes[a].noteObject.parentStaffEntry.parentStaff.id ===
              2
            ) {
              userMarginTopMS =
                notePosition[getUserLetter] + 163 - getUserNumber * 35
            } else {
              userMarginTopMS =
                notePosition[getUserLetter] + 103 - getUserNumber * 35
            }
            user_text_element = (
              <p
                style={{
                  position: 'absolute',
                  left: marginLeft + 'px',
                  color: 'red',
                  top: marginTopUser + 'px',
                  fontWeight: 'bold'
                }}
              >
                {userNote}
              </p>
            )
          }
        }

        setUserNotesOnScreen(userNotesOnScreen => [
          ...userNotesOnScreen,
          [user_text_element]
        ])
        setScoreNotesOnScreen(scoreNotesOnScreen => [
          ...scoreNotesOnScreen,
          [score_text_element]
        ])

        if (a + 1 < window.measureSelectedNotes.length) {
          if (
            window.measureSelectedNotes[a].noteObject.sourceMeasure
              .MeasureNumberXML !==
            window.measureSelectedNotes[a + 1].noteObject.sourceMeasure
              .MeasureNumberXML
          ) {
            let measureNumber =
              '' +
              window.measureSelectedNotes[a].noteObject.sourceMeasure
                .MeasureNumberXML // used to position measure line numbers at middle of measure line
            let measureLineElem = [
              <p
                style={{
                  position: 'absolute',
                  top: '25px',
                  fontSize: '20px',
                  marginLeft:
                    measureNumber < 10
                      ? marginLeft + 38
                      : measureNumber < 100
                      ? marginLeft + 34
                      : marginLeft + 30
                }}
              >
                {window.measureSelectedNotes[a].noteObject.sourceMeasure
                  .MeasureNumberXML === NaN
                  ? null
                  : window.measureSelectedNotes[a].noteObject.sourceMeasure
                      .MeasureNumberXML + 1}
              </p>,
              <p
                style={{
                  position: 'absolute',
                  top: '60px',
                  borderLeft: '1px solid grey',
                  height: marginTop + 60 + 'px',
                  left: marginLeft + 44 + 'px'
                }}
              ></p>
            ]
            setMeasureLine(measureLine => [...measureLine, [measureLineElem]])
          }
        }
      }
      document.getElementsByClassName('loadingWindow2')[0].style.display =
        'none'
    }
    if (window.recordings.events.length > window.measureSelectedNotes.length) {
      setToManyNotes(1)
    }
    scoreNotesArr.clear()
    userNotesArray.clear()
    window.recordings = {
      events: [],
      currentTime: null
    }
  }

  var interval = {
    0: 5,
    1: 8,
    2: 15,
    3: 75,
    4: 375,
    5: 1875,
    6: 9375,
    7: 46875,
    8: 234375,
    9: 525600
  }

  const [currentId, setCurrentId] = useState(0)
  useEffect(() => {}, [currentId])

  function StartExercise () {
    let settings = JSON.parse(localStorage.getItem('settings'))
    var oldItems2 =
      JSON.parse(
        localStorage.getItem(window.selectedDeck + settings['mesaureDistance'])
      ) || []

    var newItem = new Map()

    if (oldItems2.length === 0) {
      setCurrentId(0)
      if (settings['mesaureDistance'] === undefined) {
        settings['mesaureDistance'] = 1
      }

      if (settings['mesaureDistance'] === '4') {
        newItem[0] = {
          Id: 0,
          streak: 0,
          timeStamp: Date.now(),
          measureStart: 1,
          measureEnd: 1 + (settings['mesaureDistance'] - 2)
        }
      } else {
        newItem[0] = {
          Id: 0,
          streak: 0,
          timeStamp: Date.now(),
          measureStart: 1,
          measureEnd: 1 + (settings['mesaureDistance'] - 1)
        }
      }

      localStorage.setItem(
        window.selectedDeck + settings['mesaureDistance'],
        JSON.stringify(newItem)
      )
      oldItems2 = newItem

      setMeasureStart(1)
      setMeasureEnd(1 + (settings['mesaureDistance'] - 1))
      settings['measureStart'] = 1
      settings['measureEnd'] = 1 + (settings['mesaureDistance'] - 1)
      localStorage.setItem('settings', JSON.stringify(settings))
    } else {
      var tests2 = new Array()
      for (let i = 0; i < Object.keys(oldItems2).length; i++) {
        tests2.push(oldItems2[i])
      }

      var oldest2 =
        tests2[
          Object.keys(tests2)
            .sort(function (a, b) {
              return tests2[b].timeStamp - tests2[a].timeStamp
            })
            .pop()
        ]

      if (oldest2['timeStamp'] < Date.now()) {
        setMeasureStart(oldest2.measureStart)
        setMeasureEnd(oldest2.measureEnd)
        settings['measureStart'] = oldest2.measureStart
        settings['measureEnd'] = oldest2.measureEnd
        localStorage.setItem('settings', JSON.stringify(settings))
        setCurrentId(oldest2.Id) ///REMOVE???
      }
    }
  }
  window.StartExercise = StartExercise

  const [correctAnswer, setCorrectAnswer] = useState(false)

  // var noNewExpiredCards = false;
  const [noNewExpiredCards, setNoNewExpiredCards] = useState(false)
  // console.log("🚀 ~ file: FeedbackWindow.js ~ line 761 ~ feedbackNotes ~ noNewExpiredCards  1", noNewExpiredCards)

  const correct_answer = () => {
    if (noNewExpiredCards === false) {
      let settings = JSON.parse(localStorage.getItem('settings'))
      //update sr
      var oldItems2 =
        JSON.parse(
          localStorage.getItem(
            window.selectedDeck + settings['mesaureDistance']
          )
        ) || []
      oldItems2[currentId].timeStamp =
        oldItems2[currentId]['streak'] <= 9 //curent maximum time interval is at streak 9, therefore checking if less than 9
          ? Date.now() + interval[oldItems2[currentId]['streak']] * 60000
          : Date.now() + 525600 * 60000

      oldItems2[currentId].streak = oldItems2[currentId].streak + 1
      localStorage.setItem(
        window.selectedDeck + settings['mesaureDistance'],
        JSON.stringify(oldItems2) //REMOVE???
      )
    }
    window.countExpiredCards()
    setCorrectAnswer(true)
    // set_next_score();
  }

  const set_next_score = () => {
    let settings = JSON.parse(localStorage.getItem('settings'))
    var oldItems2 = JSON.parse(
      localStorage.getItem(window.selectedDeck + settings['mesaureDistance'])
    )
    var tests2 = new Array()
    for (let i = 0; i < Object.keys(oldItems2).length; i++) {
      tests2.push(oldItems2[i])
    }

    var oldest2 =
      tests2[
        Object.keys(tests2)
          .sort(function (a, b) {
            return tests2[b].timeStamp - tests2[a].timeStamp
          })
          .pop()
      ]
    if (oldest2['timeStamp'] < Date.now()) {
      setMeasureStart(oldest2.measureStart)
      setMeasureEnd(oldest2.measureEnd)
      settings['measureStart'] = oldest2.measureStart
      settings['measureEnd'] = oldest2.measureEnd
      localStorage.setItem('settings', JSON.stringify(settings))
      setCurrentId(oldest2.Id)
      setNoNewExpiredCards(false)
    } else {
      let settings = JSON.parse(localStorage.getItem('settings'))
      let getOldItmes2Length = Object.keys(oldItems2)
      let newId = getOldItmes2Length.length
      setCurrentId(newId)
      let startMeasure =
        oldItems2[newId - 1].measureStart +
        parseInt(settings['mesaureDistance'])
      let endMeasure =
        oldItems2[newId - 1].measureEnd + parseInt(settings['mesaureDistance'])
      if (settings['numberOfMeasures'] > oldItems2[newId - 1].measureEnd) {
        setCurrentId(newId)
        if (
          settings['mesaureDistance'] === '4' &&
          Object.keys(oldItems2).length === 1
        ) {
          oldItems2[newId] = {
            Id: newId,
            streak: 0,
            timeStamp: Date.now(),
            measureStart: startMeasure - 1,
            measureEnd: endMeasure
          }
          setNoNewExpiredCards(false)
        } else {
          oldItems2[newId] = {
            Id: newId,
            streak: 0,
            timeStamp: Date.now(),
            measureStart: startMeasure,
            measureEnd: endMeasure
          }
        }
        localStorage.setItem(
          window.selectedDeck + settings['mesaureDistance'],
          JSON.stringify(oldItems2)
        )

        setMeasureStart(startMeasure)
        setMeasureEnd(endMeasure)
        settings['measureStart'] = startMeasure
        settings['measureEnd'] = endMeasure
        localStorage.setItem('settings', JSON.stringify(settings))
        setNoNewExpiredCards(false)
      } else {
        // swal({
        //   text: 'There is no more new or expired cards, come back later',
        //   icon: 'warning',
        //   buttons: true,
        //   dangerMode: true
        // })
        setNoNewExpiredCards(true)
      }
    }
    //reset cursor and play/pause button
    window.stop()
  }

  const wrong_answer = () => {
    let settings = JSON.parse(localStorage.getItem('settings'))
    var oldItems2 =
      JSON.parse(
        localStorage.getItem(window.selectedDeck + settings['mesaureDistance'])
      ) || [] //remove []?

    oldItems2[currentId].timeStamp = Date.now()
    oldItems2[currentId].streak = 0
    localStorage.setItem(
      window.selectedDeck + settings['mesaureDistance'],
      JSON.stringify(oldItems2)
    )
  }

  function OpenInfoWindow () {
    console.log(
      '🚀 ~ file: FeedbackWindow.js ~ line 1032 ~ OpenInfoWindow ~ OpenInfoWindow  1'
    )
    if (
      document.getElementById('infoWindow').style.height === '0%' ||
      document.getElementById('infoWindow').style.height === ''
    ) {
      console.log(
        '🚀 ~ file: FeedbackWindow.js ~ line 1032 ~ OpenInfoWindow ~ OpenInfoWindow  2'
      )
      document.getElementById('infoWindow').style.height = '60%' // document.getElementById("infoWindow").style.width = "40%";
    } else {
      console.log(
        '🚀 ~ file: FeedbackWindow.js ~ line 1032 ~ OpenInfoWindow ~ OpenInfoWindow  3'
      )
      document.getElementById('infoWindow').style.height = '0%'
    }
  }

  function getDarkMode () {
    let settings = JSON.parse(localStorage.getItem('settings'))
    return settings['darkMode']
  }

  // const wrong =

  // <img id="cursorImg-0" height="120" style="position: absolute; z-index: -1; top: 16.5px; left: 82.4875px; height: 120.6px;" width="30"></img>

  return (
    <div>
      <div id='myNav3' className='feedbackWindow'>
        <p
          style={{
            position: 'fixed',
            left: '10px',
            bottom: '30%'
          }}
          onClick={() => {
            OpenInfoWindow()
          }}
        >
          mIcon
          {/* {showInfoButton === 0 ? null : <Info />} */}
        </p>
        {/* //hide info button, as its set to position: fixed, it shows on piano keyboard */}
        {toManyNotes === 1 ? (
          <p
            style={{
              position: 'fixed',
              color: 'red',
              bottom: '32%',
              // width: "600px",
              left: '100px',
              fontWeight: 'bold'
            }}
          >
            You entered more notes than there are notes on Music Sheets
          </p>
        ) : null}
        {/* {musicSheet} */}
        <div
          style={{
            position: 'absolute',
            left: '0px',
            top: '30px',
            paddingRight: '200px'
          }}
        >
          {userNotesOnScreen}
          {scoreNotesOnScreen}
          {window.wrongNumberOfKeys}
        </div>

        {measureLine}
        <IonButton
          id='feedbackButton'
          className='feedbackButton'
          onClick={openNav3}
        >
          <div
            className='noteCheck2'
            style={{ color: 'white', fontSize: '45px' }}
          ></div>
        </IonButton>
      </div>
    </div>
  )
}

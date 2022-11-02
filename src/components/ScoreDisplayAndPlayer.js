import '../App.css'
import React, { useState, useEffect, useRef } from 'react'
import { OpenSheetMusicDisplay as OSMD } from 'osmd-extended'
import {
  PlaybackManager,
  LinearTimingSource,
  BasicAudioPlayer
} from 'osmd-extended'

import { AllDecksDict, AllDecksNoRepeatDict } from '../data/all_score_files'
import PlayerController from '../components/PlayerController'
import LetterSheetDetail from '../view/LetterSheetDetail'

const getPlaybackControl = osmd => {
  var timingSource = new LinearTimingSource()
  var playbackManager = new PlaybackManager(
    timingSource,
    undefined,
    new BasicAudioPlayer(),
    undefined
  )
  playbackManager.DoPlayback = true
  playbackManager.DoPreCount = false
  playbackManager.PreCountMeasures = 1 // note that DoPreCount has to be true for a precount to happen

  function initialize () {
    timingSource.reset()
    timingSource.pause()
    timingSource.Settings = osmd.Sheet.playbackSettings
    playbackManager.initialize(osmd.Sheet.musicPartManager)
    playbackManager.addListener(osmd.cursor)
    playbackManager.reset()
    osmd.PlaybackManager = playbackManager
  }

  return {
    playbackManager: playbackManager,
    initialize: initialize
  }
}

window.cursorNotes = []
function GetNotesUCur () {
  window.ResetOSMDCursor()
  // window.stop();
  let notesCurArr = new Array()
  let notesUnderCursor = new Array()
  let iterator = window.osmd.cursor.Iterator
  let rTime
  let cursorNotes = new Array()
  while (window.osmd.cursor.NotesUnderCursor().length > 0) {
    for (let i = 0; i < window.osmd.cursor.NotesUnderCursor().length; i++) {
      // if (window.osmd.cursor.NotesUnderCursor()[i].isRestFlag === false) {
      let note = window.osmd.cursor.NotesUnderCursor()[i]
      notesUnderCursor.push({
        n: note.halfTone + 12, // see issue #224
        // CORRECTION FOR ELISE REPEATS TO LONG AFTER JUMP
        //For Elise measure 7-9 937 ms, 22-24 1312
        // rT:
        //   note.sourceMeasure.MeasureNumberXML >= 9 &&
        //   note.sourceMeasure.MeasureNumberXML <= 23
        //     ? window.osmd.PlaybackManager.timingSource.getDurationInMs(
        //         iterator.currentTimeStamp
        //       ) - 749
        //     : note.sourceMeasure.MeasureNumberXML >= 24
        //     ? window.osmd.PlaybackManager.timingSource.getDurationInMs(
        //         iterator.currentTimeStamp
        //       ) - 1873
        //     : window.osmd.PlaybackManager.timingSource.getDurationInMs(
        //         iterator.currentTimeStamp
        //       ),
        rT:
          window.osmd.PlaybackManager.timingSource.getDurationInMs(
            iterator.currentTimeStamp
          ) - rTime,
        l: note.length.realValue,
        // v:
        //   window.osmd.cursor.iterator.activeDynamicExpressions[
        //     note.parentStaffEntry.parentStaff.id - 1
        //   ].soundDynamic / (127).toFixed(2),
        nM: note.sourceMeasure.MeasureNumberXML,
        sI: note.parentStaffEntry.parentStaff.id,
        iG: note.IsGraceNote,
        cL: parseInt(
          document
            .getElementById('cursorImg-0')
            .style.left.match(/[+-]?\d+(\.\d+)?/g)
            .join(''),
          10
        ),
        cT: parseInt(
          document
            .getElementById('cursorImg-0')
            .style.top.match(/[+-]?\d+(\.\d+)?/g)
            .join(''),
          10
        ),
        // cT: parseInt(
        //   document
        //     .getElementById('cursorImg-0')
        //     .style.top.match(/[+-]?\d+(\.\d+)?/g)
        //     .join(''),
        //   10
        // ),
        nPx: window.osmd.EngravingRules.GNote(
          note
        ).vfnote[0].note_heads[0].x.toFixed()
      })
      // }
      rTime = window.osmd.PlaybackManager.timingSource.getDurationInMs(
        iterator.currentTimeStamp
      )
    }
    notesCurArr.push(notesUnderCursor)
    notesUnderCursor = []
    window.osmd.cursor.next()
  }

  // return
  cursorNotes = notesCurArr
  window.cursorNotes = cursorNotes
  console.log(
    '🚀 ~ file: ScoreDisplayAndPlayer.js ~ line 414 ~ GetNotesUCur ~ window.cursorNotes',
    window.cursorNotes
  )
  window.ResetOSMDCursor()
  window.osmd.cursor.hide()
}
window.GetNotesUCur = GetNotesUCur

//testing counting non rest notes
function RemoveRestNotes (measureSelectedNotesLocal2) {
  let settings = JSON.parse(localStorage.getItem('settings'))
  settings['filterRestNotes'] = false
  localStorage.setItem('settings', JSON.stringify(settings))
  let filterOutRestMSN = []

  let shortFilterOutRestMSN = []

  for (let i = 0; i < measureSelectedNotesLocal2.length; i++) {
    for (let e = 0; e < measureSelectedNotesLocal2[i].length; e++) {
      if (measureSelectedNotesLocal2[i][e].n > 12) {
        shortFilterOutRestMSN.push(measureSelectedNotesLocal2[i][e])
      }
    }

    if (shortFilterOutRestMSN.length > 0) {
      filterOutRestMSN[filterOutRestMSN.length] = shortFilterOutRestMSN
      shortFilterOutRestMSN = []
    }
  }
  return filterOutRestMSN
}
window.RemoveRestNotes = RemoveRestNotes

const register_note_from_osmd = osmd => {
  if (osmd && osmd.cursor) {
    let iterator = osmd.cursor.Iterator

    var allNotes = []
    var allNotesWRest = []
    let calcTime = 0
    // let graphicNoteArr = osmd.cursor.GNotesUnderCursor();
    //how to target specific notes
    //     osmd.cursor.GNotesUnderCursor()[0].getSVGGElement().children[0].children[1].children[0].style.fill = 'white'
    // 'white'
    // osmd.cursor.GNotesUnderCursor()[0].getSVGGElement().children[0].children[2].children[0].style.fill = 'white'
    // 'white'
    // osmd.cursor.GNotesUnderCursor()[0].getSVGGElement().children[0].children[3].children[0].style.fill = 'white'
    // 'white'
    while (!iterator.EndReached) {
      const voices = iterator.CurrentVoiceEntries
      for (var i = 0; i < voices.length; i++) {
        const v = voices[i]
        const notes = v.Notes

        // const g = graphicNoteArr[i];
        // const gNotes = g;
        for (var j = 0; j < notes.length; j++) {
          const note = notes[j]
          // const gNote = gNotes[j];
          // make sure our note is not silent
          if (note != null) {
            // console.log(
            //   '🚀 ~ file: ScoreDisplayAndPlayer.js ~ line 75 ~ note',
            //   note
            // );
            allNotesWRest.push({
              note: note.halfTone + 12, // see issue #224
              time: iterator.currentTimeStamp.RealValue * 2,
              length: note.length.realValue,
              noteObject: note,

              noteMeasure: note.sourceMeasure.MeasureNumberXML
              // cursorLeft: parseFloat(
              //   document
              //     .getElementById('cursorImg-0')
              //     .style.left.match(/[+-]?\d+(\.\d+)?/g)
              //     .join(''),
              //   10
              // ),
            })
            calcTime = iterator.currentTimeStamp.RealValue * 2
          }
          if (note != null && note.halfTone != 0 && !note.isRest()) {
            allNotes.push({
              note: note.halfTone + 12, // see issue #224
              time: iterator.currentTimeStamp.RealValue,
              length: note.length.realValue,
              noteObject: note,
              noteMeasure: note.sourceMeasure.MeasureNumberXML
              // cursorLeft:
              // graphicNote: gNote,
            })
          }
        }
      }

      iterator.moveToNext()
    }
    window.allNotes = allNotes
    window.allNotesWRest = allNotesWRest
  }
}

window.register_note_from_osmd = register_note_from_osmd
// GET cursor left positions
// for (let i = 0; i < allNotesWRest.length; i++) {
//   window.osmd.PlaybackManager.setPlaybackStart(
//     allNotesWRest[i].noteObject.getAbsoluteTimestamp()
//   );
//   allNotesWRest[i].cursorLeft = parseFloat(
//     document
//       .getElementById('cursorImg-0')
//       .style.left.match(/[+-]?\d+(\.\d+)?/g)
//       .join(''),
//     10
//   );
// }
//Remove noteObject
// for (let i = 0; i < allNotesWRest.length; i++) {
//   allNotesWRest[i].noteObject = 'delete';
// }

// osmd.cursor.NotesUnderCursor()[2].parentStaffEntry.voiceEntries[0].graceNoteSlash WILL NEED TO DIFERENTIATE BETWEEN GRACE AND GRACE WITH SLASH (Appoggiatura and Acciaccatura)

let cursorData = {}
function CursorData () {
  cursorData = []
  cursorData.push({
    cT: parseInt(
      document
        .getElementById('cursorImg-0')
        .style.top.match(/[+-]?\d+(\.\d+)?/g)
        .join(''),
      10
    ),

    cL: parseInt(
      document
        .getElementById('cursorImg-0')
        .style.left.match(/[+-]?\d+(\.\d+)?/g)
        .join(''),
      10
    ),
    cW: document.getElementById('cursorImg-0').width,
    cH: parseInt(
      document
        .getElementById('cursorImg-0')
        .style.height.match(/[+-]?\d+(\.\d+)?/g)
        .join(''),
      10
    ),
    sW: document.getElementById('osmdSvgPage1').width.animVal.valueAsString,

    lM:
      window.osmd.Sheet.SourceMeasures[
        window.osmd.Sheet.SourceMeasures.length - 1
      ].MeasureNumberXML,
    bpm: window.osmd.PlaybackManager.currentMeasure.tempoInBPM
  })
  return cursorData
}
window.CursorData = CursorData
// console.log(cursorData);

export default function ScoreDisplayAndPlayer ({
  OSMDoptions,
  ScoreMetaData,
  measureStart,
  measureEnd,
  setMeasureStart,
  setMeasureEnd
}) {
  //----------------------------------Fluid Cursor
  // backup from player
  // let timeOutVar;
  // function StartCountdown() {
  //   if (playPauseIcon === false) {
  //     play();
  //   } else {
  //     StopStartTimer(true);

  //     CountdownStop();

  //     StopStartTimer(false);
  //     Countdown();
  //     // setTimeout(() => play(), 5000);
  //   }
  // }

  // function StopStartTimer(terminator) {
  //   if (playPauseIcon === false) {
  //     return;
  //   }
  //   if (terminator) {
  //     clearTimeout(timeOutVar);
  //   } else {
  //     // do something
  //     timeOutVar = setTimeout(function () {
  //       play();
  //     }, 5000);
  //   }
  // }

  // const play = () => {
  //   if (window.initialisePlayer === 0) {
  //     player.playbackManager.play();
  //     setTimeout(() => stop(), 300);
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
  //   }
  //   // window.startCursor();
  // };
  //-------------------------------------Fluid Cursor
  const [osmdSizeTrans, setOsmdSizeTrans] = useState(1)
  let uniqueKey = 0
  function UniqueKey () {
    uniqueKey++
    return uniqueKey
  }

  let cursorOnSVGScore = [
    <p
      key={UniqueKey()}
      id='cursorOnSVGScore'
      style={{
        position: 'absolute',
        top: '50px', //cursorData.default.cT * OsmdSize() - 20,

        left: '88px', //cursorData.default.cL * OsmdSize(),
        width: '3px', //cursorData.default.cW,
        height: '180px', //cursorData.default.cH + 40,
        display: 'block',
        backgroundColor: 'rgba(34, 255, 1, 0.1)',
        boxShadow: 'inset 0 0 7px #0f0',
        zIndex: -1,
        border:
          getDarkMode() === 'On' ? '0.1px solid white' : '0.1px solid black',
        margin: '0px',
        transformOrigin: '0% 0% 0px',
        transform: osmdSizeTrans
      }}
    ></p>
  ]

  //testing counting non rest notes
  // console.log(
  //   '🚀 ~ file: PianoController.js ~ line 221 ~ PianoController ~ GetNotesUCur',
  //   GetNotesUCur()
  // );

  // let measureSelectedNotes2;
  // setTimeout(() => (measureSelectedNotes2 = GetNotesUCur()), 1000);
  // console.log(
  //   '🚀 ~ file: PianoController.js ~ line 232 ~ PianoController ~ measureSelectedNotes2',
  //   measureSelectedNotes2
  // );

  function MyNamespace () {
    console.log(
      '🚀 ~ file: ScoreDisplayAndPlayer.js ~ line 503 ~ MyNamespace ~ MyNamespace issue is from this function, being unable to execute properly'
    )
    //   MoveCursors();
    //   // FluidCursorStart();
    //   // if (element.style.display === 'block') {
    //   //   imageOffset = 50 * cursorIndex + 100;
    //   //   element.scrollLeft = (imageOffset - 100) * getTranslatedNotesSize();
    //   //   document.getElementById('cursorOnTranslatedN').style.left =
    //   //     imageOffset + 'px';
    //   // }
    //   cursorIndex++;
    //   console.log(
    //     '🚀 ~ file: PianoController.js ~ line 171 ~ MyNamespace ~ cursorIndex',
    //     cursorIndex
    //   );
    // test acesing gNotes
    // for (let i = 0; i < window.osmd.cursor.GNotesUnderCursor().length; i++) {
    //   let currentId =
    //     window.osmd.cursor.GNotesUnderCursor()[i].vfnote[0].attrs.id;
    //   document.querySelector(
    //     `#vf-${currentId} > g.vf-note > g.vf-notehead > path`
    //   ).attributes.fill.nodeValue = 'white';
    // }
  }

  window.MyNamespace = MyNamespace
  //-------------------------------------Fluid Cursor
  //----------------------------------Fluid Cursor

  // console.log("ScoreDisplayAndPlayer: " + ScoreMetaData.deck_name);
  let settings = JSON.parse(localStorage.getItem('settings'))
  // const [scoreId, setScoreId] = useState(ScoreMetaData['id']);
  const [deckName, setDeckName] = useState(ScoreMetaData['deck_name'])

  if (settings['measureEnd'] === null) {
    settings['measureEnd'] = 1
    localStorage.setItem('settings', JSON.stringify(settings))
  }

  const refContainer = useRef()
  const [player, setPlayer] = useState(null)
  window.player = player
  const [osmd, set_osmd] = useState(null)
  const [osmd_init_done, set_osmd_init_done] = useState(false)
  const [osmd_update_done, set_osmd_update_done] = useState(false)

  const [loaded, setLoaded] = useState(false)

  function ResetOSMDCursor () {
    player.playbackManager.pause()
    player.playbackManager.reset()
  }
  window.ResetOSMDCursor = ResetOSMDCursor

  function getLastMeasure () {
    settings =
      JSON.parse(localStorage.getItem('settings')) === null
        ? {}
        : JSON.parse(localStorage.getItem('settings'))
    settings['numberOfMeasures'] =
      window.osmd.Sheet.SourceMeasures[
        window.osmd.Sheet.SourceMeasures.length - 1
      ].MeasureNumberXML
    localStorage.setItem('settings', JSON.stringify(settings))
  }

  useEffect(() => {
    // used to render osmd on score change
    setDeckName(ScoreMetaData['deck_name'])
    // setScoreId(ScoreMetaData['id']);
    // setMeasureStart(settings['measureStart']);
    // setMeasureEnd(settings['measureEnd']);
  }, [ScoreMetaData])

  // const updateId = () => {
  //   // setScoreId(0);
  //   player.initialize();
  //   set_osmd_update_done(false);
  // };
  // window.updateId = updateId;

  useEffect(() => {
    // window.scoreId = scoreId;
    // window.setScoreId = setScoreId;
    window.set_osmd_update_done = set_osmd_update_done
    window.deckName = deckName
    window.setDeckName = setDeckName

    // looking for score with given ID.
    let settings = JSON.parse(localStorage.getItem('settings'))
    // looking for score with given ID.
    const selected =
      settings['mesaureDistance'] === '1000'
        ? AllDecksDict[deckName]
        : AllDecksNoRepeatDict[deckName]
    if (!selected) {
      window.alert('deckName not found in DeckDict, fix bug!')
    }
    /*
      settings['mesaureDistance'] === '1000'
        ? AllDecks.filter((each) => each.deck_name == deckName)[0].entries[
            scoreId
          ]
        : AllDecksNoRepeat.filter((each) => each.deck_name == deckName)[0]
            .entries[scoreId];
    */
    window.selectedDeck = deckName
    /*
    let AllDecksDict = {};
    for (let i = 0; i < AllDecksNoRepeat.length; i++) {
      AllDecksDict[AllDecksNoRepeat[i].deck_name] = AllDecksNoRepeat[i].entries[0].filename;
    }
    console.log(AllDecksDict);*/

    var my_osmd = undefined
    if (osmd_init_done == false) {
      my_osmd = new OSMD(refContainer.current, OSMDoptions)
    } else if (osmd_update_done == false) {
      my_osmd = osmd
      set_osmd_update_done(true)
    }
    if (!my_osmd) {
      my_osmd = osmd
    }
    //"/assets/playthatsheet-Laboheme.musicxml"
    my_osmd.EngravingRules.VoiceSpacingMultiplierVexflow = 1
    my_osmd.EngravingRules.SetWantedStemDirectionByXml = false
    my_osmd.EngravingRules.UseJustifiedBuilder = false

    my_osmd
      .load(selected)
      .then(() => {
        my_osmd.setOptions({
          defaultColorRest: '#AAAAAA',
          fontSize: '10',
          drawTitle: false
        })

        my_osmd.setOptions({ FontStyles: 'italic', fontSize: '10' })
        let settings = JSON.parse(localStorage.getItem('settings'))
        // my_osmd.setOptions({ drawFromMeasureNumber: measureStart }); //settings['measureStart'] });
        // my_osmd.setOptions({ drawUpToMeasureNumber: measureEnd }); //settings['measureEnd'] });
        window.initialisePlayer = 0 //trying to fix player not playing few notes initialy
        // setTimeout(() => my_osmd.render(), 10);
        // my_osmd.zoom = 1;
        // my_osmd.sheet.Instruments[0].Transpose = -5;
        // my_osmd.updateGraphic();
        my_osmd.render()

        // setTimeout((100));
        if (my_osmd.cursor) {
          my_osmd.cursor.show()
        }
        setLoaded(true)
      })
      .then(() => {
        var my_player = getPlaybackControl(my_osmd)
        my_player.initialize()
        setPlayer(my_player)
        setTimeout(() => InitialiseFurther(), 500)
        setTimeout(() => register_note_from_osmd(my_osmd), 10)
      })
      .catch(e => {
        console.log('OSMD loading ERROR occured...', e)
      })

    function InitialiseFurther () {
      document.getElementsByClassName('loadingWindow2')[0].style.display =
        'none'
      setTimeout(() => getLastMeasure(), 500)
      // osmd.PlaybackManager.setPlaybackStart(
      //   osmd.Sheet.SourceMeasures[0].absoluteTimestamp
      // );
      // osmd.PlaybackManager.reset(); //these two lines reset cursor to current measure when drawUpToMeasureNumber is used
      // osmd.PlaybackManager.sf2Player = window.sf2;
      // window.FilterNotesPianoC();

      // window.CalculateNextTimePlay()
      // setTimeout(() => AddPaddingToCurrsor(), 1000);
      // setTimeout(() => FilterNotesPositionCursor(), 1000);
      setTimeout(() => GetNotesUCur(), 100)
      console.log(
        '🚀 ~ file: ScoreDisplayAndPlayer.js ~ line 567 ~ GetNotesUCur ~ window.cursorNotes',
        window.cursorNotes
      )
      // window.osmd.PlaybackManager.sf2Player = window.sf2;
      // getOsmdScaleAuto();
      window.StartExercise()
    }

    window.osmd = my_osmd
    set_osmd_init_done(true)
    set_osmd(my_osmd)
  }, [deckName])

  function FilterNotesPositionCursor () {
    let settings = JSON.parse(localStorage.getItem('settings'))
    if (settings['mesaureDistance'] != '1000') {
      let fisrtMeasureNumber =
        window.osmd.Sheet.sourceMeasures[0].MeasureNumberXML
      window.FilterNotesPianoC()

      window.osmd.PlaybackManager.setPlaybackStart(
        window.osmd.Sheet.SourceMeasures[
          settings['measureStart'] - fisrtMeasureNumber
        ].absoluteTimestamp
      )
      OsmdOverlays()
    }
  }

  let adjustPadingToOSMDScale = {
    0.4: 1.7,
    0.5: 1.7,
    0.6: 1.1,
    0.7: 1,
    0.8: 0.8,
    0.9: 0.8,
    '1.0': 0.6,
    1.1: 0.6,
    1.2: 0.5,
    1.3: 0.4,
    1.4: 0.4,
    1.5: 0.4,
    1.6: 0.4,
    1.7: 0.35,
    1.8: 0.35,
    1.9: 0.3,
    '2.0': 0.3
  }

  // function AddPaddingToCurrsor() {
  //   window.FilterNotesPianoC();
  //   // window.CalculateNextTimePlay()
  //   // player.playbackManager.reset();
  //   let settings = JSON.parse(localStorage.getItem('settings'));
  //   let scale = settings['osmdSize'];
  //   let themeColor = settings['darkMode'];
  //   if (window.osmd.graphic.drawer.backend.width + 200 > window.screen.width) {
  //     if (themeColor === 'On') {
  //       if (
  //         window.osmd.graphic.drawer.backend.width + 200 >
  //         window.screen.width
  //       ) {
  //         // document.getElementById('cursorImg-0').style.borderRight =
  //         //   window.innerWidth * adjustPadingToOSMDScale[scale] +
  //         //   'px solid rgb(30,30,30)';

  //         document.getElementById('cursorImg-0').style.borderRight =
  //           window.innerWidth * adjustPadingToOSMDScale[scale] +
  //           'px solid rgb(30,30,30)';
  //       }
  //     } else {
  //       if (
  //         window.osmd.graphic.drawer.backend.width + 200 >
  //         window.screen.width
  //       ) {
  //         // document.getElementById('cursorImg-0').style.borderRight =
  //         //   window.innerWidth * adjustPadingToOSMDScale[scale] +
  //         //   'px solid whiteSmoke';

  //         document.getElementById('cursorImg-0').style.borderRight =
  //           window.innerWidth * adjustPadingToOSMDScale[scale] +
  //           'px solid whiteSmoke';
  //       }
  //       // border-right: 1000px solid whitesmoke;
  //     }
  //   }
  // }

  // window.AddPaddingToCurrsor = AddPaddingToCurrsor;

  function getOSMDSizeScaleUser () {
    let settings = JSON.parse(localStorage.getItem('settings'))
    // setOsmdSizeTrans(1)
    setTimeout(() => {
      setOsmdSizeTrans('scale(' + settings['osmdSize'] + ')')
    }, 10)
  }
  window.getOSMDSizeScale = getOSMDSizeScaleUser

  let screenWidth = window.screen.width - 120

  // function getOsmdScaleAuto() {
  //   let settings = JSON.parse(localStorage.getItem("settings"));
  //   let scaleByHeight = (window.screen.height * 0.35) / parseInt(document.getElementById("cursorImg-0").style.height);
  //   settings['osmdScaleByHeight'] = scaleByHeight;
  //   localStorage.setItem("settings", JSON.stringify(settings));
  //   setTimeout(() => { setOsmdSizeTrans('scale(' + scaleByHeight + ')') }, 10);
  // }

  // get all notes to check it highest and lowest note in a score
  // let allNotesArray = [];
  // for (let i = 0; i < allNotes.length; i++) {
  //   allNotesArray.push(allNotes[i].note);
  // }
  // allNotesArray.sort();

  //   var c = document.getElementById("osmdSvgPage1");
  // var ctx = c.getContext("2d");
  // ctx.beginPath();
  // ctx.rect(20, 20, 150, 100);
  // ctx.fill();

  const [frontOSMDOverlay, setFrontOSMDOverlay] = useState('')

  const [rearOSMDOverlay, setRearOSMDOverlay] = useState('')
  const [scoreWidth, setScoreWidth] = useState('')
  const [overlayHeight, setOverlayHeight] = useState(
    window.innerHeight * settings['osmdSize']
  )

  // let overlayHeight = 500;
  function OsmdOverlays () {
    //  overlayHeight = window.innerHeight;
    document.getElementsByClassName('score3')[0].style.display = 'block'
    document.getElementsByClassName('score2')[0].style.display = 'block'
    let settings = JSON.parse(localStorage.getItem('settings'))
    setOverlayHeight(window.innerHeight * settings['osmdSize'])
    let osmdScale = parseFloat(settings['osmdSize'])
    if (settings['mesaureDistance'] === '1000') {
      document.getElementsByClassName('score3')[0].style.display = 'none'
      document.getElementsByClassName('score2')[0].style.display = 'none'
      return
    }
    // setTimeout(() =>
    let scaleFront = parseInt(
      document
        .getElementById('cursorImg-0')
        .style.left.match(/[+-]?\d+(\.\d+)?/g)
        .join(''),
      10
    )
    setFrontOSMDOverlay((scaleFront - 15) * osmdScale)

    CalcualteActiveCursorPos('lastNote') //position cursor to last note in order to take measurments
    let scaleRear = parseInt(
      document
        .getElementById('cursorImg-0')
        .style.left.match(/[+-]?\d+(\.\d+)?/g)
        .join(''),
      10
    )

    settings =
      JSON.parse(localStorage.getItem('settings')) === null
        ? {}
        : JSON.parse(localStorage.getItem('settings'))

    let measureEnd = parseInt(settings['measureEnd'])
    console.log(
      '🚀 ~ file: ScoreDisplayAndPlayer.js ~ line 393 ~ OsmdOverlays ~ measureEnd',
      measureEnd
    )
    let numberOfM = parseInt(settings['numberOfMeasures'])
    console.log(
      '🚀 ~ file: ScoreDisplayAndPlayer.js ~ line 395 ~ OsmdOverlays ~ numberOfM',
      numberOfM
    )
    if (measureEnd < numberOfM) {
      setRearOSMDOverlay((scaleRear + 45) * osmdScale)
      console.log('rearOSMDOverlay ' + rearOSMDOverlay)
      CalcualteActiveCursorPos('firstNote') // return cursor to first note
      let scaleScoreWidth = document.getElementById('osmdSvgPage1').width
        .animVal.valueInSpecifiedUnits
      setScoreWidth(scaleScoreWidth * osmdScale)
      console.log('scoreWidth ' + scoreWidth)
    } else {
      document.getElementsByClassName('score3')[0].style.display = 'none'
    }
    // setRearOSMDOverlay(document.getElementById('cursorImg-0').style.left)
  }
  window.OsmdOverlays = OsmdOverlays

  // function CalcualteActiveCursorPos(int, position) {
  //   console.log('test ' + window.measureSelectedNotes);
  //   let fisrtMeasureNumber =
  //     window.osmd.Sheet.sourceMeasures[0].MeasureNumberXML;
  //   let settings = JSON.parse(localStorage.getItem('settings'));
  //   window.osmd.PlaybackManager.setPlaybackStart(
  //     window.osmd.Sheet.SourceMeasures[
  //       settings[`measure${position}`] - fisrtMeasureNumber + int
  //     ].absoluteTimestamp
  //   );
  // }

  function CalcualteActiveCursorPos (position) {
    let firstNote = window.measureSelectedNotes[0].noteObject.getAbsoluteTimestamp()
    let lastNote = window.measureSelectedNotes[
      window.measureSelectedNotes.length - 1
    ].noteObject.getAbsoluteTimestamp()
    console.log('test  + window.measureSelectedNotes')
    // let fisrtMeasureNumber =
    //   window.osmd.Sheet.sourceMeasures[0].MeasureNumberXML;
    // let settings = JSON.parse(localStorage.getItem('settings'));
    let selectedNote = position === 'firstNote' ? firstNote : lastNote
    window.osmd.PlaybackManager.setPlaybackStart(selectedNote)
  }

  // setTimeout(() => {
  //   document.querySelectorAll('.score')[1].style.setProperty("--content: ' '; position: absolute; top: 0px; height: 100px; width: 200%; border-top: 400px blue solid; z-index: 9");
  // }, 1000);

  function getDarkMode () {
    let settings =
      JSON.parse(localStorage.getItem('settings')) === null
        ? {}
        : JSON.parse(localStorage.getItem('settings'))
    return settings['darkMode']
  }
  let sheetWidth = window.screen.width - 130
  console.log(
    '🚀 ~ file: ScoreDisplayAndPlayer.js ~ line 829 ~ sheetWidth',
    sheetWidth
  )
  //"Can't use Java 18.0.1.1 and Gradle 7.0 to import Gradle project android"
  return (
    <div
      className='score'
      id='score'
      style={{
        position: 'absolute',
        height: 'inherit',

        width: '100%'
      }} //need to check width issue, if width is less than 5000 score will not render
    >
      {/* <div
      // style={{
      //   transformOrigin: '0% 0% 0px',

      //   transform: osmdSizeTrans,
      //   zIndex: '9 !important',
      // }}
      >
        <LetterSheetDetail />
      </div> */}

      <div
        className='score2'
        id='score'
        style={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          width: frontOSMDOverlay,
          zIndex: 9,
          borderTop:
            getDarkMode() === 'On'
              ? overlayHeight + 'px rgb(30, 30, 30) solid'
              : '100vh rgb(244, 244, 244) solid',
          borderTop:
            getDarkMode() === 'On'
              ? overlayHeight + 'px rgb(30, 30, 30, .7) solid'
              : '100vh rgb(244, 244, 244, .7) solid'
        }}
      ></div>

      <div
        className='score3'
        id='score'
        style={{
          position: 'absolute',
          top: '0px',
          left: rearOSMDOverlay,
          width: scoreWidth + 'px',
          zIndex: 9,
          borderTop:
            getDarkMode() === 'On'
              ? overlayHeight + 'px rgb(30, 30, 30) solid'
              : '100vh rgb(244, 244, 244) solid',
          borderTop:
            getDarkMode() === 'On'
              ? overlayHeight + 'px rgb(30, 30, 30, .7) solid'
              : '100vh rgb(244, 244, 244, .7) solid'
        }}
      ></div>

      {loaded && <PlayerController player={player} />}

      <div
        // className="frontOSMDOverlay"
        style={{
          transformOrigin: '0% 0% 0px',
          width: '100%', //sheetWidth,
          // left: '65px',
          // right: '65px',
          transform: osmdSizeTrans,
          // marginRight: screenWidth,
          zIndex: -1
        }}
        ref={refContainer}
      />
      {cursorOnSVGScore}
    </div>
  )
}

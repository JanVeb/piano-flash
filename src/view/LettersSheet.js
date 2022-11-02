import '../App.css';
import React, { useState, useEffect } from 'react';

// !!!need this import, it apears its not used, but its used under window.MidiToNote, otherwise app doesnt work
import MidiToNote from '../data/MidiToNote';

export default function TranslateNotes() {
  const autoColorSet = {
    // color set from MuseScore Color notehead plugin version 1.1 by Werner Schweer and others
    C: '#BABD00', //"#eeee00",
    D: '#9b30ff',
    E: '#ee9a00',
    F: '#8b4513',
    G: '#ff0000',
    A: '#1e90ff',
    B: '#00ff00',
  };

  const TranslatedNotesSize = {
    0.4: 20,
    0.5: 30,
    0.6: 40,
    0.7: 50,
    0.8: 60,
    0.9: 70,
    '1.0': 80,
    1.1: 90,
    1.2: 100,
    1.3: 110,
    1.4: 120,
    1.5: 130,
    1.6: 140,
    1.7: 150,
    1.8: 160,
    1.9: 170,
    '2.0': 180,
  };

  function getTranslatedNotesScrollPosition() {
    let settings = JSON.parse(localStorage.getItem('settings'));
    return TranslatedNotesSize[settings['osmdSize']];
  }

  function OpenTranslateNotes() {
    if (
      document.getElementById('translateNotesWindow').style.display === 'block'
    ) {
      document.getElementById('translateNotesWindow').style.display = 'none';
      // window.scoreNotesOnScreen = [];
      // window.wrongNumberOfKeys = '';
    } else {
      setScoreNotesOnScreen([]);
      TranslateNotes();
      document.getElementById('translateNotesWindow').style.display = 'block';
      document.getElementById('translateNotesWindow').scrollTop =
        getTranslatedNotesScrollPosition();
      // getOsmdScale()
    }
  }

  var scoreNotesArr = [];

  let measureSelectedNotes = [];

  function arrayScoreNotes() {
    measureSelectedNotes = window.measureSelectedNotes;

    let shortScoreArr = [];

    for (let i = 0; i < measureSelectedNotes.length; i++) {
      if (i === 0) {
        shortScoreArr.push(measureSelectedNotes[i].note);
      } else {
        if (
          i >= 1 &&
          measureSelectedNotes[i].time === measureSelectedNotes[i - 1].time
        ) {
          shortScoreArr.push(measureSelectedNotes[i].note);
        } else {
          if (
            i >= 1 &&
            measureSelectedNotes[i].time !== measureSelectedNotes[i - 1].time
          ) {
            scoreNotesArr.push(shortScoreArr);
            shortScoreArr = [];
            shortScoreArr.push(measureSelectedNotes[i].note);
          } else {
          }
        }
      }
    }

    scoreNotesArr.push(shortScoreArr);

    MusicSheetLength();
    // return is_equal;
  }

  const [scoreNotesOnScreen, setScoreNotesOnScreen] = useState([]);
  const [measureLine, setMeasureLine] = useState([]);

  function TranslateNotes() {
    setScoreNotesOnScreen([]);
    setMeasureLine([]);

    arrayScoreNotes();

    let a = -1;
    for (var i = 0; i < scoreNotesArr.length; i++) {
      for (var e = 0; e < scoreNotesArr[i].length; e++) {
        a++;
        // let userMarginLeft = 60 + i * 80;
        let marginLeft = 70 + i * 50;

        // let checkColor = userColorMap[compareNotes[a]];
        // let checkColor = scoreNotesArr[i][e] === userNotesArray[i][e] ? "lime" : "red";

        // let userNote = window.midiToNote[userNotesArray[i][e]];
        let ScoreNote = window.midiToNote[scoreNotesArr[i][e]];

        let notePosition = {
          C: 170,
          D: 165,
          E: 160,
          F: 155,
          G: 150,
          A: 145,
          B: 140,
        };

        var getScoreLetter = ScoreNote[0];
        var getScoreNumber = ScoreNote[ScoreNote.length - 1];

        // var marginTopMS = notePosition[getLetter] + 65 - (getNumber * 35);
        let user_text_element;

        var scoreMarginTopMS;
        // var userMarginTopMS;
        //  let testMe2 =   `${ScoreNote}`.length;

        if (
          window.measureSelectedNotes[a].noteObject.parentStaffEntry.parentStaff.id ===
          2
        ) {
          scoreMarginTopMS =
            notePosition[getScoreLetter] + 130 - getScoreNumber * 35;
        } else {
          scoreMarginTopMS =
            notePosition[getScoreLetter] + 70 - getScoreNumber * 35;
        }
        let score_text_element = [];
        let grace1 = window.measureSelectedNotes[a].noteObject.IsGraceNote;
        let grace2 = !window.measureSelectedNotes[a + 1] || window.measureSelectedNotes[a].noteObject.IsGraceNote === false ? false : window.measureSelectedNotes[a + 1].noteObject.IsGraceNote;
        let grace3 = !window.measureSelectedNotes[a + 2] || window.measureSelectedNotes[a].noteObject.IsGraceNote === false ? false : window.measureSelectedNotes[a + 2].noteObject.IsGraceNote;
        let grace4 = !window.measureSelectedNotes[a + 3] || window.measureSelectedNotes[a].noteObject.IsGraceNote === false  ? false : window.measureSelectedNotes[a + 3].noteObject.IsGraceNote;
        let grace5 = !window.measureSelectedNotes[a + 4] || window.measureSelectedNotes[a].noteObject.IsGraceNote === false  ? false : window.measureSelectedNotes[a + 4].noteObject.IsGraceNote;

        score_text_element.push(
          <p
            style={{
              position: 'absolute',
              left: grace5 === true ? marginLeft + 25 + 'px' : grace4 === true ? marginLeft + 30 + 'px' : grace3 === true ? marginLeft + 35 + 'px' : grace2 === true ? marginLeft + 40 + 'px' : grace1 === true ? marginLeft + 45 + 'px' : marginLeft + 55 + 'px',
              color: autoColorSet[getScoreLetter],
              // color: "white",
              top: grace1 === true ? scoreMarginTopMS + 3 + 'px' : scoreMarginTopMS + 'px',
              fontWeight: 'bold',
              fontSize: grace1 === true ? '8px' : '10px',
            }}
          >
            {ScoreNote}
          </p>
        );



        setScoreNotesOnScreen((scoreNotesOnScreen) => [
          ...scoreNotesOnScreen,
          [score_text_element],
        ]);

        if (a + 1 < measureSelectedNotes.length) {
          if (
            measureSelectedNotes[a].noteObject.sourceMeasure
              .MeasureNumberXML !==
            measureSelectedNotes[a + 1].noteObject.sourceMeasure
              .MeasureNumberXML
          ) {
            let measureNumber =
              measureSelectedNotes[a].noteObject.sourceMeasure
                .MeasureNumberXML + 1; // used to position measure line numbers at middle of measure line

            let measureLineElem = [
              <p
                style={{
                  position: 'absolute',
                  top: '65px',
                  // left: marginLeft  + "px",
                  // height: "140px",
                  color: 'grey',
                  fontSize: '12px',
                  marginLeft:
                    measureNumber < 10
                      ? marginLeft + 75 + 'px'
                      : measureNumber < 100
                      ? marginLeft + 72 + 'px'
                      : marginLeft + 68 + 'px',
                }}
              >
                {measureSelectedNotes[a].noteObject.sourceMeasure
                  .MeasureNumberXML + 1}
              </p>,
              <p
                style={{
                  position: 'absolute',
                  top: '80px',
                  borderLeft: '1px solid grey',
                  height: '160px',
                  left: marginLeft + 78 + 'px',
                }}
              ></p>,
            ];
            setMeasureLine((measureLine) => [
              ...measureLine,
              [measureLineElem],
            ]);
          }
        }
      }
      document.getElementsByClassName('loadingWindow2')[0].style.display =
        'none';
    }

    // let user_text_element2 = (
    //   <p
    //     style={{
    //       position: "absolute",
    //       color: "red",
    //       marginBottom: "-100px",
    //       width: "600px",
    //       marginLeft: '100px'
    //     }}
    //   >
    //     You entered more notes than there are notes on Music Sheets
    //   </p>
    // );

    scoreNotesArr.clear();
  }

  let settings = JSON.parse(localStorage.getItem('settings'));
  let scoreElementsColor =
    settings['darkMode'] === 'On' ? 'whiteSmoke' : 'black';

  const [musicSheet, setMusicSheet] = useState(null);
  function MusicSheetLength() {
    let musicSheetLength = scoreNotesArr.length * 50 + 100;
    let mSVerticalPosition = 80;

    function MSHorLine(linePosition) {
      return (
        <p
          style={{
            position: 'absolute',
            top: mSVerticalPosition + linePosition + 'px',
            borderLeft: musicSheetLength + 'px solid grey',
            height: '0.1px',
            left: '20px',
          }}
        ></p>
      );
    }

    function MSVerLine(leftPosition) {
      return (
        <p
          style={{
            position: 'absolute',
            top: '80px',
            borderLeft: '0.1px solid grey',
            height: '161px',
            left: leftPosition + 'px',
          }}
        ></p>
      );
    }

    setMusicSheet([
      // <p style={{ position: 'absolute', top: mSVerticalPosition - 145 + 'px', left: '15px', color: "white", fontSize: '60px', fontWeight: 'lighter' }}></p>,

      // {/* <path stroke-width="0.3" fill="WhiteSmoke" stroke="none" stroke-dasharray="none" d="M18 54C-4.800000000000001 78.2,31.200000000000003 98.16499999999999,6 114.5C31.200000000000003 130.835,-4.800000000000001 150.8,18 175C-6 150.8,22.8 130.835,6 114.5C22.8 98.16499999999999,-6 78.2,18 54"></path>, */}

      MSVerLine(20),

      MSHorLine(0),
      MSHorLine(10),
      MSHorLine(20),
      MSHorLine(30),
      MSHorLine(40),

      MSHorLine(120),
      MSHorLine(130),
      MSHorLine(140),
      MSHorLine(150),
      MSHorLine(160),

      MSVerLine(musicSheetLength + 20),

      <p
        style={{
          position: 'absolute',
          top: mSVerticalPosition - 31 + 'px',
          left: '25px',
          color: scoreElementsColor,
          fontSize: '40px',
          fontWeight: 'lighter',
        }}
      >
        𝄞
      </p>,
      <p
        style={{
          position: 'absolute',
          top: mSVerticalPosition + 72 + 'px',
          left: '25px',
          color: scoreElementsColor,
          fontSize: '50px',
          fontWeight: 'lighter',
        }}
      >
        𝄢
      </p>,

      // <p style={{ position: 'absolute', top: '80px', borderLeft: '0.1px solid grey', height: '160px', left: musicSheetLength + 19 + 'px' }}></p>,
      <p
        style={{
          position: 'absolute',
          top: '60px',
          height: '140px',
          left: musicSheetLength + 50 + 'px',
          fontSize: 1,
          color: 'rgb(30, 30, 30)',
        }}
      >
        .
      </p>,
      <p
        style={{
          position: 'absolute',
          top: '220px',
          height: '140px',
          left: musicSheetLength + 50 + 'px',
          fontSize: 1,
          color: 'rgb(30, 30, 30)',
        }}
      >
        .
      </p>,
    ]);
  }

  window.MusicSheetLength = MusicSheetLength;

  window.OpenTranslateNotes = OpenTranslateNotes;

  // const [scaleTranslatedN, setScaleTranslatedN] = useState('scale(1)');
  // function ZoomTranslatedNotes() {
  //   // scaleTranslatedN = scaleTranslatedN * 0.1;
  //   setScaleTranslatedN('scale(2)');
  // }
  // window.ZoomTranslatedNotes = ZoomTranslatedNotes;

  // let cursorOnTranslatedN = new Array[<p> style={{position: 'absolute',
  //                                             left: '100px',
  //                                             top: '60px',
  //                                             color: 'rgba(34, 255, 1, 0.5)',
  //                                             width: '50px',
  //                                             height: '160px',

  // }}
  // </p>];

  let cursorOnTranslatedN = [
    <p
      id="cursorOnTranslatedN"
      style={{
        position: 'absolute',
        top: '80px',
        left: '100px',
        width: '45px',
        height: '160px',
        display: 'block',
        backgroundColor: 'rgba(34, 255, 1, 0.1)',
        boxShadow: 'inset 0 0 7px #0f0',
        zIndex: -1,
        border: '0.1px solid grey',
      }}
    ></p>,
  ];

  var imageOffset = 0;
  function moving_Image() {
    imageOffset += 50;
    document.getElementById('cursorOnTranslatedN').style.left =
      imageOffset + 'px';
  }
  window.moving_Image = moving_Image;

  // const [lettersSheetScale, setLettersSheetScale] = useState(1);
  // function getTranslatedNotesSizeScale() {
  //   let settings = JSON.parse(localStorage.getItem('settings'));
  //   setLettersSheetScale('scale(' + settings['osmdSize'] + ')');
  //   // return 'scale(' + settings["osmdSize"] + ')';
  // }

  // window.getTranslatedNotesSizeScale = getTranslatedNotesSizeScale;

  window.OpenTranslateNotes = OpenTranslateNotes;

  // function getOsmdScale() {
  //   let scaleByHeight = (window.screen.height * 0.35) / 161;

  //   setLettersSheetScale('scale(' + scaleByHeight + ')');
  // }
  return (
    <div>
      <div
        id="translateNotesWindow"
        className="translateNotesWindow"
        style={{
          position: 'absolute',
          left: '60px',
          top: '0px',
          backgroundColor:
            settings['darkMode'] === 'On' ? 'rgb(30, 30, 30)' : 'whiteSmoke',
        }}
      >
        <div
          id="translatedNotesPosition"
          style={{
            position: 'absolute',
            transformOrigin: '0% 0% 0px',
            // transform: lettersSheetScale
            transform: 'scale(' + settings['osmdSize'] + ')',
          }}
        >
          {musicSheet}
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: '30px',
            }}
          >
            {scoreNotesOnScreen}
          </div>
          {measureLine}
          {cursorOnTranslatedN}
        </div>
      </div>
    </div>
  );
}

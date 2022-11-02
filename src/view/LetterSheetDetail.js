// import '../App.css';
import React, { useState } from 'react';

export default function LetterSheetDetail() {
  // osmd.cursor.NotesUnderCursor()
  // let cursorLeft = await document.getElementById('cursorImg-0').style.left
  // let cursorTop = await document.getElementById('cursorImg-0').style.top
  const [cursorLeft, setCursorLeft] = useState(0);
  //   const [cursorWidth, setCursorWidth] = useState(0);
  let cursorWidth = 30;
  function SetLSDPosition() {
    let settings = JSON.parse(localStorage.getItem('settings'));
    let osmdSize = settings['osmdSize'];
    let cursorLeft = parseFloat(
      document
        .getElementById('cursorImg-0')
        .style.left.match(/[+-]?\d+(\.\d+)?/g)
        .join(''),
      10
    );
    // setCursorWidth(document.getElementById('cursorImg-0').width);
    setCursorLeft(cursorLeft * osmdSize - cursorWidth * osmdSize);
    // console.log(parseInt(document.getElementById('cursorImg-0').style.left.match(/[+-]?\d+(\.\d+)?/g).join(''), 10) + "  " +  document.getElementById('cursorImg-0').width)
  }
  window.SetLSDPosition = SetLSDPosition;

  //   const [scaleLSD, setScaleLSD] = useState(1);
  const [lsdLinesTop, setLsdLinesTop] = useState();
  const [lsdLinesBottom, setLsdLinesBottom] = useState(10);
  //   const [lsdLinesBottom, setLsdLinesBottom] = useState(10);
  const [osmdSize, setOsmdSize] = useState(10);
  //   const []

  function ScaleLSD() {
    let settings = JSON.parse(localStorage.getItem('settings'));
    setOsmdSize(settings['osmdSize']);
    // setScaleLSD('scale(' + osmdSize + ')');
    setLsdLinesTop(
      parseFloat(
        document
          .getElementById('cursorImg-0')
          .style.top.match(/[+-]?\d+(\.\d+)?/g)
          .join(''),
        10
      )
    );
    // document.getElementsByClassName('LetterSheetDetail')[0].style.top =
    //   lsdLinesTop * osmdSize;
  }

  window.ScaleLSD = ScaleLSD;

  function MSHorLine(linePosition) {
    return (
      <p
        style={{
          position: 'relative',
          top: linePosition + 'px',
          borderLeft: cursorWidth + 'px solid white',
          height: '1px',
          //   left: '20px',
          //   color: 'green',
          backgroundColor: 'white',
        }}
      ></p>
    );
  }

  //   const [musicSheet, setMusicSheet] = useState(null);

  let musicSheet = [
    MSHorLine(lsdLinesTop),
    MSHorLine(lsdLinesTop + 10),
    MSHorLine(lsdLinesTop + 20),
    MSHorLine(lsdLinesTop + 30),
    MSHorLine(lsdLinesTop + 40),

    MSHorLine(120),
    MSHorLine(130),
    MSHorLine(140),
    MSHorLine(150),
    MSHorLine(200),
  ];

  //   function GetOsmdSize() {
  //     let settings = JSON.parse(localStorage.getItem('settings'));
  //     return settings['osmdSize'];
  //   }

  return (
    <div style={{ display: 'flex' }}>
      <div
        className="LetterSheetDetail"
        style={{
          position: 'absolute',
          left: cursorLeft,
          top: lsdLinesTop * osmdSize,
          borderTop: '200px red solid',
          width: cursorWidth,
          // height: '200px',
          transformOrigin: '0% 0% 0px',

          transform: 'scale(' + osmdSize + ')',
          // zIndex: 10,
        }}
      >
        <div
          style={{
            position: 'relative',
            top: '-200px',
            // backgroundColor: 'blue',
            color: 'green',
            // transformOrigin: '0% 0% 0px',

            // transform: scaleLSD,
          }}
        >
          {musicSheet}
        </div>
      </div>
    </div>
  );
}

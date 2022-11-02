import React, { useState } from 'react';
import ForEliseScore from '../data/ForEliseSVG';
import './DrawSVGScore.css';
// import { ReactComponent as ForEliseSVG } from '../data/ForEliseSVG/forEliseSVG';
// const MenuIcon = (props) => (
//   <svg
//     xmlns="../data/ForEliseSVG.svg"
//     fill={props.fill}
//     className={props.class}
//   ></svg>
// );

// function myFunction() {
//   console.log('testSVG');
//   document.querySelector('#testSVG').classList.toggle('darkMode');
// }
let screenWidth = window.screen.width / 2 - 120;
export default function DrawSVGScore() {
  // let forEliseSVG;

  const [osmdSizeTrans, setOsmdSizeTrans] = useState(1);

  function getOSMDSizeScaleUser() {
    let settings = JSON.parse(localStorage.getItem('settings'));
    // setOsmdSizeTrans(1)
    setTimeout(() => {
      setOsmdSizeTrans('scale(' + settings['osmdSize'] + ')');
    }, 10);
  }
  window.getOSMDSizeScale = getOSMDSizeScaleUser;

  return (
    <div className="drawSVGScore" id="drawSVGScore">
      <div
        style={{
          // position: 'absolute',
          // left: '60px',
          // right: '60px',
          // overflow: 'scroll',
          // width: '100vh - 120px',
          transformOrigin: '0% 0% 0px',
          transform: osmdSizeTrans,
          // marginRight: screenWidth,
        }}
      >
        <ForEliseScore />
      </div>
    </div>
  );
}

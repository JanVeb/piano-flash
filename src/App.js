// import "./App.css";

import { React, useState } from 'react';
import InfoWindow from './view/InfoWindow';
import AdditionalButtons from './view/SplashScreen';
import Main from './pages/main';
// import FullScreenPiano from './components/FullScreenPiano';

// IMPORTANT DONT DELETE mobile device android enable on android app androidOrWeb
// import { StatusBar } from '@capacitor/status-bar';
// import {
//   NavigationBar,
//   NavigationBarPluginEvents,
// } from '@hugotomazi/capacitor-navigation-bar';
// import { TextZoom } from '@capacitor/text-zoom';

// function fullScreenCheck() {
//   if (document.fullscreenElement) {
//     return document.documentElement.requestFullscreen();
//   }
// }

// StatusBar.setOverlaysWebView({ overlay: true });
// const hideStatusBar = async () => {
//   TextZoom.set({ value: 1 }); //ignore accesibility text zoom option
//   await StatusBar.hide();
// };
// hideStatusBar();
// fullScreenCheck();
// window.screen.orientation.lock('landscape');
// NavigationBar.hide();

// StatusBar.hide();

// END mobile devices related packages that disable safari

// disable right click menu disabled during development othervise eenable androidOrWeb
// document.addEventListener(
//   'contextmenu',
//   (evt) => {
//     evt.preventDefault();
//   },
//   false
// );
// disable right click menu disabled during development othervise eenable

function getDarkMode() {
  let settings =
    JSON.parse(localStorage.getItem('settings')) === null
      ? {}
      : JSON.parse(localStorage.getItem('settings'));
  return settings['darkMode'];
}

function App() {
  const [darkMode, setDarkMode] = useState(getDarkMode());

  return (
    <div>
      <div>
        <AdditionalButtons />
        <InfoWindow />
      </div>

      <div
        style={{
          backgroundColor:
            darkMode === 'On' ? 'rgb(30, 30, 30)' : 'rgb(244, 244, 244)',
        }}
      >
        <Main darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </div>
  );
}
export default App;

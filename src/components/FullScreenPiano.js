import '../App.css';
import { React, useState } from 'react';

import PianoController from './PianoController';
import SoundFont2 from 'sf2-player';

const sf2 = new SoundFont2();

export default function FullScreenPiano() {
  const [soundFont, setSoundFont] = useState(false);

  sf2.loadSoundFontFromURL('assets/piano/Giga_Piano.sf2').then(() => {
    sf2.bank = sf2.banks[0].id;
    sf2.program = sf2.programs[0].id;
    setSoundFont(true);
  });

  window.sf2 = sf2;
  return (
    <div>
      {/* <PianoController firstNote="f4" secondNote="f7" soundFont={soundFont} />
      <PianoController firstNote="e1" secondNote="e4" soundFont={soundFont} /> */}
      <div
        className="ReactPiano__KeyboardFullScreen"
        style={{
          //   position: 'absolute',
          //   width: '50%',
          height: '10%',
        }}
      >
        <PianoController firstNote="f5" secondNote="e7" soundFont={soundFont} />
      </div>
      <PianoController firstNote="f3" secondNote="e5" soundFont={soundFont} />
      <PianoController firstNote="f1" secondNote="e3" soundFont={soundFont} />
    </div>
  );
}

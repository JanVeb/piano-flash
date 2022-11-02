import React from 'react';
import { noteOn, noteOff } from '../components/howlerFVPiano/HowlerFVPiano';

// import { loadSoundfont, startPresetNote } from 'sfumato';

// let presets = loadSoundfont('assets/piano/Fazioli Grand Piano .sf2');
// window.presets = presets;
// console.log('🚀 ~ file: SoundfontProvider.js ~ line 6 ~ presets', presets);
class SoundfontProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeAudioNodes: {},
      instrument: null,
    };
  }

  playNote = (midiNumber) => {
    // window.sf2.noteOn(midiNumber, 101, 0);

    noteOn(midiNumber);
    // if (loaded?.presets) {
    // console.log(
    //   '🚀 ~ file: SoundfontProvider.js ~ line 22 ~ SoundfontProvider ~ this.props.audioContext',
    //   this.props.audioContext
    // );
    // const stopHandle = startPresetNote(
    //   this.props.audioContext,
    //   0,
    //   midiNumber,
    //   setTimeout(() =>
    //     stopHandle((this.props.audioContext?.currentTime || 0) + 0.1)
    //   )
    // );
    // }
  };

  stopNote = (midiNumber) => {
    // window.sf2.noteOff(midiNumber, 101, 0);

    noteOff(midiNumber);
  };

  // Clear any residual notes that don't get called with stopNote
  stopAllNotes = () => {
    this.props.audioContext.resume().then(() => {
      const activeAudioNodes = Object.values(this.state.activeAudioNodes);
      activeAudioNodes.forEach((node) => {
        if (node) {
          node.stop();
        }
      });
      this.setState({
        activeAudioNodes: {},
      });
    });
  };

  render() {
    return this.props.render({
      isLoading: false,
      playNote: this.playNote,
      stopNote: this.stopNote,
      stopAllNotes: this.stopAllNotes,
    });
  }
}

export default SoundfontProvider;

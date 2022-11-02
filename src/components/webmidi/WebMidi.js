// import {WebMidi} from "webmidi";

// // export default function MidiController() {
// // WebMidi
// //   .enable()
// //   .then(onEnabled)
// //   .catch(err => console.log(err));

// // function onEnabled() {
// //   console.log('WebMIDI enabled!');
// //   const output = WebMidi.outputs[0]
// //   const channel = output.channels[1];
// //   console.log(channel);
// //   channel.playNote('C5', {duration: 5000})
// // }
// // }

// import { Component } from "react";
// import PropTypes from "prop-types";
// import { midiMessages } from "./constants";
// // import { WebMidi } from "WebMidi";
// window.WebMidi = WebMidi;
// // const {WebMidi} = require("webmidi");
// class MidiController extends Component {
//   state = {}
//   static propTypes = {
//     children: PropTypes.func,
//   }

//   constructor(props) {
//     super(props);
//   }

//   componentDidMount() {
//     this.requestMidiAccess();
//   }

//   componentWillUnmount() {
//     if (this.canAccessMidi) {
//       for (let input in this.inputs) {
//         this.inputs[input].removeListener("noteon", "all", this.handleNoteOn);
//         this.inputs[input].removeListener("noteoff", "all", this.handleNoteOff);
//       }
//       WebMidi.disable();
//     }
//   }

//   requestMidiAccess = () => {
//     WebMidi.enable(err => {
//       if (err) {
//         this.canAccessMidi = false;
//         alert("No midi support in your browser."); // eslint-disable-line
//       } else {
//         this.canAccessMidi = true;
//         this.initializeMidi();
//       }
//     });
//   }

//   initializeMidi = () => {
//     this.inputs = WebMidi.inputs;
//     for (let input in this.inputs) {
//       this.inputs[input].addListener("noteon", "all", this.handleNoteOn);
//       this.inputs[input].addListener("noteoff", "all", this.handleNoteOff);
//     }
//   }

//   handleNoteOn = (e) => {
//     this.setState({
//       midiMsg: {
//         type: midiMessages.NOTE_ON,
//         pitch: e.note.number,
//         velocity: e.rawVelocity,
//       },
//     });
//   }

//   handleNoteOff = (e) => {
//     this.setState({
//       midiMsg: {
//         type: midiMessages.NOTE_OFF,
//         pitch: e.note.number,
//         velocity: 0,
//       },
//     });
//   }

//   render() {
//     const { children } = this.props;
//     const { midiMsg } = this.state;

//     return (
//       children(midiMsg)
//     );
//   }
// }

// export default MidiController;

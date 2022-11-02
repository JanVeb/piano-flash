
// //   let nextTimePlay = []
// //   let cursorIndex = 0
// //   function CalculateNextTimePlay() {
// //     window.countPlayedNotes = []
// //     setTimeout(() => window.stopPlay = false, 550);
// //     cursorIndex = 0
// //     nextTimePlay = []
// // for (let i = 1; i < window.allNotesWRest.length; i++) {
// //   if (window.allNotesWRest[i - 1].time != window.allNotesWRest[i].time) {
// //     nextTimePlay.push(window.allNotesWRest[i].time)
// //   }
// // }
// // return nextTimePlay
// //   }


//   function NewPlay() {

//     if ( nextTimePlay === []) {
//       CalculateNextTimePlay()

//       // cursorIndex = 0
//     } else {
//       window.osmd.cursor.next()
//       if (channel => 14) {
//         channel = 0
//       } else {
//         channel++
//       }
//     }

    
//     let notesUnderCursor = window.osmd.cursor.NotesUnderCursor()
//     let playedNotes = []
//     let playedGraceNotes = []
//     let durationArr = []

//     for (let i = 0; i <  notesUnderCursor.length; i++) {
//       durationArr.push(notesUnderCursor[i].length.realValue * 1000)
//       if (notesUnderCursor[i].isRestFlag === false) {
//         if (notesUnderCursor[i].IsGraceNote === true) {
//           playedGraceNotes.push(notesUnderCursor[i])
//         } else {
// playedNotes.push(notesUnderCursor[i])
//       }
//     }
//   }

//   let nextPlayTime = window.tempo * Math.max(...durationArr);

//   if (cursorIndex <= nextTimePlay.length) {
//     if (window.stopPlay === false) {

//     let nextPlayTime = window.tempo * Math.max(...durationArr);

//     setTimeout(
//       () =>
//       // NewPlay(), ((nextTimePlay[cursorIndex] - nextTimePlay[cursorIndex - 1]) * 1000) / 2
//       NewPlay(), nextPlayTime
//     );
//     }
//   }

    

//     if (playedGraceNotes.length > 0) {
//   let i = 0;
//       PlayGraceNotes();
//       function PlayGraceNotes() {

//         window.sf2.noteOn(playedGraceNotes[i].halfTone + 12, 127, channel);
//         // console.log("🚀 ~ file: PlayerController.js ~ line 74 ~ PlayGraceNotes ~ playedGraceNotes[0]", playedGraceNotes[i].halfTone)
//         window.countPlayedNotes.push(playedGraceNotes[i].halfTone + 12)
//         setTimeout(
//           () =>
//         window.sf2.noteOff(playedGraceNotes[i].halfTone + 12), (playedGraceNotes[i].length.realValue * 1000) * window.tempo, 127, channel
//         );
//         if (playedGraceNotes[i].IsGraceNote) {
//         setTimeout(
//           () =>
//           PlayGraceNotes(), playedGraceNotes[i].length.realValue * window.tempo
//         );
//         i++
//         }
      
//       }

//     } else {
//     for (let i = 0; i < playedNotes.length; i++) {
//     window.sf2.noteOn(playedNotes[i].halfTone + 12, 127, channel);
//     window.countPlayedNotes.push(playedNotes[i].halfTone + 12)
//     setTimeout(
//       () =>
//     window.sf2.noteOff(playedNotes[i].halfTone + 12), (playedNotes[i].length.realValue * 1000) * window.tempo, 127, channel
//     );
//     }
//   }

  
//     if (cursorIndex <= nextTimePlay.length) {
//     if (window.stopPlay === false) {

//     // let nextPlayTime = window.tempo * Math.max(...durationArr);

//     // setTimeout(
//     //   () =>
//     //   // NewPlay(), ((nextTimePlay[cursorIndex] - nextTimePlay[cursorIndex - 1]) * 1000) / 2
//     //   NewPlay(), nextPlayTime = window.tempo * Math.max(...durationArr) * 2
//     // );
//     }
//   }
//     cursorIndex++
//   }

//   window.NewPlay = NewPlay;
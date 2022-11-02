import React, { useState, useEffect, ReactComponent, useRef } from 'react';
import { Howl, Howler, HowlerOptions } from 'howler';

// import forElise from './forElise';
// import notesArr from './notesArray';
let indexOfNotes = 0;
let previusNoteName;

var m21 = new Howl({ src: ['assets/GigaPianoWav/21.wav'] });
var m22 = new Howl({ src: ['assets/GigaPianoWav/22.wav'] });
var m23 = new Howl({ src: ['assets/GigaPianoWav/23.wav'] });
var m24 = new Howl({ src: ['assets/GigaPianoWav/24.wav'] });
var m25 = new Howl({ src: ['assets/GigaPianoWav/25.wav'] });
var m26 = new Howl({ src: ['assets/GigaPianoWav/26.wav'] });
var m27 = new Howl({ src: ['assets/GigaPianoWav/27.wav'] });
var m28 = new Howl({ src: ['assets/GigaPianoWav/28.wav'] });
var m29 = new Howl({ src: ['assets/GigaPianoWav/29.wav'] });
var m30 = new Howl({ src: ['assets/GigaPianoWav/30.wav'] });
var m31 = new Howl({ src: ['assets/GigaPianoWav/31.wav'] });
var m32 = new Howl({ src: ['assets/GigaPianoWav/32.wav'] });
var m33 = new Howl({ src: ['assets/GigaPianoWav/33.wav'] });
var m34 = new Howl({ src: ['assets/GigaPianoWav/34.wav'] });
var m35 = new Howl({ src: ['assets/GigaPianoWav/35.wav'] });
var m36 = new Howl({ src: ['assets/GigaPianoWav/36.wav'] });
var m37 = new Howl({ src: ['assets/GigaPianoWav/37.wav'] });
var m38 = new Howl({ src: ['assets/GigaPianoWav/38.wav'] });
var m39 = new Howl({ src: ['assets/GigaPianoWav/39.wav'] });
var m40 = new Howl({ src: ['assets/GigaPianoWav/40.wav'] });
var m41 = new Howl({ src: ['assets/GigaPianoWav/41.wav'] });
var m42 = new Howl({ src: ['assets/GigaPianoWav/42.wav'] });
var m43 = new Howl({ src: ['assets/GigaPianoWav/43.wav'] });
var m44 = new Howl({ src: ['assets/GigaPianoWav/44.wav'] });
var m45 = new Howl({ src: ['assets/GigaPianoWav/45.wav'] });
var m46 = new Howl({ src: ['assets/GigaPianoWav/46.wav'] });
var m47 = new Howl({ src: ['assets/GigaPianoWav/47.wav'] });
var m48 = new Howl({ src: ['assets/GigaPianoWav/48.wav'] });
var m49 = new Howl({ src: ['assets/GigaPianoWav/49.wav'] });
var m50 = new Howl({ src: ['assets/GigaPianoWav/50.wav'] });
var m51 = new Howl({ src: ['assets/GigaPianoWav/51.wav'] });
var m52 = new Howl({ src: ['assets/GigaPianoWav/52.wav'] });
var m53 = new Howl({ src: ['assets/GigaPianoWav/53.wav'] });
var m54 = new Howl({ src: ['assets/GigaPianoWav/54.wav'] });
var m55 = new Howl({ src: ['assets/GigaPianoWav/55.wav'] });
var m56 = new Howl({ src: ['assets/GigaPianoWav/56.wav'] });
var m57 = new Howl({ src: ['assets/GigaPianoWav/57.wav'] });
var m58 = new Howl({ src: ['assets/GigaPianoWav/58.wav'] });
var m59 = new Howl({ src: ['assets/GigaPianoWav/59.wav'] });
var m60 = new Howl({ src: ['assets/GigaPianoWav/60.wav'] });
var m61 = new Howl({ src: ['assets/GigaPianoWav/61.wav'] });
var m62 = new Howl({ src: ['assets/GigaPianoWav/62.wav'] });
var m63 = new Howl({ src: ['assets/GigaPianoWav/63.wav'] });
var m64 = new Howl({ src: ['assets/GigaPianoWav/64.wav'] });
var m65 = new Howl({ src: ['assets/GigaPianoWav/65.wav'] });
var m66 = new Howl({ src: ['assets/GigaPianoWav/66.wav'] });
var m67 = new Howl({ src: ['assets/GigaPianoWav/67.wav'] });
var m68 = new Howl({ src: ['assets/GigaPianoWav/68.wav'] });
var m69 = new Howl({ src: ['assets/GigaPianoWav/69.wav'] });
var m70 = new Howl({ src: ['assets/GigaPianoWav/70.wav'] });
var m71 = new Howl({ src: ['assets/GigaPianoWav/71.wav'] });
var m72 = new Howl({ src: ['assets/GigaPianoWav/72.wav'] });
var m73 = new Howl({ src: ['assets/GigaPianoWav/73.wav'] });
var m74 = new Howl({ src: ['assets/GigaPianoWav/74.wav'] });
var m75 = new Howl({ src: ['assets/GigaPianoWav/75.wav'] });
var m76 = new Howl({ src: ['assets/GigaPianoWav/76.wav'] });
var m77 = new Howl({ src: ['assets/GigaPianoWav/77.wav'] });
var m78 = new Howl({ src: ['assets/GigaPianoWav/78.wav'] });
var m79 = new Howl({ src: ['assets/GigaPianoWav/79.wav'] });
var m80 = new Howl({ src: ['assets/GigaPianoWav/80.wav'] });
var m81 = new Howl({ src: ['assets/GigaPianoWav/81.wav'] });
var m82 = new Howl({ src: ['assets/GigaPianoWav/82.wav'] });
var m83 = new Howl({ src: ['assets/GigaPianoWav/83.wav'] });
var m84 = new Howl({ src: ['assets/GigaPianoWav/84.wav'] });
var m85 = new Howl({ src: ['assets/GigaPianoWav/85.wav'] });
var m86 = new Howl({ src: ['assets/GigaPianoWav/86.wav'] });
var m87 = new Howl({ src: ['assets/GigaPianoWav/87.wav'] });
var m88 = new Howl({ src: ['assets/GigaPianoWav/88.wav'] });
var m89 = new Howl({ src: ['assets/GigaPianoWav/89.wav'] });
var m90 = new Howl({ src: ['assets/GigaPianoWav/90.wav'] });
var m91 = new Howl({ src: ['assets/GigaPianoWav/91.wav'] });
var m92 = new Howl({ src: ['assets/GigaPianoWav/92.wav'] });
var m93 = new Howl({ src: ['assets/GigaPianoWav/93.wav'] });
var m94 = new Howl({ src: ['assets/GigaPianoWav/94.wav'] });
var m95 = new Howl({ src: ['assets/GigaPianoWav/95.wav'] });
var m96 = new Howl({ src: ['assets/GigaPianoWav/96.wav'] });
var m97 = new Howl({ src: ['assets/GigaPianoWav/97.wav'] });
var m98 = new Howl({ src: ['assets/GigaPianoWav/98.wav'] });
var m99 = new Howl({ src: ['assets/GigaPianoWav/99.wav'] });
var m100 = new Howl({ src: ['assets/GigaPianoWav/100.wav'] });
var m101 = new Howl({ src: ['assets/GigaPianoWav/101.wav'] });
var m102 = new Howl({ src: ['assets/GigaPianoWav/102.wav'] });
var m103 = new Howl({ src: ['assets/GigaPianoWav/103.wav'] });
var m104 = new Howl({ src: ['assets/GigaPianoWav/104.wav'] });
var m105 = new Howl({ src: ['assets/GigaPianoWav/105.wav'] });
var m106 = new Howl({ src: ['assets/GigaPianoWav/106.wav'] });
var m107 = new Howl({ src: ['assets/GigaPianoWav/107.wav'] });
var m108 = new Howl({ src: ['assets/GigaPianoWav/108.wav'] });
var m109 = new Howl({ src: ['assets/GigaPianoWav/109.wav'] });
var m110 = new Howl({ src: ['assets/GigaPianoWav/110.wav'] });
var m111 = new Howl({ src: ['assets/GigaPianoWav/111.wav'] });
var m112 = new Howl({ src: ['assets/GigaPianoWav/112.wav'] });
var m113 = new Howl({ src: ['assets/GigaPianoWav/113.wav'] });
var m114 = new Howl({ src: ['assets/GigaPianoWav/114.wav'] });
var m115 = new Howl({ src: ['assets/GigaPianoWav/115.wav'] });
var m116 = new Howl({ src: ['assets/GigaPianoWav/116.wav'] });
var m117 = new Howl({ src: ['assets/GigaPianoWav/117.wav'] });
var m118 = new Howl({ src: ['assets/GigaPianoWav/118.wav'] });
var m119 = new Howl({ src: ['assets/GigaPianoWav/119.wav'] });
var m120 = new Howl({ src: ['assets/GigaPianoWav/120.wav'] });
var m121 = new Howl({ src: ['assets/GigaPianoWav/121.wav'] });
var m122 = new Howl({ src: ['assets/GigaPianoWav/122.wav'] });
var m123 = new Howl({ src: ['assets/GigaPianoWav/123.wav'] });
var m124 = new Howl({ src: ['assets/GigaPianoWav/124.wav'] });
var m125 = new Howl({ src: ['assets/GigaPianoWav/125.wav'] });
var m126 = new Howl({ src: ['assets/GigaPianoWav/126.wav'] });
var m127 = new Howl({ src: ['assets/GigaPianoWav/127.wav'] });

let midiToHowl = {
  21: m21,
  22: m22,
  23: m23,
  24: m24,
  25: m25,
  26: m26,
  27: m27,
  28: m28,
  29: m29,
  30: m30,
  31: m31,
  32: m32,
  33: m33,
  34: m34,
  35: m35,
  36: m36,
  37: m37,
  38: m38,
  39: m39,
  40: m40,
  41: m41,
  42: m42,
  43: m43,
  44: m44,
  45: m45,
  46: m46,
  47: m47,
  48: m48,
  49: m49,
  50: m50,
  51: m51,
  52: m52,
  53: m53,
  54: m54,
  55: m55,
  56: m56,
  57: m57,
  58: m58,
  59: m59,
  60: m60,
  61: m61,
  62: m62,
  63: m63,
  64: m64,
  65: m65,
  66: m66,
  67: m67,
  68: m68,
  69: m69,
  70: m70,
  71: m71,
  72: m72,
  73: m73,
  74: m74,
  75: m75,
  76: m76,
  77: m77,
  78: m78,
  79: m79,
  80: m80,
  81: m81,
  82: m82,
  83: m83,
  84: m84,
  85: m85,
  86: m86,
  87: m87,
  88: m88,
  89: m89,
  90: m90,
  91: m91,
  92: m92,
  93: m93,
  94: m94,
  95: m95,
  96: m96,
  97: m97,
  98: m98,
  99: m99,
  100: m100,
  101: m101,
  102: m102,
  103: m103,
  104: m104,
  105: m105,
  106: m106,
  107: m107,
  108: m108,
  109: m109,
  110: m110,
  111: m111,
  112: m112,
  113: m113,
  114: m114,
  115: m115,
  116: m116,
  117: m117,
  118: m118,
  119: m119,
  120: m120,
  121: m121,
  122: m122,
  123: m123,
  124: m124,
  125: m125,
  126: m126,
  127: m127,
};

// export default function HowlerPlay() {
//define the sounds

export function NotesToPlay(midi, dur, vol) {
  OsmdNoteOn(midi, dur, vol);
}

// window.NotesToPlay = NotesToPlay;

function OsmdNoteOn(n, dur) {
  let noteName;

  noteName = midiToHowl[n];
  noteName.volume(1);
  noteName.play();
  setTimeout(() => noteName.fade(1, 0, 2000), dur);

  //   window.MidiOutSelDev(n, dur, vol);
}

// play the first sound
export function noteOn(n) {
  let noteName;

  noteName = midiToHowl[n];
  noteName.volume(1);
  noteName.play();
  // setTimeout(() => noteName.fade(1, 0, 500), dur);
}

export function noteOff(n) {
  let noteName;

  noteName = midiToHowl[n];
  noteName.fade(1, 0, 500);
}

var coundown = new Howl({ src: ['assets/effects/countdown.mp3'] });
export function CountdownPlay() {
  coundown.volume(0.5);
  coundown.play();
}

export function CountdownStop() {
  coundown.stop();
}

var backTrack = new Howl({
  src: ['assets/backTracks/yellow_int_88_accomp.ogg'],
});
function GetBackTrackVol() {
  let settings =
    JSON.parse(localStorage.getItem('settings')) === null
      ? {}
      : JSON.parse(localStorage.getItem('settings'));
  let bTVol = settings['backTrackVol'];
  return bTVol;
}

export function BackTrackPlay() {
  backTrack.volume(GetBackTrackVol());
  backTrack.play();
}
export function BackTrackVol(vol) {
  backTrack.volume(vol);
}
window.BackTrackPlay = BackTrackPlay;
export function BackTrackStop() {
  backTrack.stop();
}
export function BackTrackPause() {
  backTrack.pause();
}

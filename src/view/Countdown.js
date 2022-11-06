var _pj

var audio_files,
  bar_per_minute,
  bars,
  beats_per_bar,
  seconds,
  seconds_per_bar,
  seconds_per_beat,
  tempo,
  time_signature,
  ttl_audio_plays

function _pj_snippets (container) {
  function in_es6 (left, right) {
    if (right instanceof Array || typeof right === 'string') {
      return right.indexOf(left) > -1
    } else {
      if (
        right instanceof Map ||
        right instanceof Set ||
        right instanceof WeakMap ||
        right instanceof WeakSet
      ) {
        return right.has(left)
      } else {
        return left in right
      }
    }
  }

  container['in_es6'] = in_es6
  return container
}

_pj = {}

_pj_snippets(_pj)

function play_audio (ttl_audio_plays) {
  for (var i = 0, _pj_a = ttl_audio_plays; i < _pj_a; i += 1) {
    if (i === ttl_audio_plays - 2) {
      console.log(audio_files[4])
    } else {
      if (i === ttl_audio_plays - 1) {
        console.log(audio_files[5])
      } else {
        if (i === beats_per_bar) {
          console.log(audio_files[0])
        } else {
          if (i === beats_per_bar + 1) {
            console.log(audio_files[1])
          } else {
            console.log(audio_files[i])
          }
        }
      }
    }
  }
}

audio_files = [
  'One.mp3',
  'Two.mp3',
  'Three.mp3',
  'Four.mp3',
  'Set.mp3',
  'Go.mp3'
]
time_signature = '4/4'
tempo = 88

try {
  console.log(`Time Signature: ${time_signature}`)
  console.log(`BPM: ${tempo}`)
  beats_per_bar = time_signature.rsplit('/', 1)
  beats_per_bar = Number.parseInt(beats_per_bar[0])
  console.log(`Beats per bar: ${beats_per_bar}
`)
  bar_per_minute = tempo / beats_per_bar
  console.log(`${bar_per_minute} bars per minute`)
  seconds = 60
  seconds_per_bar = seconds / bar_per_minute
  console.log(`${seconds_per_bar} seconds per bar`)
  seconds_per_beat = seconds_per_bar / beats_per_bar
  console.log(`Play audio file every ${seconds_per_beat} seconds
`)
} catch (e) {
  if (e instanceof ZeroDivisionError) {
    console.log('Time Signature cannot be zero!')
  } else {
    throw e
  }
}

console.log(`Audio files play: `)

if (_pj.in_es6(beats_per_bar, [3, 4])) {
  bars = 2
  ttl_audio_plays = beats_per_bar * bars
  play_audio(ttl_audio_plays)
} else {
  if (_pj.in_es6(beats_per_bar, [2, 6, 9, 12])) {
    ttl_audio_plays = 4
    play_audio(ttl_audio_plays)
  } else {
    if (_pj.in_es6(beats_per_bar, [5])) {
      ttl_audio_plays = 5
      play_audio(ttl_audio_plays)
    } else {
      if (_pj.in_es6(beats_per_bar, [7])) {
        ttl_audio_plays = 6
        play_audio(ttl_audio_plays)
      } else {
        if (beats_per_bar === 1) {
          beats_per_bar = 2
          ttl_audio_plays = 4
          play_audio(ttl_audio_plays)
        } else {
          ttl_audio_plays = 4
          play_audio(ttl_audio_plays)
        }
      }
    }
  }
}

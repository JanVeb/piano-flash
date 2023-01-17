import React, { useState } from 'react'
import { Howl } from 'howler'

var metronome = new Howl({
  src: [
    'assets/effects/drumsticks-pro-mark-la-special-2bn-hickory-no4-103712.mp3'
  ]
})
export default function MetronomeComp () {
  const [metronomeOn, setMetronomeOn] = useState(false)
  let metVar
  let metronomeOn2 = false
  function MetronomeStart () {
    if (metronomeOn2 === false) {
      metronomeOn2 = true
      MetronomePlay()
    } else {
      metronomeOn2 = false
      clearTimeout(metVar)
    }
  }

  function MetronomePlay () {
    metronome.volume(1)
    metronome.play()
    if (metronomeOn2 === true) {
      metVar = setTimeout(() => MetronomePlay(), 1000)
    }
  }

  return (
    <div>
      <button
        id='metronomeButton'
        className='metronomeButton'
        component='span'
        onClick={MetronomeStart}
      >
        Met
        {/* <div
          className='stopIcon'
          style={{ color: 'white !important', fontSize: '145px' }}
        ></div> */}
      </button>
    </div>
  )
}

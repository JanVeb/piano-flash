import React from 'react'
import './splashScreen.css'
// import { CompareArrows, Close } from '@material-ui/icons';

export default function AdditionalButtons ({ OpenTranslateNotes }) {
  window.OpenAdditionalButons = OpenAdditionalButons

  function OpenAdditionalButons () {
    if (
      document.getElementById('translateNotesWindow').style.display === 'none'
    ) {
      document.getElementById('myNav11').style.display = 'block'
    } else {
      document.getElementById('myNav11').style.display = 'none'
      document.getElementById('translateNotesWindow').style.display = 'none'
    }
  }

  function closeLetterSWarning () {
    document.getElementById('myNav11').style.display = 'none'
  }

  function closeSplashAn () {
    document.getElementsByClassName(
      'additionalButtonsWindow'
    )[0].style.display = 'none'
  }

  setTimeout(() => {
    maslacak()
  }, 100)
  function maslacak () {
    var canvas = document.querySelector('canvas')
    // canvas.style.background = 'linear-gradient( to bottom, #002172, #479CD5)'
    const randomInt = (min, max) =>
      Math.floor(Math.random() * (max - min) + min)
    // get canvas
    var _w, _h
    function refreshSize () {
      _w = canvas.width = window.innerWidth
      _h = canvas.height = window.innerHeight
    }
    refreshSize()
    // set width and height to canvas

    var c = canvas.getContext('2d')
    // get context now you can draw from here
    class Flower {
      constructor (x, y, radius) {
        this.x = x
        this.y = y
        this.radius = radius
        this.dx = 0.8 + Math.random() * 0.2
        this.fdx = Math.pow(this.dx, 150)
        this.radians = 0
      }
      draw () {
        let long = this.radius * 15

        let cutLong = long / 10
        c.beginPath()
        c.strokeStyle = '#fff'
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
        c.moveTo(this.x, this.y + this.radius)
        c.lineTo(this.x, this.y + long)
        c.stroke()
        c.beginPath()
        c.save()
        c.strokeStyle = '#725527'
        c.lineWidth = cutLong
        c.lineCap = 'round'
        c.moveTo(this.x, this.y + long - cutLong)
        c.lineTo(this.x, this.y + long + cutLong)
        c.stroke()
        c.restore()
        c.beginPath()
        c.save()
        c.globalAlpha = 0.5
        for (let i = 0.5; i < 5; i++) {
          c.moveTo(this.x, this.y)
          c.quadraticCurveTo(
            this.x + cutLong,
            this.y + cutLong,
            this.x + cutLong * i,
            this.y - cutLong * 1.5
          )
          c.moveTo(this.x, this.y)
          c.quadraticCurveTo(
            this.x - cutLong,
            this.y + cutLong,
            this.x - cutLong * i,
            this.y - cutLong * 1.5
          )
        }
        c.lineWidth = 1
        c.stroke()
        c.restore()
      }
      createFlower (array = []) {
        let i = array.indexOf(this)
        array.splice(i, 1)
        let x = 0
        let y = randomInt(-10, _h * 1.5)
        array.push(new Flower(x, y, this.radius))
      }
      update (array = []) {
        if (this.x - this.radius > _w) this.createFlower(array)
        this.radians += 0.01
        this.x += this.dx
        this.y += Math.cos(this.radians) - this.fdx
        this.draw()
      }
    }

    var flowers = []

    function init () {
      for (let i = 0; i < 100; i++) {
        let x = Math.random() * _w
        let y = randomInt(-10, _h * 1.5)
        flowers.push(new Flower(x, y, 1))
      }
    }
    init()
    // a IIFE

    function loop () {
      requestAnimationFrame(loop)
      refreshSize()
      flowers.forEach(f => f.update(flowers))
      if (
        document.getElementsByClassName('additionalButtonsWindow')[0].style
          .display === 'none'
      ) {
        //end loop when screen is closed
        return
      }
      // console.log('dandelion')
    }
    loop()
    // loop to animate
  }

  function getSplashScreenScale () {
    // let scaleByWidth = window.innerWidth / 290;
    // console.log("🚀 ~ file: SplashScreen.js ~ line 132 ~ getSplashScreenScale ~ scaleByWidth", scaleByWidth)
    // let scaleByHeight = window.innerHeight / 100;
    // console.log("🚀 ~ file: SplashScreen.js ~ line 133 ~ getSplashScreenScale ~ scaleByHeight", scaleByHeight)
    if (window.innerWidth > window.innerHeight) {
      let scaleByWidth = window.innerWidth / 290
      console.log(
        '🚀 ~ file: SplashScreen.js ~ line 137 ~ getSplashScreenScale ~ scaleByWidth',
        scaleByWidth
      )
      return 'scale(' + scaleByWidth + ')'
    } else {
      let scaleByWidth = window.innerHeight / 290
      console.log(
        '🚀 ~ file: SplashScreen.js ~ line 141 ~ getSplashScreenScale ~ scaleByWidth',
        scaleByWidth
      )
      return 'scale(' + scaleByWidth + ')'
    }

    // if (scaleByWidth > scaleByHeight) {
    //   return 'scale(' + scaleByWidth + ')';
    // } else {
    //   return 'scale(' + scaleByHeight + ')';
    // }
  }

  return (
    <div id='myNav11' className='additionalButtonsWindow'>
      <canvas></canvas>
      <div
        className='musicSheetSplash'
        style={{
          position: 'absolute',
          top: '10px',
          left: '20px',
          transformOrigin: '0% 0% 0px',
          transform: getSplashScreenScale(),
          fontWeight: 'bold',
          fontSize: '24px',
          maximumScale: 1,
          userScalable: 'no'
        }}
      >
        <p
          className='chime1'
          style={{
            position: 'fixed',
            left: '80px',
            top: '2px',
            color: '#ee9a00',
            textShadow: '30px black'
          }}
        >
          P
        </p>
        <p
          className='chime2'
          style={{
            position: 'fixed',
            left: '100px',
            top: '2px',
            color: '#ee9a00'
          }}
        >
          I
        </p>
        <p
          className='chime3'
          style={{
            position: 'fixed',
            left: '110px',
            top: '2px',
            color: '#ee9a00'
          }}
        >
          A
        </p>
        <p
          className='chime4'
          style={{
            position: 'fixed',
            left: '130px',
            top: '2px',
            color: '#ee9a00'
          }}
        >
          N
        </p>
        <p
          className='chime5'
          style={{
            position: 'fixed',
            left: '150px',
            top: '2px',
            color: '#ee9a00'
          }}
        >
          O
        </p>

        <p
          className='chime1'
          style={{
            position: 'fixed',
            left: '120px',
            top: '22px',
            color: '#BABD00'
          }}
        >
          F
        </p>
        <p
          className='chime2'
          style={{
            position: 'fixed',
            left: '140px',
            top: '22px',
            color: '#BABD00'
          }}
        >
          L
        </p>
        <p
          className='chime3'
          style={{
            position: 'fixed',
            left: '160px',
            top: '22px',
            color: '#BABD00'
          }}
        >
          A
        </p>
        <p
          className='chime4'
          style={{
            position: 'fixed',
            left: '180px',
            top: '22px',
            color: '#BABD00'
          }}
        >
          S
        </p>
        <p
          className='chime5'
          style={{
            position: 'fixed',
            left: '200px',
            top: '22px',
            color: '#BABD00'
          }}
        >
          H
        </p>

        <p
          className='chime1'
          style={{
            position: 'fixed',
            left: '150px',
            top: '42px',
            color: '#1e90ff'
          }}
        >
          C
        </p>
        <p
          className='chime2'
          style={{
            position: 'fixed',
            left: '170px',
            top: '42px',
            color: '#1e90ff'
          }}
        >
          A
        </p>
        <p
          className='chime3'
          style={{
            position: 'fixed',
            left: '190px',
            top: '42px',
            color: '#1e90ff'
          }}
        >
          R
        </p>
        <p
          className='chime4'
          style={{
            position: 'fixed',
            left: '210px',
            top: '42px',
            color: '#1e90ff'
          }}
        >
          D
        </p>
        <p
          className='chime5'
          style={{
            position: 'fixed',
            left: '230px',
            top: '42px',
            color: '#1e90ff'
          }}
        >
          S
        </p>

        <p
          className='chime1'
          style={{
            position: 'fixed',
            top: '4px',
            left: '77px',
            width: '20px',
            height: '84px',
            display: 'block',
            backgroundColor: 'rgba(34, 255, 1, 0.2)',
            boxShadow: 'inset 0 0 3px #0f0'
          }}
        ></p>
        <p
          style={{
            position: 'fixed',
            top: 6 + 'px',
            borderLeft: 12 + 'px solid white',
            height: '1px',
            left: '87px'
          }}
        ></p>

        <p
          style={{
            position: 'fixed',
            top: '6px',
            borderLeft: '1px solid white',
            height: '80px',
            left: '10px'
          }}
        ></p>

        <p
          style={{
            position: 'fixed',
            top: 6 + 'px',
            borderLeft: 250 + 'px solid white',
            height: '1px',
            left: '10px'
          }}
        ></p>
        <p
          style={{
            position: 'fixed',
            top: 26 + 'px',
            borderLeft: 250 + 'px solid white',
            height: '1px',
            left: '10px'
          }}
        ></p>
        <p
          style={{
            position: 'fixed',
            top: 46 + 'px',
            borderLeft: 250 + 'px solid white',
            height: '1px',
            left: '10px'
          }}
        ></p>
        <p
          style={{
            position: 'fixed',
            top: 66 + 'px',
            borderLeft: 250 + 'px solid white',
            height: '1px',
            left: '10px'
          }}
        ></p>
        <p
          style={{
            position: 'fixed',
            top: 86 + 'px',
            borderLeft: 250 + 'px solid white',
            height: '1px',
            left: '10px'
          }}
        ></p>
        <p
          style={{
            position: 'fixed',
            top: '6px',
            borderLeft: '1px solid white',
            height: '81px',
            left: 259 + 'px'
          }}
        ></p>

        <p
          className='chime1'
          style={{
            position: 'fixed',
            top: -30 + 'px',
            left: '15px',
            color: 'white',
            fontSize: '60px',
            fontWeight: 'lighter'
          }}
        >
          𝄞
        </p>
      </div>
      <button
        className='closeSplashAni'
        style={{
          position: 'fixed',
          right: '30px',
          top: '30px',
          // fontSize: "20px", //hide info button, as its set to position: fixed, it shows on piano keyboard
          color: 'white'
        }}
        onClick={() => {
          closeSplashAn()
        }}
      >
        {' '}
        {/* <Close /> mIcon */}
      </button>
    </div>
  )
}

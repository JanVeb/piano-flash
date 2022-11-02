import './About.css'
// import { Autorenew, Close } from '@material-ui/icons';

export default function AboutPage () {
  function openAbout () {
    if (
      document.getElementById('AboutPage').style.display === 'none' ||
      document.getElementById('AboutPage').style.display === ''
    ) {
      document.getElementById('AboutPage').style.display = 'block'
    } else {
      document.getElementById('AboutPage').style.display =
        'none' /** from 100% to 25% **/
    }
  }
  window.openAbout = openAbout

  function closeAboutPage () {
    document.getElementById('AboutPage').style.display =
      'none' /** from 100% to 25% **/
  }

  function OSMDlink () {
    window.open(
      'https://github.com/opensheetmusicdisplay/opensheetmusicdisplay'
    )
  }

  return (
    <div id='AboutPage' className='AboutPage'>
      <button
        className='aboutButton'
        style={{
          position: 'fixed',
          right: '10px',
          top: '10px',
          // fontSize: "20px", //hide info button, as its set to position: fixed, it shows on piano keyboard
          color: 'white'
        }}
        onClick={() => {
          closeAboutPage()
        }}
      >
        {' '}
        {/* <Close /> mIcon */}
      </button>
      <div
        style={{
          position: 'absolute',
          left: '30px',
          right: '30px',
          top: '20px',
          // fontSize: "20px", //hide info button, as its set to position: fixed, it shows on piano keyboard
          color: 'black'
        }}
      >
        <h3>Piano Flashcards</h3>{' '}
        <p>
          With Piano Flashcards you can learn to play and read Sheet Music with
          ease, few notes at the time. Scores can be sliced into measures, each
          part is then assigned its own Spaced Repetition track, where parts you
          are not so good at will be repeated more often, saving you time and
          improving your performance.
          <br></br>
          <br></br>
          The App in the background tracks your performance and lets you repeat
          previously learned material, at intervals which are designed to
          increase your learning speed. With an enriched environment within the
          Piano Flashcards App, you can start playing music from day one, while
          being able to see music represented in different ways, it will speed
          up your learning process. Every time we store new information in our
          brain, it gets cross-referenced with information that was learned
          previously or at the same time. It's called Associative Memory, which
          in practice means, the more data points we have about certain
          information, the faster it becomes to store and recollect this
          information.
        </p>
        <div style={{ display: 'flex' }}>
          <h3>Powered by</h3>
          <button
            style={{ marginLeft: '30px' }}
            className='menuButton'
            onClick={() => {
              OSMDlink()
            }}
          >
            Link to OSMD
          </button>
        </div>
        <p>
          OpenSheetMusicDisplay renders MusicXML sheet music in the browser. It
          is the missing link between MusicXML and VexFlow. Built upon many
          years of experience in both sheet music interactivity and engraving,
          it is the perfect solution for app developers seeking to build digital
          sheet music services.
        </p>
      </div>
    </div>
  )
}



export default function TestNote() {

    return (
        <div>
        <div style={{fontSize: '30px', margin: '20px'}} id="showNoteTimes" className="showNoteTimes">{window.logNoteTime}
        </div>
        <button style={{position: 'fixed', top: '300px', right: '20px'}} onClick={window.ResetNoteTime}>reset</button>
        </div>
    )
}
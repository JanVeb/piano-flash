export default function InfoWindow() {

function OpenInfoWindow() {
    document.getElementById("infoWindow").style.height = "0%";
}

return (
    <div id="infoWindow" className="infoWindow"
    style={{
      position: "flexible",
      marginTop: "0px",
      fontSize: "20px",
    }}
  >
      <p
      style={{
        marginLeft: "20px",
        color: "white",
      }}
    >
      Measure Numbers
      </p>
    <p
      style={{
        marginLeft: "20px",
        color: "white",
      }}
    >
      Score Notes
      </p>
    <p
      style={{
        marginLeft: "20px",
        color: "lime",
      }}
    >
      User Correct Notes
    </p>
    <p
      style={{
        marginLeft: "20px",
        color: "red",

      }}
    >
      User Incorrect Notes
    </p>
    <button    style={{
   
          position: "absolute",
            right: "30px",
            bottom: "30px", 
      }}
          className="menuButton"
          onClick={() => {
            OpenInfoWindow();
          }}
        >
          Close
        </button>
  </div>
)
    }


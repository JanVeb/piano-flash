import '../LoadingScreen.css';
import { React } from "react";

export default function LoadingWindow() {

    function LoadingText() {
        return (
            <div style={{ marginLeft: '10px', position: 'fixed', bottom: 0 }}>
                <p style={{ bottom: 0, fontSize: '16px' }}>Loading...</p>
                <p style={{ color: 'grey', fontSize: '16px' }}>{quotesList['from']}</p>
                <p style={{ fontSize: '16px' }}>{quotesList['text']}</p>
            </div>
        )
    }

    var loadingTextArray = window.quotesList;

    const data = require('../data/QuotesTest.json');

    function getRandomInt() {
        return Math.floor(Math.random() * Math.floor(data['entries'].length));
    }

    var quotesList = data['entries'][getRandomInt()]


    // const [randomColor, setRandomColor] = useState('blue');
    function bgcolor() {
        var colors = ["#eeee00",
            "#9b30ff",
            "#ee9a00",
            "#8b4513",
            "#ff0000",
            "#1e90ff",
            "#00ff00"];

        return colors[Math.floor(Math.random() * colors.length)]
    }

    window.bgcolor = bgcolor;

    let secretIndex = 0;
    function secretCloseLW() {
        secretIndex++
        if (secretIndex > 7) {
            document.getElementsByClassName('loadingWindow2')[0].style.display = 'none';
            secretIndex = 0;
        }
    }
    function getLoadingWindowScale() {
        let scaleByWidth = window.innerWidth / 920;
        let scaleByHeight = window.innerHeight / 340;
        if (scaleByWidth < scaleByHeight) {
          return 'scale(' + scaleByWidth + ')';
        } else {
          return 'scale(' + scaleByHeight + ')';
        }
      }

    return (
        <div id="loadingWindow1" className="loadingWindow2" meta charSet="UTF-8" >
<div style={{
            transformOrigin: '0% 0% 0px',
        transform: getLoadingWindowScale(),
        }}>

            <div class="muzieknootjes">
                <div style={{ color: bgcolor() }} class="noot-1">
                    &#9835;
                </div>
                <div style={{ color: bgcolor() }} class="noot-2">
                    &#9833;
                </div>
                <div style={{ color: bgcolor() }} class="noot-3">
                    &#9839;
                </div>
                <div style={{ color: bgcolor() }} class="noot-4">
                    &#9834;
                </div>
                <div style={{ color: bgcolor() }} class="noot-5">
                    𝄢
                </div>
                <div style={{ color: bgcolor() }} class="noot-6">
                    𝄞
                </div>
                <div style={{ color: bgcolor() }} class="noot-7">
                    𝄫
                </div>
                <div style={{ color: bgcolor() }} class="noot-8">

                    &#9833;
                </div>
                <div style={{ color: bgcolor() }} class="noot-9">
                    &#119056;
                </div>
                <div style={{ color: bgcolor() }} class="noot-10">
                    &#119046;
                </div>
                <div style={{ color: bgcolor() }} class="noot-11">
                    &#9834;
                </div>
                <div style={{ color: bgcolor() }} class="noot-12">
                    &#9836;
                </div>
                <div style={{ color: bgcolor() }} class="noot-13">
                    ♪
                </div>
                <div style={{ color: bgcolor() }} class="noot-14">
                    &#9836;
                </div>
                <div style={{ color: bgcolor() }} class="noot-15">
                    &#9834;
                </div>
                <div style={{ color: bgcolor() }} class="noot-16">
                    &#119046;
                </div>
                <div style={{ color: bgcolor() }} class="noot-17">
                    &#9833;
                </div>
                <div style={{ color: bgcolor() }} class="noot-18">
                    𝄞
                </div>
                <div style={{ color: bgcolor() }} class="noot-19">
                    𝄫
                </div>
                <div style={{ color: bgcolor() }} class="noot-20">
                    𝄢
                </div>
                <div style={{ color: bgcolor() }} class="noot-21">
                    &#9834;
                </div>
                <div style={{ color: bgcolor() }} class="noot-22">
                    &#9835;
                </div>
                <div style={{ color: bgcolor() }} class="noot-23">
                    &#9833;
                </div>
                <div style={{ color: bgcolor() }} class="noot-24">
                    ♪
                </div>
                <div style={{ color: bgcolor() }} class="noot-25">
                    &#9839;
                </div>


            </div>
            <h1>
                <span> <div style={{
                    position: 'absolute', left: '40px', top: '-200px'
                }}>

                    <p style={{ position: 'absolute', top: '20px', borderLeft: '1px solid white', height: '80px',  }}></p>
                    <p style={{ position: 'absolute', top: '20px', borderLeft: '1px solid white', height: '81px', left: 499 + 'px' }}></p>

                    <p style={{ position: 'absolute', top: 20 + 'px', borderLeft: 500 + 'px solid white', height: '1px',  }}></p>
                    <p style={{ position: 'absolute', top: 40 + 'px', borderLeft: 500 + 'px solid white', height: '1px',  }}></p>
                    <p style={{ position: 'absolute', top: 60 + 'px', borderLeft: 500 + 'px solid white', height: '1px',  }}></p>
                    <p style={{ position: 'absolute', top: 80 + 'px', borderLeft: 500 + 'px solid white', height: '1px',  }}></p>
                    <p style={{ position: 'absolute', top: 100 + 'px', borderLeft: 500 + 'px solid white', height: '1px',  }}></p>

                    <p style={{ position: 'absolute', top: -15 + 'px', left: '15px', color: "white", fontSize: '60px', fontWeight: 'lighter' }}>𝄞</p>


                    <p style={{ position: 'absolute', left: '80px', top: '85px', color: "#ee9a00" }}>E </p>
                    <p style={{ position: 'absolute', left: '120px', top: '65px', color: "#ff0000" }}>G</p>
                    <p style={{ position: 'absolute', left: '160px', top: '45px', color: "#00ff00" }}>B</p>
                    <p style={{ position: 'absolute', left: '200px', top: '25px', color: "#9b30ff" }}>D</p>
                    <p style={{ position: 'absolute', left: '240px', top: '5px', color: "#8b4513" }}>F</p>

                    <p style={{ display: 'flex', fontSize: '18px', position: 'absolute', top: 120 + 'px',  width: '500px' }}>
                        <span style={{ color: "#ee9a00" }}>Every </span>
                        <span style={{ position: 'relative', left: '5px', color: "#ff0000" }}>Good </span>
                        <span style={{ position: 'relative',  left: '10px', color: "#00ff00" }}>Boy </span>
                        <span style={{ position: 'relative', left: '15px', color: "#9b30ff" }}>Does </span>
                        <span style={{ position: 'relative', left: '20px', color: "#8b4513" }}>Fine </span>
                    </p>

                    <p style={{ position: 'absolute', left: '340px', top: '75px', color: "#8b4513", }}>F</p>
                    <p style={{ position: 'absolute', left: '380px', top: '55px', color: "#1e90ff" }}>A</p>
                    <p style={{ position: 'absolute', left: '420px', top: '35px', color: "#eeee00" }}>C</p>
                    <p style={{ position: 'absolute', left: '460px', top: '15px', color: "#ee9a00" }}>E</p>

                </div>
                </span>

                <span> <div style={{
                    position: 'absolute', top: '-80px', left: '330px',
                }}>

                    <p style={{ position: 'absolute', top: '20px', borderLeft: '1px solid white', height: '80px',  }}></p>
                    <p style={{ position: 'absolute', top: '20px', borderLeft: '1px solid white', height: '81px', left: 499 + 'px' }}></p>

                    <p style={{ position: 'absolute', top: 20 + 'px', borderLeft: 500 + 'px solid white', height: '1px',  }}></p>
                    <p style={{ position: 'absolute', top: 40 + 'px', borderLeft: 500 + 'px solid white', height: '1px',  }}></p>
                    <p style={{ position: 'absolute', top: 60 + 'px', borderLeft: 500 + 'px solid white', height: '1px',  }}></p>
                    <p style={{ position: 'absolute', top: 80 + 'px', borderLeft: 500 + 'px solid white', height: '1px',  }}></p>
                    <p style={{ position: 'absolute', top: 100 + 'px', borderLeft: 500 + 'px solid white', height: '1px',  }}></p>

                    <p style={{ position: 'absolute', top: -40 + 'px', left: '15px', color: "white", fontSize: '70px', fontWeight: 'lighter' }}>𝄢</p>

                    <p style={{ position: 'absolute', left: '80px', top: '85px', color: "#ff0000" }}>G </p>
                    <p style={{ position: 'absolute', left: '120px', top: '65px', color: "#00ff00" }}>B</p>
                    <p style={{ position: 'absolute', left: '160px', top: '45px', color: "#9b30ff" }}>D</p>
                    <p style={{ position: 'absolute', left: '200px', top: '25px', color: "#8b4513" }}>F</p>
                    <p style={{ position: 'absolute', left: '240px', top: '5px', color: "#1e90ff" }}>A</p>

                    <p style={{ display: 'flex', fontSize: '18px', position: 'absolute', top: 120 + 'px',  width: '500px' }}>
                        <span style={{ color: "#ff0000" }}>Good </span>
                        <span style={{ position: 'relative', left: '5px', color: "#00ff00" }}>Boys </span>
                        <span style={{ position: 'relative',  left: '10px', color: "#9b30ff" }}>Do </span>
                        <span style={{ position: 'relative', left: '15px', color: "#8b4513" }}>Fine </span>
                        <span style={{ position: 'relative', left: '20px', color: "#1e90ff" }}>Always </span>

                    </p>

                    <p style={{ fontSize: '18px', position: 'absolute', top: 120 + 'px', left: '320px' }}>
                        <span style={{ color: "#1e90ff" }}>All</span>
                        <span style={{ position: 'relative', left: '5px', color: "#eeee00" }}>Cows</span>
                        <span style={{ position: 'relative', left: '10px', color: "#ee9a00" }}>Eat</span>
                        <span style={{ position: 'relative', left: '15px', color: "#ff0000" }}>Grass</span>

                    </p>

                    <p style={{ position: 'absolute', left: '340px', top: '75px', color: "#1e90ff" }}>A</p>
                    <p style={{ position: 'absolute', left: '380px', top: '55px', color: "#eeee00" }}>C</p>
                    <p style={{ position: 'absolute', left: '420px', top: '35px', color: "#ee9a00" }}>E</p>
                    <p style={{ position: 'absolute', left: '460px', top: '15px', color: "#ff0000" }}>G</p>
                  

                </div>
                </span>

            </h1>

</div>


            {LoadingText()}
            <p style={{
                position: "fixed",
                // right: "30px",
                top: "0%",
                fontSize: "12px", //hide info button, as its set to position: fixed, it shows on piano keyboard
                color: 'black'

            }}
                onClick={() => {
                    secretCloseLW();
                }}
            >secret</p>
         
        </div>

    )
}

{/* ICONS Code

<div id="loadingWindow1" className="loadingWindow2" meta charSet="UTF-8">

<span> <div style={{
                    position: 'absolute', top: '150px',  left: '380px',
                    transformOrigin: '0% 0% 0px',

transform: 'Scale(3)'
                }}>

                    <p style={{ position: 'absolute', top: '20px', borderLeft: '1px solid black', height: '80px',  }}></p>


                    <p style={{ position: 'absolute', top: 20 + 'px', borderLeft: 140 + 'px solid black', height: '1px',  }}></p>
                    <p style={{ position: 'absolute', top: 40 + 'px', borderLeft: 140 + 'px solid black', height: '1px',  }}></p>
                    <p style={{ position: 'absolute', top: 60 + 'px', borderLeft: 140 + 'px solid black', height: '1px',  }}></p>
                    <p style={{ position: 'absolute', top: 80 + 'px', borderLeft: 140 + 'px solid black', height: '1px',  }}></p>
                    <p style={{ position: 'absolute', top: 100 + 'px', borderLeft: 140 + 'px solid black', height: '1px',  }}></p>

                    <p style={{ position: 'absolute', top: -244 + 'px',  color: "black", fontSize: '190px', fontWeight: 'lighter' }}>𝄞</p>


                    <p style={{ display: 'flex', fontSize: '30px', position: 'absolute', top: -20 + 'px', left: '0px', width: '500px', fontWeight: 'bold' }}>
                    <p style={{ position: 'absolute', left: '70px', top: '44px', color: "#8b4513" }}>F</p>
                    <p style={{ position: 'absolute', left: '90px', top: '24px', color: "#1e90ff" }}>A</p>
                    <p style={{ position: 'absolute', left: '110px', top: '4px', color: "#BABD00" }}>C</p>
                   
                    <p style={{ position: 'absolute', left: '130px', top: '-16px', color: "#ff0000" }}>E</p>
                    <p style={{ position: 'absolute', top: '-8px', borderLeft: '1px solid black', height: '81px', left: 150 + 'px' }}></p>
</p>
                </div>
                </span> 
                <p id="cursorOnTranslatedN" style={{ position: 'absolute', 
top: '233px', left: '650px', 
width: '65px', height: '245px', 
display: 'block', backgroundColor: 'rgba(34, 255, 1, 0.2)',
boxShadow: 'inset 0 0 3px #0f0'}}></p>
                </div> */}
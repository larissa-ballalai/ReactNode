import React, { Component } from "react";
import Structure from "./site-structure";
import MicRecorder from "mic-recorder-to-mp3";
import { Link } from "react-router-dom";
import Recording from "./recording";
import { motion} from 'framer-motion';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
export default class TesteDispositivo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: "",
      stop: "none",
      play: "block",
      player: "none",
      blob: null
    };
  }

  componentDidMount() {
    document.body.style.backgroundImage = "url('../img/fundoverde.png')";
    document.body.style.background =
      "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #7DE4C3 120.65%);";
  }

  start = () => {
    if (this.state.isBlocked) {
      alert("Permission to use microphone denied.");
    } else {
      Mp3Recorder.start()
        .then(() => {
          this.setState({ isRecording: true });
          document.getElementById("fadee").className =
            "fade opacity modal-backdrop show";
          this.controlvisibility("none", "block");
        })
        .catch((e) => console.error(e));
    }
  };

  stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        this.controlvisibility("block", "none");
        document.getElementById("fadee").className = "";
        this.setState({ blob: blob });

        const blobURL = URL.createObjectURL(blob);
        this.setState({ blobURL, isRecording: false });
      })
      .catch((e) => console.log(e));
  };

  controlvisibility = (state1, state2) => {
    this.setState({ play: state1 });
    this.setState({ stop: state2 });
    this.setState({ player: state1 });
  };

  render() {
    return (
      <Structure>
        <div className="text-center">
          <div className="card sha max-8 m-t-40">
            <div className=" bord-green card-body ">
              <img className="w-70" alt="" src="../img/aqnota.png" />
                <div className="mt3">
                  <div className="col-sm m-auto tstop cstop-g font36">
                    aprenda a usar o seu microfone
                  </div>
                  <div className="col-sm pt-3 m-auto st3 font-16">
                    Para testar se o seu microfone está funcionando e entender
                    como será a questão, aperte uma vez no botão, enquanto ele
                    estiver vermelho você está gravando. Clique novamente no botão
                    para enviar sua resposta.
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-11 m-auto">
                    <div className=" d-flex m-t-40">
                      <div onClick={this.start} className={" mic-b " + this.state.play}>
                        <svg width="5em" height="7em" viewBox="0 0 16 16" className="bi bi-mic-fill mic" fill="currentColor" xmlns="http://www.w3.org/2000/svg" >
                          <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
                          <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                        </svg>
                      </div>
                      <div onClick={this.stop} className={" " + this.state.stop}>
                        <div id="fadee">
                          <Recording type={"bars"} color={"red"} />
                          <div className=" m-t-xl stop txt-up bold text-center text-red">GRAVANDO</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              <br />
                <div className={"row justify-content-center " + this.state.player}>
                  <audio src={this.state.blobURL} controls="controls" />
                </div>
                  <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:3}}>
                    <div className="d-flex justify-content-center bd-highlight ">
                      <Link to="../warmup/9" className="btn-big gradient-green m-t-40">PROXIMO</Link>
                    </div>
                  </motion.div>
                  <img alt='' className="imggirl" src="../img/aqgirl.png" />
                  <img alt="" className="imgboy" src="../img/aqboy.png" />
              </div>
          </div>
          <div className="lousa"></div>
          <div className="lousa1 m-auto"></div>
        </div>
      </Structure>
    );
  }
}

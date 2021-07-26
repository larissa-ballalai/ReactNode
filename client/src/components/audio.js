import React, { Component } from "react";

export default class Audio extends Component {
  render() {
      return (
        <div className="row" key={"ad_" + this.props.audio.name}>
            <div className="col-md-6">
              <label> Sentence:</label>
              <div className="d-flex justify-content-between bd-highlight mb-3 ">
                <div className="d-flex">
                  <label for="audio">
                    <img className="up" alt="" src="../../img/uppink.png" />
                  </label>
                  <input placeholder="Upload audio " className="audio form-control m-r-10" htmlFor="audio" value={this.props.audio.name} disabled />
                  <input placeholder="Upload file" type="file" name="audio" id="audio" className="audio" onChange={this.props.addAudio}/>
                </div>                           
              </div>
            </div>
            <div className="m-t-10 col-sm">
                <figure>
                  <audio controls src={this.props.audio.blob}>
                    Your browser does not support the <code>audio</code> element.
                  </audio>
                </figure>
            </div>
        </div>
      );
  }
}

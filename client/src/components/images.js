import React, { Component } from "react";

export default class Images extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm ">
            <div className="form-group">
              <label>Setup multiple choice: </label> &nbsp;
              <span class="badge badge-pink m-b-20"> images </span>
              <div className="linha"></div>
            </div>
          </div>
        </div>
        <div className="row text-center  m-b-10">
          <div className="col-sm">
            <div className="col-sm">
              <label
                type="button"
                className="btn btn-outline-pink"
                for="arquivo">
                <img alt="" className="file" src="../../img/upfilepink.png" />
                Upload files
              </label>
              <input type="file" name="arquivo" id="arquivo" className="form-control py-1" onChange={this.props.addFiles} multiple />
            </div>
          </div> 
        </div>
        <div className="row">                         
          {(this.props.files || []).map((file) => (
              <div key={"rd_" + file.name} className=" col-md-4 card shadow p-1 m-1 mx-auto">
                <div className="d-flex justify-content-end bd-highlight">
                  <label className="custom-checkbox m-r-5">
                    <input className="checkk" type="checkbox" value={file.name} checked={this.props.values === file.name} onChange={() => this.props.onChangeValues(file.name)} />
                    <span className="checkmark"></span>
                  </label>
                </div>
                <img key={file.name} className="imgpreview  thumb-lg card-img-top img-fluid " src={file.blob} alt="..." />
                <div className="linha my-1"></div>

                <h4 class="card-title font-12 mb-0 mt-2 pl-2 text-dark">
                  {file.name}
                </h4>
                <div className=" m-auto">
                  <img className="m-b-5 m-t-10 cancelred buts" alt="" src="../../img/brocoli.png" key={"bt_" + file.name} onClick={() => this.props.deleteFile(file.name)} />
                </div>
              </div>
          ))}
        </div>
      </div>
    );
  }
}

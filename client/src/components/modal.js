import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class ModalMessage extends Component {
  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.hideModal}>
          <Modal.Header closeButton>
            <h5 className="modal-title m-t-0 text-black" id="exampleModalLongTitle"> Admin </h5>
          </Modal.Header>
          <Modal.Body>
            <p>{this.props.text}</p>
          </Modal.Body>
          <Modal.Footer>
            <Link className="btn btn-secondary waves-effect waves-light" to={this.props.redirect} >
              Close
            </Link>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

import React, { Component } from 'react';
import {
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    // console.log('Current State :', JSON.stringify(values));
    // alert('Current State :' + JSON.stringify(values));
    console.log('values :', values);
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  }

  render() {
    return (
      <div>
        {/* <a role="button" className="btn btn-success" onClick={CommentForm}>
          <i className="fa fa-pencil"></i> Submit Comment
        </a> */}
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)} md={12}>
              <Label htmlFor="rating" md={2}>
                Rating
              </Label>
              <Row className="form-group">
                <Col md={10}>
                  <Control.select
                    model=".rating"
                    className="form-control"
                    defaultValue="1"
                    className="form-control"
                    placeholder="Rating"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Label htmlFor="author">Your Name</Label>
              <Row className="form-group">
                <Col md={10}>
                  <Control.text
                    model=".author"
                    className="form-control"
                    id="author"
                    name="author"
                    placeholder="Author"
                    validators={{
                      required,
                      minLength: minLength(2),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less',
                    }}
                  />
                </Col>
              </Row>
              <Label for="comment">Comment</Label>
              <Row className="form-group">
                <Col md={10}>
                  <Control.textarea
                    model=".comment"
                    rows="12"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{ size: 10, offset: 2 }}>
                  <Button
                    type="submit"
                    color="primary"
                    //   onClick={() => {
                    //     this.setState({
                    //       isModalOpen: !this.state.isModalOpen,
                    //     });
                    //   }}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default CommentForm;

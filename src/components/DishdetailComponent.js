import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import CommentForm from './CommentForm';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

function RenderDish({ dish }) {
  return (
    <div className="col-12  col-md-5 mt-1">
      {console.log('dish', dish)}
      {dish ? (
        <FadeTransform
          in
          transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)',
          }}
        >
          <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </FadeTransform>
      ) : (
        <div></div>
      )}
    </div>
  );
}

// function CommentForm() {
//   const [isModalOpen, setisModalOpen] = useState(false);

//   return (
//     <Modal isOpen={isModalOpen} toggle={() => setisModalOpen((v) => !v)}>
//       <ModalHeader toggle={() => setisModalOpen((v) => !v)}>Login</ModalHeader>
//       <ModalBody>
//         <Form onSubmit={this.handleLogin}>
//           <FormGroup>
//             <Label htmlFor="username">UserName</Label>
//             <Input
//               type="text"
//               id="username"
//               name="username"
//               innerRef={(input) => (this.username = input)}
//             />
//           </FormGroup>
//           <FormGroup>
//             <Label htmlFor="password">Password</Label>
//             <Input
//               type="password"
//               id="password"
//               name="password"
//               innerRef={(input) => (this.password = input)}
//             />
//           </FormGroup>
//           <FormGroup check>
//             <Label check>
//               <Input
//                 type="checkbox"
//                 name="remember"
//                 innerRef={(input) => (this.remember = input)}
//               />
//               Remember Me
//             </Label>
//           </FormGroup>
//           <Button type="submit" value="submit" className="bg-primary">
//             Login
//           </Button>
//         </Form>
//       </ModalBody>
//     </Modal>
//   );
// }

function RenderComments({ comments, postComment, dishId }) {
  return (
    <div>
      {comments ? (
        <div className="col-12  col-md-5 mt-1">
          <h4>Comments</h4>
          <Stagger in>
            {comments.map((comment) => {
              return (
                <div>
                  <Fade in>
                    <li key={comment.id}>
                      <div className="mt-2">{comment.comment}</div>
                      <div className="mt-2">
                        -- {comment.author},
                        {new Intl.DateTimeFormat('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: '2-digit',
                        }).format(new Date(Date.parse(comment.date)))}
                      </div>
                    </li>
                  </Fade>
                </div>
              );
            })}
          </Stagger>
          <CommentForm dishId={dishId} postComment={postComment} />
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null)
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            {console.log('props.dish.name :', props.dish)}
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        {/* {dish ? ( */}
        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComments
            comments={props.comments}
            postComment={props.postComment}
            dishId={props.dish.id}
          />
        </div>
        {/* // ) : ( // <div></div>
        // )} */}
      </div>
    );
};

export default DishDetail;

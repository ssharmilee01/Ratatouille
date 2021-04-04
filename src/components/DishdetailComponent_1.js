import { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderComments(dish) {
    return (
      <div>
        {dish
          ? dish.comments.map((comment) => {
              return (
                <div>
                  <h4>Comments</h4>
                  <div className="mt-2">{comment.comment}</div>
                  <div className="mt-2">
                    -- {comment.author},{' '}
                    {new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                    }).format(new Date(Date.parse(comment.date)))}
                  </div>
                </div>
              );
            })
          : ''}
      </div>
    );
  }
  render() {
    const { dish } = this.props;
    console.log('Selected Dish : ', this.props.dish);
    return (
      <div className="container">
        <div className="row">
          <div className="col-12  col-md-5 mt-1">
            {dish ? (
              <Card>
                <CardImg
                  width="100%"
                  object
                  src={dish.image}
                  alt={dish.name}
                ></CardImg>
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
              </Card>
            ) : (
              <div></div>
            )}
          </div>
          <div className="col-12  col-md-5 mt-1">
            {dish !== null ? this.renderComments(dish) : <div></div>}
          </div>
        </div>
      </div>
    );
  }
}

export default DishDetail;

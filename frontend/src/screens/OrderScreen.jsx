import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem, } from "react-bootstrap";
import { useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const { data: order, isLoading, error, refetch, } = useGetOrderDetailsQuery(orderId);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger" />
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong> {order.user.email}
              </p>
              <p>
                <strong>Address: </strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                </p>
                {order.isPaid ? (
                    <Message variant="success">
                        Paid on {order.paidAt}
                    </Message>
                ) : (
                    <Message variant="danger">
                        Not Paid
                    </Message>
                )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              { order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index} >
                    <Row>
                      <Col md={1} >
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
  
                      <Col>
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>
                      </Col>
  
                      <Col md={4}>
                        {item.qty} x {item.price} = <i class="fa fa-inr"></i> {(item.qty * (item.price * 100)) / 100}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush" >
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col><i class="fa fa-inr"></i> {order.itemsPrice}</Col>
                </Row>

                <Row>
                  <Col>Shipping</Col>
                  <Col><i class="fa fa-inr"></i> {order.shippingPrice}</Col>
                </Row>

                <Row>
                  <Col>Tax</Col>
                  <Col><i class="fa fa-inr"></i> {order.taxPrice}</Col>
                </Row>

                <Row>
                  <Col>Total</Col>
                  <Col><i class="fa fa-inr"></i> {order.totalPrice}</Col>
                </Row>

              </ListGroup.Item>
              {/* Pay order placeholder */}
              {/* Mark as delivered playholder */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
// import axios from "axios";

import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";

const ProductScreen = () => {
  // const [product, setProduct] = useState({});

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const { data } = await axios.get(`/api/products/${productId}`);
  //     setProduct(data);
  //   };
  //   fetchProduct();
  // }, [productId]); //productId here is dependency here

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  
  const { id: productId } = useParams();
  
  // Using Redux Toolkit for fetching data & handling try catch
  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
  
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      { isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
         <Row>
         <Col md={5}>
           <Image src={product.image} alt={product.name} fluid />
         </Col>

         <Col md={4}>
           <ListGroup variant="flush">
             <ListGroup.Item>
               <h3>{product.Item}</h3>
             </ListGroup.Item>
             <ListGroup.Item>
               <Rating
                 value={product.rating}
                 text={`${product.numReviews} reviews`}
               />
             </ListGroup.Item>
             <ListGroup.Item>Price: <i class="fa fa-inr"></i> {product.price}</ListGroup.Item>

             {/* Product Description */}
             <ListGroup.Item>Description: {product.description}</ListGroup.Item>
           </ListGroup>
         </Col>

         <Col md={3}>
           <Card>
             <ListGroup variant="flush">

               {/* For displaying Price of the item */}
               <ListGroup.Item>
                 <Row>
                   <Col>Price:</Col>
                   <Col>
                     <strong><i class="fa fa-inr"></i> {product.price}</strong>
                   </Col>
                 </Row>
               </ListGroup.Item>
               
               {/* For displaying Availability */}
               <ListGroup.Item>
                 <Row>
                   <Col>Status:</Col>
                   <Col>
                     <strong>
                       {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                     </strong>
                   </Col>
                 </Row>
               </ListGroup.Item>

                {/* Quantity Selector */}
                {product.countInStock > 0 &&  (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                      <Form.Control as="select" value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                        {/* Creating an array with length of quantity available in stock */}
                        {[...Array(product.countInStock).keys()].map((x) => (                     
                          <option key={ x + 1} value={ x +1 }>
                            { x + 1}
                          </option>
                        ))}         
                      </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                
               {/* For Add to Cart button */}
               <ListGroup.Item>
                 <Button
                   className="btn-block"
                   type="button"
                   disabled={product.countInStock === 0}
                   onClick={addToCartHandler}
                 >
                   Add To Cart
                 </Button>
               </ListGroup.Item>
             </ListGroup>
           </Card>
         </Col>
       </Row>
      )}

     
    </>
  );
};

export default ProductScreen;

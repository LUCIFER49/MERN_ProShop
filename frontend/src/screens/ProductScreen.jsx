// import { useState, useEffect } from "react";
// import axios from "axios";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";

const ProductScreen = () => {
  // const [product, setProduct] = useState({});

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const { data } = await axios.get(`/api/products/${productId}`);
  //     setProduct(data);
  //   };
  //   fetchProduct();
  // }, [productId]); //productId here is dependency here

  const { id: productId } = useParams();

  // Using Redux Toolkit for fetching data & handling try catch
  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

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
             <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
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
               {/* For Add to Cart button */}
               <ListGroup.Item>
                 <Button
                   className="btn-block"
                   type="button"
                   disabled={product.countInStock === 0}
                 >
                   {" "}
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

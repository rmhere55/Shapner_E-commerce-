import { useContext } from 'react';
import productsArr from '../../assets/products';
import { Button, Container, Row, Col, Nav } from 'react-bootstrap';
import cartContext from '../Store/cartContext';
import { NavLink, Navigate } from 'react-router-dom';
import { authContext } from '../Store/authContext';

export default function Products() {
  const { addToCart } = useContext(cartContext);
  const { token } = useContext(authContext);

  console.log(token);

  const handleClick = (product) => {
    addToCart(product);
  };

  return (
    <Container>
      { !token && <Navigate to="/login" replace /> }
      <h2 className="text-center my-4">Music</h2>
      <Row className="justify-content-center">
        {productsArr.map((product) => (
          <Col key={product.id} xs={12} md={6} lg={6} className="d-flex flex-column align-items-center mb-4">
            <Nav.Link as={NavLink} to={"/store/" + product.id}>
              <h4 className="text-center">{product.title}</h4>
              <img src={product.imageUrl} alt={product.title} className="img-fluid" />
              <div className="d-flex justify-content-between w-50 align-items-center mt-2">
                <span>${product.price}</span>
                <Button
                  variant="info"
                  className="text-light"
                  onClick={() => handleClick(product)}
                >
                  Add to Cart
                </Button>
              </div>
            </Nav.Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

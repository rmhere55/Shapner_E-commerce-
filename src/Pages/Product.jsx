import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import productsArr from "../assets/products";


export default function Product() {
    const { id: productId } = useParams()
    const product = productsArr.find(product => product.id == productId)

    return (
        <Container className="my-4">
            
            <h2 className="text-center my-4">Product Detail</h2>
            <Row>
                <Col sm={4}>
                    <img src={product.imageUrl} alt={product.title} className="img-fluid" />
                </Col>
                <Col>
                    <p>
                        {product.title}
                    </p>
                    <p>
                        Price: ${product.price}
                    </p>
                </Col>
            </Row>
        </Container>
    )
}

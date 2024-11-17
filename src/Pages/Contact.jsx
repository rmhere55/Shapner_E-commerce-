import { Button, Container, Form } from "react-bootstrap";

export default function Contact() {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value
        }

        try {
            await fetch(import.meta.env.VITE_FIREBASE_PATH, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            alert("Form submitted successfully!");
            e.target.reset();
        } catch (error) {
            console.error("Error:", error);
            alert("Error submitting form. Please try again.");
        }
    }
    return (
        <Container style={{ maxWidth: "800px" }}>
            <h1 className="text-center my-4">Contact</h1>

            <Form onSubmit={handleSubmit} style={{ marginBottom: "40px" }}>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We&lsquo;ll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control type="tel" name="phone" placeholder="Phone number" />
                </Form.Group>

                <Button className="w-100" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </Container>
    )
}

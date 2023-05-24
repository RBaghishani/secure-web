import { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [message, setMessage] = useState(null);
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (ev) => {
        ev.preventDefault();
        try {
            setMessage(null);
            const { access_token, refresh_token } = await login(email, password, code);
            setAuth(access_token, refresh_token);
            navigate("/");
        } catch (error) {
            setMessage({ type: "danger", text: error.response.data.message });
            console.error(error);
        }
    };

    return (
        <Row className="justify-content-center py-5">
            <Col xs="12" xl="4">
                <Form onSubmit={onSubmit}>
                    <h2 className="display-3 text-center mb-5">Login</h2>
                    {message && <Alert variant={message.type}>{message.text}</Alert>}
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={email}
                            onChange={(ev) => setEmail(ev.target.value)}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(ev) => setPassword(ev.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Google Authenticator Code</Form.Label>
                        <Form.Control type="text" value={code} onChange={(ev) => setCode(ev.target.value)} />
                    </Form.Group>
                    <Button className="w-100" type="submit" size="lg">
                        Sign in
                    </Button>
                    <hr />
                    <p className="text-muted">
                        Not registered yet? <Link to="/register">Sign up</Link>
                    </p>
                </Form>
            </Col>
        </Row>
    );
};

export default Login;

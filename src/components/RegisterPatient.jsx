import { useState } from "react";
import { Alert, Button, Col, Form, ProgressBar, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import { useAuth } from "../hooks/useAuth";
import { useStrengthChecker } from "../hooks/useStrengthChecker";

const RegisterPatient = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [dob, setDob] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const { strength, label, isStrong } = useStrengthChecker(password);

    const onSubmit = async (ev) => {
        ev.preventDefault();

        try {
            setMessage(null);
            setLoading(true);
            const { access_token, refresh_token } = await register({
                firstname,
                lastname,
                email,
                password,
                gender,
                phoneNumber,
                address,
                dob,
            });

            setAuth(access_token, refresh_token);
            navigate("/");
        } catch (error) {
            setMessage({ type: "danger", text: error.response.data.message });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Row className="justify-content-center py-5">
            <Col xs="12" xl="4">
                <Form onSubmit={onSubmit}>
                    <fieldset disabled={isLoading}>
                        <h2 className="display-4 text-center mb-5">Register</h2>
                        {message && <Alert variant={message.type}>{message.text}</Alert>}
                        <Form.Group className="mb-3">
                            <Form.Label>Firstname</Form.Label>
                            <Form.Control
                                type="text"
                                value={firstname}
                                onChange={(ev) => setFirstname(ev.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Lastname</Form.Label>
                            <Form.Control
                                type="text"
                                value={lastname}
                                onChange={(ev) => setLastname(ev.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select value={gender} onChange={(ev) => setGender(ev.target.value)} required>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                                <option value="NON_BINARY">Non-binary</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                value={phoneNumber}
                                onChange={(ev) => setPhoneNumber(ev.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                value={address}
                                onChange={(ev) => setAddress(ev.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Birth Date</Form.Label>
                            <Form.Control type="date" value={dob} onChange={(ev) => setDob(ev.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(ev) => setEmail(ev.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="text"
                                value={password}
                                onChange={(ev) => setPassword(ev.target.value)}
                                required
                            />
                            <ProgressBar label={label} max={5} now={strength} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check id="terms" label={"I agree the terms and conditions"} required></Form.Check>
                        </Form.Group>
                        <Button type="submit" className="w-100" size="lg" disabled={!isStrong}>
                            Register
                        </Button>
                        <hr />
                        <p className="text-muted">
                            Already have an account <Link to="/login">Login</Link>
                        </p>
                    </fieldset>
                </Form>
            </Col>
        </Row>
    );
};

export default RegisterPatient;

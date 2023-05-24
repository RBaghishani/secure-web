import { useState } from "react";
import { Button, Col, Form, ProgressBar, Row } from "react-bootstrap";
import { useStrengthChecker } from "../hooks/useStrengthChecker";

export const UserProfile = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [dob, setDob] = useState("");

    const { strength, label, isStrong } = useStrengthChecker(password);

    return (
        <>
            <h1 className="h3">Profile</h1>
            <hr />
            <Row>
                <Col xs="12" xl="6">
                    <Form>
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
                            <Form.Select
                                value={gender}
                                onChange={(ev) => setGender(ev.target.value)}
                                required
                            >
                                <option value="" disabled>Please select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="non-binary">Non-binary</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                value={phone}
                                onChange={(ev) => setPhone(ev.target.value)}
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
                            <Form.Control
                                type="date"
                                value={dob}
                                onChange={(ev) => setDob(ev.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
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

                        <Button
                            className="w-100"
                            size="lg"
                            disabled={!isStrong}
                        >
                            Update
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

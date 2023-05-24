import { useMemo, useState } from "react";
import { Alert, Button, Col, Form, ProgressBar, Row } from "react-bootstrap";
import { useStrengthChecker } from "../hooks/useStrengthChecker";
import { createPatient } from "../api/patient";

export const CreatePatient = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [dob, setDob] = useState("");
    const { strength, label, isStrong } = useStrengthChecker(password);
    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const isValid = useMemo(() => {
        if (!isStrong) {
            return false;
        }

        return true;
    });

    const onSubmit = async (ev) => {
        ev.preventDefault();

        try {
            setMessage(null);
            setLoading(true);
            await createPatient({
                firstname,
                lastname,
                email,
                password,
                gender,
                phoneNumber,
                address,
                dob,
            });

            setMessage({
                type: "success",
                text: "Patient created",
            });

            setFirstname("");
            setLastname("");
            setEmail("");
            setPassword("");
            setGender("");
            setPhoneNumber("");
            setAddress("");
            setDob("");
        } catch (error) {
            setMessage({ type: "danger", text: error.response.data.message });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="h3">Create Patient</h1>
            <hr />
            <Row>
                <Col xs="12" xl="6">
                    {message && <Alert variant={message.type}>{message.text}</Alert>}
                    <Form onSubmit={onSubmit}>
                        <fieldset disabled={isLoading}>
                            <Form.Group className="mb-3">
                                <Form.Label>Firstname</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstname"
                                    value={firstname}
                                    onChange={(ev) => setFirstname(ev.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastname"
                                    value={lastname}
                                    onChange={(ev) => setLastname(ev.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select value={gender} onChange={(ev) => setGender(ev.target.value)} required>
                                    <option value="" disabled>Please select</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                    <option value="NON_BINARY">Non-binary</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    value={phoneNumber}
                                    onChange={(ev) => setPhoneNumber(ev.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    value={address}
                                    onChange={(ev) => setAddress(ev.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Birth Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="birth-date"
                                    value={dob}
                                    onChange={(ev) => setDob(ev.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(ev) => setEmail(ev.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(ev) => setPassword(ev.target.value)}
                                    required
                                />
                                <ProgressBar label={label} max={5} now={strength} />
                            </Form.Group>
                            <Button type="submit" className="w-100" size="lg" disabled={!isValid}>
                                Create
                            </Button>
                        </fieldset>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

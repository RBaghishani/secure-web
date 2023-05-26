import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, ProgressBar, Row } from "react-bootstrap";
import { useStrengthChecker } from "../hooks/useStrengthChecker";
import { useAuth } from "../hooks/useAuth";
import { getPatient, updatePatient } from "../api/patient";

export const UserProfile = () => {
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
    const { user } = useAuth();

    const { strength, label, isStrong } = useStrengthChecker(password);

    useEffect(() => {
        getFields();
    }, []);

    const getFields = async () => {
        try {
            setLoading(true);
            const patient = await getPatient(user.id);
            setFirstname(patient.firstname);
            setLastname(patient.lastname);
            setEmail(patient.email);
            setGender(patient.gender);
            setPhoneNumber(patient.phoneNumber);
            setAddress(patient.address);
            setDob(patient.dob);
        } catch (error) {
            setMessage({
                type: "danger",
                text: error.response.data.message || "Error",
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (ev) => {
        ev.preventDefault();

        try {
            setLoading(true);
            const patient = updatePatient(user.id, {
                firstname,
                lastname,
                email,
                password,
                gender,
                phoneNumber,
                address,
                dob,
            });

            setFirstname(patient.firstname);
            setLastname(patient.lastname);
            setEmail(patient.email);
            setGender(patient.gender);
            setPhoneNumber(patient.phoneNumber);
            setAddress(patient.address);
            setDob(patient.dob);

            setMessage({ type: "success", text: "Updated successfully." });
        } catch (error) {
            setMessage({
                type: "danger",
                text: error.response.data.message || "Error",
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="h3">Profile</h1>
            <hr />
            <Row>
                <Col xs="12" xl="6">
                    {message && (
                        <Alert variant={message.type}>{message.text}</Alert>
                    )}
                    <Form onSubmit={onSubmit}>
                        <fieldset disabled={isLoading}>
                            <Form.Group className="mb-3">
                                <Form.Label>Firstname</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={firstname}
                                    onChange={(ev) =>
                                        setFirstname(ev.target.value)
                                    }
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={lastname}
                                    onChange={(ev) =>
                                        setLastname(ev.target.value)
                                    }
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select
                                    value={gender}
                                    onChange={(ev) =>
                                        setGender(ev.target.value)
                                    }
                                    required
                                >
                                    <option value="" disabled>
                                        Please select
                                    </option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                    <option value="NON_BINARY">
                                        Non-binary
                                    </option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(ev) =>
                                        setPhoneNumber(ev.target.value)
                                    }
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={address}
                                    onChange={(ev) =>
                                        setAddress(ev.target.value)
                                    }
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
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(ev) =>
                                        setPassword(ev.target.value)
                                    }
                                />
                                <ProgressBar
                                    label={label}
                                    max={5}
                                    now={strength}
                                />
                            </Form.Group>
                            <Button
                                type="submit"
                                className="w-100"
                                size="lg"
                                disabled={password !== "" && !isStrong}
                            >
                                Update
                            </Button>
                        </fieldset>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

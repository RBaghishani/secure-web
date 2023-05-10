import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPatient, updatePatient } from "../api/PatientAPI";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import PatientForm from "./PatientForm";

const PatientInformation = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        getPatient();
    }, []);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === "checkbox") {
            setPatient((prevState) => ({
                ...prevState,
                [name]: checked,
            }));
        } else {
            setPatient((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await updatePatient(id, patient);
    };

    const getPatient = async () => {
        if (id) {
            setPatient(await fetchPatient(id));
        }
    };

    if (!patient) {
        return <p>Loading...</p>;
    }

    return (
        <Container>
            <Row>
                <Col lg="6">
                    <Form onSubmit={handleSubmit}>
                        {!!patient.avatar && (
                            <Form.Group className="mb-3">
                                <img className="w-100"
                                    src={patient.avatar}
                                    alt={`${patient.firstname} ${patient.lastname}`}
                                />
                            </Form.Group>
                        )}
                        <PatientForm
                            patient={patient}
                            handleChange={handleChange}
                        />

                        <div className="d-flex justify-content-end gap-2">
                            <Button type="submit">Update</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default PatientInformation;

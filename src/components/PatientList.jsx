import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import * as api from "../api/patient";

export const PatientList = () => {
    const [query, setQuery] = useState({ firstname: "", lastname: "" });
    const [patients, setPatients] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        getAllPatients();
    }, []);

    const onSearch = (ev) => {
        ev.preventDefault();
        searchPatients();
    };

    const getAllPatients = async () => {
        try {
            setLoading(true);
            const patients = await api.getAllPatients();
            setPatients(patients);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const searchPatients = async () => {
        if (query.firstname.trim() === "" && query.lastname.trim() === "") {
            getAllPatients();
            return;
        }
        
        try {
            setLoading(true);
            const patients = await api.searchPatient(query.firstname, query.lastname);
            setPatients(patients);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Form onSubmit={onSearch}>
                <Row className='gx-2'>
                    <Col>
                        <h1 className="h3">Patients List</h1>
                    </Col>
                    <Col xs="3">
                        <Form.Control
                            value={query.firstname}
                            onChange={(ev) => setQuery((query) => ({ ...query, firstname: ev.target.value }))}
                            type="search"
                            placeholder="First Name"
                        />
                    </Col>
                    <Col xs="3">
                        <Form.Control
                            value={query.lastname}
                            onChange={(ev) => setQuery((query) => ({ ...query, lastname: ev.target.value }))}
                            type="search"
                            placeholder="Last Name"
                        />
                    </Col>
                    <Col xs="2">
                        <Button type="submit" className="w-100">Search</Button>
                    </Col>
                </Row>
            </Form>
            <hr />
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Date of birth</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading && (
                        <tr>
                            <td colSpan={4}>Loading...</td>
                        </tr>
                    )}

                    {!isLoading &&
                        patients.map((patient) => (
                            <tr key={patient.email}>
                                <td>{`${patient.firstname} ${patient.lastname}`}</td>
                                <td>{patient.gender}</td>
                                <td>{patient.dob}</td>
                                <td>{patient.phoneNumber}</td>
                            </tr>
                        ))}
                    {!isLoading && patients.length === 0 && (
                        <tr>
                            <td colSpan={4}>Not Found</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    );
};

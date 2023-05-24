import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getAllPatients } from "../api/patient";

export const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        getPatients();
    }, []);

    const getPatients = async () => {
        try {
            setLoading(true);
            const patients = await getAllPatients();
            setPatients(patients);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="h3">Patients List</h1>
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

                    {!isLoading && patients.map((patient) => (
                        <tr key={patient.email}>
                            <td>{`${patient.firstname} ${patient.lastname}`}</td>
                            <td>{patient.gender}</td>
                            <td>{patient.dob}</td>
                            <td>{patient.phoneNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

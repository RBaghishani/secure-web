import { HeartPulseIcon } from "lucide-react";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { Navigate, Outlet } from "react-router-dom";
import { NavigationSidebar } from "../components/NavigationSidebar";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Dashboard = () => {
    const [token] = useLocalStorage("token", null);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <Navbar bg="primary" className="bg-gradient">
                <Container>
                    <Navbar.Brand className="text-white text-uppercase fw-bold">
                        <HeartPulseIcon className="me-2 animation-heartbeat" strokeWidth="1.5px" size={32} />
                        Doctor<span className="text-white fw-light">plus</span>
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <Container className="py-5">
                <Row>
                    <Col xs="5" md="4" xxl="3" as="aside">
                        <NavigationSidebar />
                    </Col>
                    <Col as="main">
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Dashboard;

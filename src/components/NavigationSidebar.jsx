import { LayoutDashboardIcon, LogOutIcon, UserIcon, UserPlusIcon, UsersIcon } from "lucide-react";
import { Card, Col, Nav, Row } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAuth } from "../hooks/useAuth";

export const NavigationSidebar = () => {
    const [, setToken] = useLocalStorage("token", null);
    const [, setRefreshToken] = useLocalStorage("refresh-token", null);
    const { user } = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        setToken(null);
        setRefreshToken(null);
        navigate("/login");
    };

    return (
        <Card body>
            <Row className="gx-2 align-items-center px-2">
                <Col xs="3">
                    {/* <Image
                        src="https://placehold.co/200?text="
                        roundedCircle
                        className="w-100"
                    /> */}
                    <div className="ratio ratio-1x1 bg-light bg-gradient border rounded-circle">
                        <span className="d-flex align-items-center justify-content-center text-dark">
                            <UserIcon size={26} />
                        </span>
                    </div>
                </Col>
                <Col>
                    <p className="mb-0">{user?.email}</p>
                    <Link to="/profile" className="text-decoration-none">
                        <small className="fw-light">edit profile</small>
                    </Link>
                </Col>
            </Row>
            <hr />
            <Nav variant="pills" className="flex-column">
                <Nav.Item>
                    <NavLink to="/" className="nav-link d-flex align-items-center bg-gradient">
                        <LayoutDashboardIcon size={16} className="me-2" />
                        Dashboard
                    </NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/create-patient" className="nav-link d-flex align-items-center bg-gradient">
                        <UserPlusIcon size={16} className="me-2" />
                        Create Patient
                    </NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/patient-list" className="nav-link d-flex align-items-center bg-gradient">
                        <UsersIcon size={16} className="me-2" />
                        Patients List
                    </NavLink>
                </Nav.Item>

                <hr />

                <Nav.Item>
                    <Nav.Link
                        as={"button"}
                        onClick={logout}
                        className="d-flex align-items-center bg-gradient link-danger w-100"
                    >
                        <LogOutIcon size={16} className="me-2" />
                        Logout
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </Card>
    );
};

import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export const BlankCentered = () => {
    return (
        <div className="min-vh-100 d-flex align-items-center">
            <Container>
                <Outlet />
            </Container>
        </div>
    );
};

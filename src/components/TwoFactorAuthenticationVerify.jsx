import { Button, Col, Form, Image, Row } from "react-bootstrap";

export const TwoFactorAuthenticationVerify = () => {
    return (
        <>
            <Row className="justify-content-center py-5 text-center">
                <Col xs="12" md="6" lg="3">
                    <Form>
                        <Image
                            src="https://api.qrserver.com/v1/create-qr-code/?data=hi&size=400x400"
                            className="w-100 mb-4 p-3"
                            thumbnail
                        />
                        <p>
                            Scan this QR with <b>Google Authenticator</b> app and enter the given 6-digit code below:
                        </p>
                        <Form.Group className="mb-3">
                            <Form.Control
                                autoFocus
                                type="text"
                                size="lg"
                                placeholder={"X".repeat(6)}
                                className="text-center"
                            />
                        </Form.Group>

                        <Button size="lg" className="w-100">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

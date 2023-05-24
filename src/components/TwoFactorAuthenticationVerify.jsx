import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Image, Ratio, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getOTPCode, validate } from "../api/auth";
import { useAuth } from "../hooks/useAuth";

export const TwoFactorAuthenticationVerify = () => {
    const [code, setCode] = useState("");
    const [qr, setQr] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();
    const [message, setMessage] = useState(null);


    if (!user) {
        navigate("/login");
    }

    useEffect(() => {
        updateQR();
    }, []);

    const updateQR = async () => {
        try {
            setLoading(true);
            const { data } = await getOTPCode(user.email);
            setQr("https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=" + encodeURIComponent(data));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (ev) => {
        ev.preventDefault();

        try {
            setMessage(null);
            const { valid } = await validate(user.email, code);
            if (!valid) {
                setMessage({
                    type: 'warning',
                    text: "Invalid code"
                });
                return;
            }

            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
      <>
          <h1 className="h4 text-center mb-5">Enable Two Factor Authentication</h1>
          <Row className="justify-content-center text-center">
              <Col xs="12" md="6" lg="3">
                  <Form onSubmit={onSubmit}>
                      {isLoading && (
                        <Ratio className="img-thumbnail mb-4 bg-light text-muted">
                            <div className="d-flex align-items-center justify-content-center">Loading</div>
                        </Ratio>
                      )}
                      {!isLoading && <Image src={qr} className="w-100 mb-4 p-3" thumbnail />}
                      <p>
                          Scan this QR with <b>Google Authenticator</b> app and enter the given 6-digit code below:
                      </p>
                      {message && <Alert variant={message.type}>{message.text}</Alert>}

                      <Form.Group className="mb-3">
                          <Form.Control
                            value={code}
                            onChange={(ev) => setCode(ev.target.value)}
                            maxLength={6}
                            type="text"
                            size="lg"
                            placeholder="XXXXXX"
                            className="text-center"
                            autoFocus
                            required
                          />
                      </Form.Group>

                      <Button type="submit" size="lg" className="w-100 mb-5" disabled={code.length < 6}>
                          Submit
                      </Button>

                      <Link to="/" className="btn btn-light w-100">
                          Skip
                      </Link>
                  </Form>
              </Col>
          </Row>
      </>
    );
};

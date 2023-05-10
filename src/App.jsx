import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { ThemeProvider, Navbar, Container, Nav } from "react-bootstrap";
import NewPatient from "./components/NewPatient";
import PatientList from "./components/PatientList";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import PatientInformation from './components/PatientInformation';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Patients</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink to="/" className="nav-link">New</NavLink>
                <NavLink to="/list" className="nav-link">List</NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <main className="py-5">
          <Routes>
            <Route index element={<NewPatient />} />
            <Route path='/list' element={<PatientList />} />
            <Route path='/patient/:id' element={<PatientInformation />} />
          </Routes>
        </main>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BlankCentered } from './layouts/BlankCentered';
import Dashboard from "./layouts/Dashboard";
import Login from "./components/Login";
import RegisterPatient from "./components/RegisterPatient";
import { UserProfile } from './components/UserProfile';
import { TwoFactorAuthenticationVerify } from './components/TwoFactorAuthenticationVerify';
import { CreatePatient } from './components/CreatePatient';
import { PatientList } from './components/PatientList';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<BlankCentered />}>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<RegisterPatient />}></Route>
                    <Route path="/2fa-verify" element={<TwoFactorAuthenticationVerify />}></Route>
                </Route>

                <Route element={<Dashboard />}>
                    <Route index element={<p>Home</p>} />
                    <Route path='/profile' element={<UserProfile />} />
                    <Route path='/create-patient' element={<CreatePatient />} />
                    <Route path='/patient-list' element={<PatientList />} />
                    <Route path='/foo' element={<p>foo</p>} />
                    <Route path='/*' element={<p>Not found</p>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

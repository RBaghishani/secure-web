import React from "react";
import NewPatient from "./components/NewPatient";
import PatientList from "./components/PatientList";

function App() {
  return (
    <div className="App">
      <NewPatient />
      <PatientList/>
    </div>
  );
}

export default App;
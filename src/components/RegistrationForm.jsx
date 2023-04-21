import React, {useState} from "react";
import StrengthMeter from "./StrengthMeter";
import {useStrengthChecker} from "../hooks/useStrengthChecker";
// import bcrypt from 'bcrypt';

const RegistrationForm = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const {isStrong} = useStrengthChecker(password);

  const onSubmit = async (e) => {
    try {
      /*bcrypt.hash(password, username, function (err, hash) {
        // Store hash in database here
        console.log(hash);


      });*/
      e.preventDefault();
      e.persist();
      //axios call
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="center">
      <h2>Registration</h2>
      <form onSubmit={onSubmit}>
        <label>
          <strong>Username</strong>
        </label>
        <input
          style={{"marginBottom": "15px"}}
          type="text"
          id="username"
          name="username"
          required
          value={username}
          onChange={(ev) => {
            setUsername(ev.target.value)
          }}
        />

        <label>
          <strong>Password</strong>
        </label>

        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={(ev) => {
            setPassword(ev.target.value)
          }}
        />

        <StrengthMeter password={password}/>
        <button type="submit" disabled={!isStrong}> Register</button>
      </form>
      <p>Password should contain:</p>
      <ul>
        <li>minimum 15 characters</li>
        <li>UPPERCASE</li>
        <li>lowercase</li>
        <li>number</li>
        <li>special character: @$! % * ? &</li>
      </ul>
    </div>
  );
};
export default RegistrationForm;
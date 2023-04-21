import React, {useState} from "react";
import StrengthMeter from "./StrengthMeter";
import {useStrengthChecker} from "../hooks/useStrengthChecker";
// import bcrypt from 'bcrypt';

import bcrypt from "bcryptjs-react";

const RegistrationForm = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const {isStrong} = useStrengthChecker(password);

  const generateHashUsingUsernameAsSalt = (username, password) => {
    //TODO : check this link please!
    //https://security.stackexchange.com/questions/158963/bcrypt-password-hashing-with-user-email-as-salt
    let encoded = bcrypt.encodeBase64(username, username.length);
    const hash = encoded.length >= 22 ? bcrypt.hashSync(password, "$2a$12$" + encoded) : bcrypt.hashSync(password, "$2a$12$" + encoded + 'a'.repeat(22 - encoded.length));
    return hash;
  }

  const generateWithRandomSalt = (password) => {
    let hash = bcrypt.hashSync(password, 10);
    return hash;
  }


  const onSubmit = async (e) => {
    e.preventDefault();
    e.persist();
    try {

      console.log(generateHashUsingUsernameAsSalt(username, password));

      console.log(generateWithRandomSalt(password));
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
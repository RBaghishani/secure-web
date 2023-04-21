import React from "react";
import "./StrengthMeter.css";
import {useStrengthChecker} from "../hooks/useStrengthChecker";
const StrengthMeter = (props) => {
  const {strength, label} = useStrengthChecker(props.password);

  return (
    <>
      <div className="wrapper">
        <progress
          className={`pwd-checker-bar strength-${label}`}
          value={strength}
          max="5"
        />
        <br />
        <p className="pwd-label">
          {props.password && (
            <div>
              <p className={`label strength-${label}`}>
                Password strength validation:
                <strong>{label} </strong>
              </p>
            </div>
          )}
        </p>
      </div>
    </>
  );
};
export default StrengthMeter;
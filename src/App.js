import { useState } from "react";
import validator from "validator";
import "./App.css";

function App() {
  const [signUpInput, setSignUpInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignUpInput({ ...signUpInput, [name]: value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!validator.isEmail(signUpInput.email)) {
      return setError("Email you input is invalid");
    } else if (!validator.isLength(signUpInput.password, { min: 5 })) {
      return setError("Password you enter should have 5 or more characters");
    }
  };
  return (
    <div className="container my-5">
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            onChange={handleChange}
            value={signUpInput.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            onChange={handleChange}
            value={signUpInput.password}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            className="form-control"
            onChange={handleChange}
            value={signUpInput.confirmPassword}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;

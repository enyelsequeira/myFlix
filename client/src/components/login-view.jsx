import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";

const LoginView = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log(username, password);
    //send a request to the server fro auth and call props.onloggedin(usernam)
    props.onLoggedIn(username);
  };

  return (
    <Container className="loginContainer">
      <h1>Movies E!</h1>
      <form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password goes here"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>
          Log in
        </Button>
        <Form.Group controlId="newUser">
          <Form.Text>
            New User? Click{" "}
            <Button id="registerButton" onClick={() => props.register()}>
              {" "}
              Here!{" "}
            </Button>
          </Form.Text>
        </Form.Group>
      </form>
    </Container>
  );
  /*
  return (
    <form>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.targe.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </label>
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );*/
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
};
export default LoginView;

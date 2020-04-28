import React, { useState } from "react";

import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const LoginView = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    console.log(username, password);

    axios
      .post("https://immense-springs-16706.herokuapp.com/login", {
        Username: username,
        Password: password
      })
      .then(response => {
        const data = response.data;

        console.log("[1] - login");
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  /* const handleSubmit = e => {
    e.preventDefault();
    console.log(username, password);
    //send a request to the server fro auth and call props.onloggedin(usernam)
    props.onLoggedIn(username);
  };
*/
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
            <Link to={`/register`}>
              <Button className="btn-register" variant="secondary">
                Register
              </Button>
            </Link>
          </Form.Text>
        </Form.Group>
      </form>
    </Container>
  );
};
//console.log(LoginView);
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};
export default LoginView;

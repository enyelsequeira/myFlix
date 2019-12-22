import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import axios from "axios";

const RegistrationView = ({ alreadyMember, onSignedIn }) => {
  const [username, createUsername] = useState("");
  const [password, createPassword] = useState("");
  const [email, createEmail] = useState("");
  const [birthday, createDob] = useState("");

  const handleSubmit = e => {
    console.log(alreadyMember, "-", onSignedIn);
    e.preventDefault();
    console.log(username, password);

    axios
      .post("https://immense-springs-16706.herokuapp.com/Users", {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open("/client", "_self");
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log("no such user [REGISTRATION]");
      });
  };

  return (
    <Form className="registrationForm">
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email Here</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={e => createEmail(e.target.value)}
        />
        <Form.Text className="text-muted">
          we'll never share your email with anyonelse
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => createUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password goes here"
          value={password}
          onChange={e => createPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="fomrBasicDob">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          placeholder="04/04/1994"
          value={birthday}
          onChange={e => createDob(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicsCheckbox">
        <Form.Check type="checkbox" label="check here" />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleSubmit}>
        REGISTER
      </Button>
      <Button variant="primary"> already a member</Button>
    </Form>
  );
};

export default RegistrationView;

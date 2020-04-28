import React, { useState, useEffect } from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//import "./profile-view.scss";

export function ProfileUpdate(props) {
  const {
    Username: oldUsername,
    Password: oldPassword,
    Email: oldEmail,
    Birthday: oldBirthday
  } = props.userInfo;
  console.log(props);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  useEffect(() => {
    setUsername(oldUsername);
    setPassword(oldPassword);
    setEmail(oldEmail);
    setBirthday(oldBirthday);
  }, [oldUsername, oldPassword, oldEmail, oldBirthday]);

  const user = props.user;

  const handleUpdate = e => {
    e.preventDefault();
    const userInfo = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };
    axios
      .put(
        `https://immense-springs-16706.herokuapp.com/users/${localStorage.user}`,
        userInfo,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then(response => {
        props.updateUser(userInfo);
        alert("Your profile has been update");
      })
      .catch(e => {
        const errors = e.response.data.errors || [];
        let errorMessage = "";
        errors.forEach(err => {
          errorMessage += err.msg;
        });
        alert(`there was an error ${errorMessage}`);
        console.log(`updating unsuccesful.`);
      });
  };

  const handleDelete = e => {
    e.preventDefault();
    axios
      .delete(
        `https://immense-springs-16706.herokuapp.com/users/${localStorage.user}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then(response => {
        alert("You have deleted your account");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.open("/", "_self");
      })
      .catch(e => {
        alert("Error deleting the account");
      });
  };

  return (
    <Form className="update-form">
      <div className="text-center">
        <p className="update-title">Please update your info:</p>
      </div>
      <Form.Group controlId="formNewUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Your username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Your Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          type="date"
          placeholder="MM/DD/YYYY"
          value={birthday}
          onChange={e => setBirthday(e.target.value)}
        />
      </Form.Group>
      <div className="text-center">
        <Button
          className="btn-register"
          variant="secondary"
          type="submit"
          onClick={handleUpdate}
        >
          Update
        </Button>
        <Button
          className="btn-delete"
          variant="danger"
          type="submit"
          onClick={handleDelete}
        >
          Delete profile
        </Button>
      </div>
    </Form>
  );
}

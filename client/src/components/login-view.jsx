import React, { useState } from "react";

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
  );
};

export default LoginView;

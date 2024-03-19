import React, { useState } from "react";
import "./Forms.css";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import AlertModel from "../AlertModel/AlertModel";
import instagram_logo from "../images/instagram.jpeg";

const LoginInForm = (props) => {
  const [Username, SetUsername] = useState("");
  const [Password, SetPassword] = useState("");

  const UsernameHandler = (event) => {
    SetUsername(event.target.value);
  };
  const PasswordHandler = (event) => {
    SetPassword(event.target.value);
  };

  // const AccesUsername =(username)=>{
  // }

  const LoginHandler = (event) => {
    event.preventDefault();
    // if (Username.trim().length < 5) {
    //   SetError(true);
    //   return;
    // }
    if (Password.length < 1) {
      props.OpenErrorHandler();
      return;
    }

    // Sends this data
    let dataform = new FormData();
    dataform.append("username", Username);
    dataform.append("password", Password);

    // Communicates to the data recieved method
    const requestOptions = {
      method: "POST",
      body: dataform,
    };

    fetch(`http://127.0.0.1:8000/login`, requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        props.OpenErrorHandler();
        throw res;
      })
      .then((data) => {
        console.log(data);
        props.SignIn();
        props.auth(data.access_token);
        props.username(data.username);
        props.Token_Type(data.token_type);
        props.user_id(data.user_id);
      })
      .catch((err) => {
        console.log(err);
      });
    SetPassword("");
    SetUsername("");
  };

  return (
    <>
      {props.error && (
        <AlertModel
          title={`User not Found!!!`}
          message={`Sorrry!!!. I can't find you in my Database. `}
          CloseErrorHandler={props.CloseErrorHandler}
        />
      )}
      <div className="backdrop" onClick={props.close} />
      <Card className="formcard">
        <img
          src={instagram_logo}
          className="header_image"
          alt="instagram_logo"
        />
        <form className="form" onSubmit={LoginHandler}>
          <label>
            <h3>SignIn</h3>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            onChange={UsernameHandler}
            value={Username}
          />
          <input
            type="password"
            placeholder="Enter Password"
            onChange={PasswordHandler}
            value={Password}
          />
          <Button type="submit" className="lgbutton">
            LogIn
          </Button>
        </form>
      </Card>
    </>
  );
};

export default LoginInForm;

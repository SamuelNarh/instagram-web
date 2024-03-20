import React, { useState } from "react";
import Button from "../UI/Button/Button";
import "./Forms.css";
import Comment from "../Comment/Comment";

const CommentInput = (props) => {
  const [Inputcomment, SetInputcomment] = useState("");
  const CommentHandler = (event) => {
    event.preventDefault();

    const comment = JSON.stringify({
      text: Inputcomment,
      username: props.username,
      post_id: props.post_id,
    });
    const requestOptions = {
      method: "POST",
      //for authorization at the backend, we need token_type and access_token to verify user.
      headers: new Headers({
        Authorization: props.Token_Type + " " + props.Access_Token,
        "Content-Type": "application/json",
      }),
      body: comment,
    };

    fetch(`http://127.0.0.1:8000/comment/`, requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        fetchAllComments();
        SetInputcomment("");
      })
      .catch((err) => {
        console.log(err);
      });

    const fetchAllComments = () => {
      fetch(`http://127.0.0.1:8000/comment/all/${props.post_id}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw res;
        })
        .then((data) => {
          console.log(data);
          props.comments(data);
        });
    };
  };
  const InputHandler = (event) => {
    SetInputcomment(event.target.value);
  };
  return (
    <>
      <form onSubmit={CommentHandler}>
        <input
          className="comment"
          placeholder="Leave a comment ..................."
          onChange={InputHandler}
        />
        <Button type="submit">reply</Button>
      </form>
    </>
  );
};

export default CommentInput;
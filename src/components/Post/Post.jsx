import React, { useState, useEffect } from "react";
import "./Post.css";
import Card from "../UI/Card/Card";
import Comment from "../Comment/Comment";
import AlertModel from "../AlertModel/AlertModel";
import CommentInput from "../Forms/CommentInput";
import avatar from "../images/avatar.png";
import delete_icon from "../images/delete.png";
import Like from "../Like/Like";
import love from "../images/love.png";

const BASE_URL = "https://instagram-samuelnarh.koyeb.app/";

const Post = (props) => {
  const [imageUrl, SetImageUrl] = useState("");
  const [comments, SetComment] = useState([]);
  const [Likes, SetLikes] = useState([]);
  const [Liked, SetLiked] = useState("");
  useEffect(() => {
    if (props.post.image_url_type === "absolute") {
      SetImageUrl(BASE_URL + props.post.image_url);
    } else {
      SetImageUrl(props.post.image_url);
    }
  }, []);

  useEffect(() => {
    SetComment(props.post.comments);
    SetLikes(props.post.like);
  }, []);

  const CommentUpdateHandler = (event) => {
    SetComment(event);
  };

  // Handle Deletion of Post
  const DeleteHandler = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "GET",
      //for authorization at the backend, we need token_type and access_token to verify user.
      headers: new Headers({
        Authorization: props.Token_Type + " " + props.Access_Token,
      }),
    };

    fetch(
      `https://instagram-samuelnarh.koyeb.app/post/delete/${props.post.id}`,
      requestOptions
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        props.OpenErrorHandler();
        throw res;
      })
      .then((data) => {
        window.location.reload();
        props.DeletePost();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Handle Like 
  const LikeHandler = () => {
    SetLiked("liked");
    // SetLiked("liked");
    // console.log(Love)
    // const RequestBody = JSON.stringify({
    //   total: props.like.total+1,
    //   post_id: props.post.id,
    // });
    // const requestOptions = {
    //   method: "POST",
    //   body: RequestBody,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    // fetch(`https://instagram-samuelnarh.koyeb.app/like`,requestOptions);
  };
  return (
    <>
      {props.error && (
        <AlertModel
          title="Not Authorized !!!"
          message="Please you didn't create this post"
          CloseErrorHandler={props.CloseErrorHandler}
        />
      )}

      {
        <Card className="post">
          <div className="post_header">
            <div className="post_header_item">
              <img className="profile" src={avatar} alt="profile_pics" />
              <p className="profile_name"> {props.post.user.username}</p>
            </div>
            <div>
              <img
                className="delete"
                src={delete_icon}
                onClick={DeleteHandler}
              ></img>
            </div>
          </div>
          <img className="post_image" src={imageUrl} alt="post_image" />
          <img src={love} onClick={LikeHandler} className={`like ${Liked}`} />
          {Likes.map((like) => {
            console.log(like.total)
            return <Like key={like.id} like={like} />;
          })}
          <h4 className="post_text">{props.post.caption}</h4>
          <div className="post_comments">
            {comments.map((comment) => {
              return <Comment key={comment.id} comment={comment} />;
            })}
          </div>
          {props.Access_Token && (
            <CommentInput
              Access_Token={props.Access_Token}
              Token_Type={props.Token_Type}
              username={props.username}
              post_id={props.post.id}
              comments={CommentUpdateHandler}
            />
          )}
        </Card>
      }
    </>
  );
};

export default Post;

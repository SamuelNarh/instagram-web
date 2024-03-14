import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./components/Post/Post";
import Header from "./components/Header/Header";

const BASE_URL = "http://127.0.0.1:8000";

function App() {
  const [posts, SetPost] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/post/all`)
      .then((res) => {
        // console.log(res);
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        //sorting the reponse
        const result = data.sort((a, b) => {
          const t_a = a.timestamp.split(/[-T:]/);
          const t_b = b.timestamp.split(/[-T:]/);
          const d_a = new Date(
            Date.UTC(t_a[0], t_a[1] - 1, t_a[2], t_a[3], t_a[4], t_a[5])
          );
          const d_b = new Date(
            Date.UTC(t_b[0], t_b[1] - 1, t_b[2], t_b[3], t_b[4], t_b[5])
          );
          return d_b -d_a
        });
        return result;
      })
      .then((data) => {
        SetPost(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to connect to the server");
      });
  }, []);
  return (
    <>
    <Header/>
      <div className="app_posts">
        {posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </div>
    </>
  );
}

export default App;

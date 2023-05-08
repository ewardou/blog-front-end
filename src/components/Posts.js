import React from 'react';
import { useState, useEffect } from 'react';

function Posts() {
    let [posts, setPosts] = useState([]);

    async function getPosts() {
        try {
            const response = await fetch(
                'https://blog-api-hs2t.onrender.com/posts'
            );
            const json = await response.json();
            console.log(json);
            setPosts(json);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div>
            {posts
                ? posts.map((post) => {
                      return (
                          <div key={post._id}>
                              <h1>{post.title}</h1>
                              <p>{post.content}</p>
                          </div>
                      );
                  })
                : null}
        </div>
    );
}

export default Posts;

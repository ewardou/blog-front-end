import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Posts() {
    let [posts, setPosts] = useState('');

    async function getPosts() {
        try {
            const response = await fetch(
                'https://blog-api-hs2t.onrender.com/posts/public'
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
            {posts ? (
                posts.map((post) => {
                    return (
                        <Link to={`${post._id}`} key={post._id}>
                            <h1>{post.title}</h1>
                        </Link>
                    );
                })
            ) : (
                <h1>Loading</h1>
            )}
        </div>
    );
}

export default Posts;

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
        <div className="posts">
            <h1>Eduardo's blog</h1>
            {posts ? (
                posts.map((post) => {
                    const div = createDiv(post.content);
                    return (
                        <Link to={`${post._id}`} key={post._id}>
                            <h1>{post.title}</h1>
                            <div className="content">{div.textContent}</div>
                        </Link>
                    );
                })
            ) : (
                <h1>Loading</h1>
            )}
        </div>
    );
}

function createDiv(content) {
    const div = document.createElement('div');
    div.innerHTML = content;
    console.log(div);
    return div;
}
export default Posts;

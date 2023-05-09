import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CommentForm from './CommentForm';

export default function SinglePost() {
    const { postID } = useParams();
    const [post, setPost] = useState('');
    const [comments, setComments] = useState([]);

    async function getPost() {
        try {
            const response = await fetch(
                `https://blog-api-hs2t.onrender.com/posts/${postID}`
            );
            const json = await response.json();
            setPost(json);
        } catch (e) {
            console.error(e);
        }
    }

    async function getComments() {
        try {
            const response = await fetch(
                `https://blog-api-hs2t.onrender.com/posts/${postID}/comments`
            );
            const json = await response.json();
            setComments(json);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getPost();
        getComments();
    }, []);

    return (
        <div>
            <Link to="/">Home</Link>
            {post ? (
                <div>
                    <h1>{post.title}</h1>
                    <p>{post.date}</p>
                    {post.content.split('\n\n').map((para, index) => (
                        <p key={index}>{para}</p>
                    ))}
                </div>
            ) : (
                <h1>Loading</h1>
            )}
            <CommentForm getComments={getComments} />
            {comments.length ? (
                <div>
                    {comments.map((comment) => {
                        return (
                            <div key={comment._id}>
                                <p>{comment.name}</p>
                                <p>{comment.content}</p>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <h1>No comments yet</h1>
            )}
        </div>
    );
}

// Add dummy content "How to train your cat" "Why you should have a cat", content will be lorem ipsum paragraphs, add styling

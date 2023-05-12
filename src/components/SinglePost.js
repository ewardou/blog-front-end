import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import { DateTime } from 'luxon';

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
            document.querySelector('.post-content').innerHTML = json.content;
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
                    <p>{formatDate(post.date)}</p>
                    <div className="post-content"></div>
                </div>
            ) : (
                <h1>Loading</h1>
            )}
            <h2>Comments</h2>
            <CommentForm getComments={getComments} />
            {comments.length ? (
                <div>
                    {comments.map((comment) => {
                        return (
                            <div className="comment" key={comment._id}>
                                <p>
                                    <span>{comment.name}</span>
                                    <span>{formatDate(comment.date)}</span>
                                </p>
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

function formatDate(date) {
    return DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_FULL);
}

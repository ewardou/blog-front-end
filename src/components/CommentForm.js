import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CommentForm(props) {
    const { postID } = useParams();
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [msg, setMsg] = useState('');

    function onChangeName(e) {
        setName(e.target.value);
    }
    function onChangeContent(e) {
        setContent(e.target.value);
    }

    async function submitComment(e) {
        e.preventDefault();
        let curName = name;
        let curContent = content;
        setName('');
        setContent('');
        setMsg('');
        if (!curName) {
            curName = 'Anonymous';
        }
        if (!curContent) {
            return setMsg('Please fill the comment field');
        }
        await fetch(
            `https://blog-api-hs2t.onrender.com/posts/${postID}/comments`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: curName, content: curContent }),
            }
        )
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((e) => console.error(e));
        props.getComments();
    }

    return (
        <form>
            <p>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={onChangeName}
                />
            </p>
            <p>
                <label htmlFor="content">Comment*</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={onChangeContent}
                    required
                ></textarea>
            </p>
            <p>{msg}</p>
            <button onClick={submitComment}>Submit</button>
        </form>
    );
}

import React from 'react'
import { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addComment } from '../../redux/slices/commentsSlice';
import "./Post.scss";

const Post = () => {
    const {post_id} = useParams();
    const dispatch = useAppDispatch();

    const post = useAppSelector(state => state.postsSlice.posts)
        .filter( post => {
            if(post?.id === Number(post_id)) return post    
        })[0];
    const user = useAppSelector(state => state.usersSlice.users)
        .filter( user => {
            if(post?.userId === user.id) return user
        })[0];

    
    const commentsSlice = useAppSelector(state => state.commentsSlice);

    const comments = commentsSlice.comments.filter( comment => {
        if(comment.postId === Number(post_id)) return comment
    });

    const addCommentClick = () => {
        if(body){
            dispatch(addComment({
                postId: post?.id,
                id: commentsSlice.comments.length,
                name: name,
                email: email,
                body: body
            }));
        }else{
            alert("Заполните поле текста комментария!")
        }
    }

    const [name, setName] = useState("Noname");
    const [body, setBody] = useState("");
    const [email, setEmail] = useState("");

    return (<div className="post">
        <div className="container">
            {(post && user) ? (<>
                <div className="post__info">
                    <h1>Post</h1>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                    <NavLink to={`/profile/${user.id}`}>
                        <h3>Author: {user.username}</h3>
                    </NavLink>

                    <div className="post__info-addcomm">
                        <h2>Добавить комментарий</h2>
                        <input id="name"
                            onChange={(e) => {setName(e.target.value)}} 
                            value={name} 
                            placeholder="Имя" 
                            type="text">
                        </input>
                        <input id="email"
                            onChange={(e) => { setEmail(e.target.value) }}
                            value={email}
                            placeholder="email"
                            type="emali">
                        </input>
                        <textarea id="body"
                            onChange={(e) => {setBody(e.target.value)}} 
                            value={body} 
                            placeholder="Комментарий">
                        </textarea>
                        
                        <button onClick={addCommentClick}>Откоментировать</button>
                    </div>
                </div>
                <div className="post__comments">
                    <h2>Comments</h2>
                    { comments.map( comment => {
                        return(<div className="post__comments-comment" key={comment.id}>
                            <strong>{comment.name}</strong>
                            <p>{comment.body}</p>
                            <h3>{comment.email}</h3>
                        </div>)
                    })}
                </div>
            </>) : (<h1>Loading...</h1>)}
        </div>
    </div>)
}

export default Post
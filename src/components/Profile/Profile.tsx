import React, { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import Slider from 'react-slick';

import "./Profile.scss";

const slicerSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    arrows: false
    
};

const Profile = () => {
    const {id} = useParams();
    let id_number: number = Number(id);
    
    const usersSlice = useAppSelector(state => state.usersSlice);
    const user = usersSlice.users.filter((el) => {
        if (el.id === id_number){
            return el
        };
    })[0];
    const userError = usersSlice.error;

    const postsSlice = useAppSelector(state => state.postsSlice);
    const postsError = postsSlice.error;
    const posts = postsSlice.posts.filter(post => {
        if(post.userId === id_number) return post;
    });

    const [postLength, setPostLength] = useState(3);

    return (<div className="profile">
        {(user && !userError) ? (<div className="profile__info">
            <div>
                <div className="profile__info-name container">
                    <h2>{user?.name}</h2>
                </div>
            </div>
            <div>
                <div className="container">
                    <div>
                        <p>{user?.name}</p>
                    </div>
                    <div>
                        <p>{user?.address.city}</p>
                    </div>
                    <div>
                        <p>{user?.phone}</p>
                    </div>
                    <div>
                        <button>Написать сообщение</button>
                    </div>
                    <div>
                        <button>Предложить сходить на концерт</button>
                    </div>
                </div>
            </div>
            <div>
                <div className="container">
                    <div>
                        <p>{user?.company.name}</p>
                    </div>
                    <div>
                        <p>{user?.company.bs}</p>
                    </div>
                </div>
            </div>
        </div>) : (<h1>User Loading...</h1>)}
        
        { (posts.length > 0 && !postsError) ? (<div className="profile__posts">
            <div className="container">
                <div className="profile__posts-title">
                    <h2>Посты</h2>
                    <button onClick={() => {
                        (postLength === 3) ? (setPostLength(posts.length)) : (setPostLength(3));
                    }}>
                        <strong>{(postLength === 3) ? ("Просмотреть все") : ("Скрыть")}</strong>
                    </button>
                </div>
                <div className="profile__posts-list">
                    { posts.map( (post, id) => {
                        if(id < postLength)
                        return(<NavLink to={`/posts/${post.id}`} className="post" key={post.id}>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                        </NavLink>)
                    })}
                </div>
            </div>
        </div>) :
        (<h1>Posts Loading...</h1>)
        }

        <div className="profile__publication">
            <div className="container">
                <h2 className="profile__publication-title">Публикации</h2>
                <div>
                    <Slider className="profile__publication-list" {...slicerSettings}>
                        <div className="publication__item"></div>
                        <div className="publication__item"></div>
                        <div className="publication__item"></div>
                        <div className="publication__item"></div>
                        <div className="publication__item"></div>
                        <div className="publication__item"></div>
                        <div className="publication__item"></div>
                        <div className="publication__item"></div>
                        <div className="publication__item"></div>
                        <div className="publication__item"></div>
                        <div className="publication__item"></div>
                    </Slider>
                </div>
            </div>
        </div>
    </div>);
}

export default Profile
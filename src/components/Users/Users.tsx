import React from 'react'
import { NavLink } from 'react-router-dom';
import Slider from 'react-slick';
import { useAppSelector } from '../../redux/hooks';

import "./Users.scss";

const sliderBackground = require("../../images/usersBackground.png");

const NextArrow = (props: any) => {
    return (
        <button 
            style={{...props.style}} 
            onClick={props.onClick} 
            className={"headslider-btn headslider-btn--next "+props.className}>
            {">"}
        </button>
    )
}

const PrevArrow = (props: any) => {
    return (
        <button 
            style={{...props.style}} 
            onClick={props.onClick} 
            className={"headslider-btn headslider-btn--prev "+props.className}>
            {"<"}
        </button>
    )
}

const sliderSettings = {
    btns: false,
    dots: false,
    infinite: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
}
const ticketsSlider = {
    slidesToShow: 4,
    slidesToScroll: 4,
    dots: false,
    arrows: false,
    infinity: false
}

const Users = () => {
    const usersSlice = useAppSelector(state => state.usersSlice);
    const usersList = usersSlice.users;
    const usersError = usersSlice.error;

    return (<div className="users">
        <div className="users__header"> 
            <Slider className="headslider" {...sliderSettings}>
                <div className="headslider__item">
                    <img src={sliderBackground} alt="" /><div className="headslider__item-text">
                    <h1>Twenty One Pilots</h1>
                    <h2>22.02.23 в 21:00</h2>
                    <button>Купить билет</button>
                        
                    </div>
                </div>
                <div className="headslider__item">
                    <img src={sliderBackground} alt="" /><div className="headslider__item-text">
                    <h1>Twenty One Pilots</h1>
                    <h2>22.02.23 в 21:00</h2>
                    <button>Купить билет</button>
                        
                    </div>
                </div>
                <div className="headslider__item">
                    <img src={sliderBackground} alt="" /><div className="headslider__item-text">
                        <h1>Twenty One Pilots</h1>
                        <h2>22.02.23 в 21:00</h2>
                        <button>Купить билет</button>

                    </div>
                </div>
                <div className="headslider__item">
                    <img src={sliderBackground} alt="" /><div className="headslider__item-text">
                        <h1>Twenty One Pilots</h1>
                        <h2>22.02.23 в 21:00</h2>
                        <button>Купить билет</button>

                    </div>
                </div>
            </Slider>
            
        </div>

        
        <div className="users__ticets container">
            <div className="users__ticets-title">
                <h2>Купили билетов</h2>
                <h2>993/<span>1000</span></h2>
            </div>
            {(usersList.length > 0 && !usersError) ?
                (<Slider className="users__ticets-slider tickets-slider" {...ticketsSlider}>
                    {usersList.map( (user) => {
                        return (<div className="tickets-slider__item" key={user.id}>
                            <h3>{user.name} - {user.username}</h3>
                            <p>{user.address.city}</p>
                            
                            <NavLink to={`/profile/${user.id}`}>
                                <button>Смотреть Профиль</button>
                            </NavLink>
                        </div>)
                    })}
                </Slider>) :
                (<h2>Loading...</h2>)
            }
           
        </div>

        <div className="about">
            <div className="container">
                <div className="about__left">
                    <h2>О площадке</h2>
                    <div className="about__left-text">
                        <h3>Современная площадка для проведения концертов и других мероприятий любой сложности.</h3>
                        <p>
                            Мы предоставляем всю необходимую для организаторов
                            инфраструктуру и готовые решения под все основные
                            задачи любого события, а также современное оборудование,
                            соответствующее самым высоким мировым стандартам.
                        </p>
                    </div>
                </div>
                <div className="about__right">
                    <h3>Оставить заявку на проведение концерта</h3>
                    <textarea placeholder="Расскажите о вашам предложении"></textarea>
                    <button>Отправить</button>
                </div>
            </div>
        </div>

        <div className="users__footer">
            <div className="container">
                <h2>О группе</h2>
                <p>
                    Twenty One Pilots — американский дуэт из Колумбуса, штат Огайо.
                    Группа образовалась в 2009 году и на данный момент состоит из
                    Тайлера Джозефа и Джоша Дана. Коллектив самостоятельно выпустил
                    два альбома: Twenty One Pilots в 2009 и Regional at Best в 2011.
                </p>
            </div>
        </div>
    </div>)
}

export default Users
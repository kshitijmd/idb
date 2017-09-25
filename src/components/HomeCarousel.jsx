import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';

// general styles
import 'style!css!react-responsive-carousel/lib/styles/main.css';
// carousel styles
import 'style!css!react-responsive-carousel/lib/styles/carousel.css';

const slideData = [
    { 
        src: "https://i.genius.com/bd2d786ffa10ff5c354505247dde607bd70f5924?url=http%3A%2F%2Fwww.portugaltheman.com%2Fsites%2Fg%2Ffiles%2Fg2000000591%2Ff%2F201305%2FPortugal.%2520The%2520Man%2520-%2520In%2520the%2520Mountain%2520in%2520the%2520Cloud%2520%282011%29.jpg",
        legend: "Portugal. The Man - In the Mountain in the Cloud",
        key: 0
    },
    {
        src: "http://images.huffingtonpost.com/2013-01-10-The_ShinsChutesTooNarrow.jpg",
        legend: "The Shins - Chutes Too Narrow",
        key: 1
    }, 
    {
        src: "http://thelogicescapesme.com/wp-content/uploads/2017/08/darkside.jpg",
        legend: "Pink Floyd - Darkside of the Moon",
        key: 2
    }
];

const slides = slideData.map(item => {
    return (
        <div>
            <img key={item.key} src={item.src} style={{width: 700 + 'px', height: 700 + 'px'}}/>
            <p className="legend">{item.legend}</p> 
        </div>
    );
});

export default class HomeCarousel extends Component {
    render() {
        return (
            <Carousel 
                showArrows={true} 
                showThumbs={false} 
                infiniteLoop 
                autoPlay>
                    { slides }
            </Carousel>
        );
    }
};
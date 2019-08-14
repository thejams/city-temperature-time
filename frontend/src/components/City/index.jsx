import React, { Component } from 'react';
import image from '../../assets/images/sunn.png'

const CityComponent = ({city}) => (
    <div className="header-bottom1 header-bottom2">
        <div className="header-head">
            <h4>{city.timeData.timezone}</h4>
            <img src={image} alt="" />
            <h6>{city.temperature}</h6>
            <div className="bottom-head">
                <p>Hora</p>
                <p>{city.timeData.time}</p>
            </div>
        </div>
    </div>
);

export default CityComponent;
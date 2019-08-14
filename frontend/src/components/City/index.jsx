import React, { Component } from 'react';

const CityComponent = ({city, index, icon}) => (
    <div className={ `header-bottom1  ${(index % 2 === 0)? "header-bottom2" : ""}` }>
        <div className="header-head">
            <h4>{city.timeData.timezone}</h4>
            <img src={icon} alt="" />
            <h6>{city.temperature}</h6>
            <div className="bottom-head">
                <p>Hora</p>
                <p>{city.timeData.time}</p>
            </div>
        </div>
    </div>
);

export default CityComponent;
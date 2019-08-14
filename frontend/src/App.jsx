import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import moment from 'moment-timezone';
import HeaderComponent from './components/Header'
import CityComponent from './components/City'

import sunn from './assets/images/sunn.png'
import rain from './assets/images/rain.png'
import cloudy from './assets/images/cloudy.png'

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001"
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", (data) => {
      this.setState({ response: data })
    });
  }
  render() {
    const { response } = this.state;
    return (
      <div className="header">
        <HeaderComponent/>
        {
          response
          ?
          <div>
            {
              response.map((value, index) => {
                value.timeData.time = moment(value.timeData.time).tz(value.timeData.timezone).format('HH:mm:ss')
                let icon = sunn
                switch (value.icon) {
                  case "rain":
                    icon = rain
                    break
                  case "cloudy":
                    icon = cloudy
                    break      
                }
                return (
                  <CityComponent city={value} index={index} icon={icon} key={index} />
                )
              })
            }
          </div>
          : 
          <p>Loading...</p>
        }
      </div>
    )
    // return (
    //     <div style={{ textAlign: "center" }}>
    //       <HeaderComponent/>
    //       {
    //         response
    //         ?
    //         <div>
    //             {response.data.map((value, index) => {
    //               return (
    //                 <div key={value.timeData.timezone}>
    //                   <p>
    //                       The temperature in {value.timeData.timezone} is: {value.temperature} °F
    //                   </p>
    //                   <p>
    //                       The time is: {moment(value.timeData.time).tz(value.timeData.timezone).format()}
    //                   </p>
    //                 </div>
    //               )
    //             })}
    //         </div> 
    //         : 
    //         <p>Loading...</p>
    //       }
    //     </div>
    // );
  }
}
export default App;
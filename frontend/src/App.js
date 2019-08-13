import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import moment from 'moment-timezone';

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
      console.log(data)
      this.setState({ response: data })
    });
  }
  render() {
    const { response } = this.state;
    return (
        <div style={{ textAlign: "center" }}>
          {
            response
            ?
            <div>
                {response.data.map((value, index) => {
                  return (
                    <div key={value.timeData.timezone}>
                      <p>
                          The temperature in {value.timeData.timezone} is: {value.temperature} °F
                      </p>
                      <p>
                          The time is: {moment(value.timeData.time).tz(value.timeData.timezone).format()}
                      </p>
                    </div>
                  )
                })}
            </div> 
            : 
            <p>Loading...</p>
          }
        </div>
    );
  }
}
export default App;
import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default class App extends Component {
  //other logic
  render() {
    return (
      <Loader
        type="ThreeDots"
        color="#df4e78"
        height={80}
        width={80}
        timeout={3000} //3 secs
      />
    );
  }
}

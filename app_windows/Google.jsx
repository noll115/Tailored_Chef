//Austin Ha, Noel Gomez, Tim Nguyen
import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

export default class Google extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameOfMarket: "el supermercado",
      address: '1111 sactown rd Sacramento, CA 95660',
    };
    let output = JSON.stringify({
      key: "AIzaSyAwXLQfVOPKWdX9dKLbEqd1wegKu8_i3W8",
      input: "University of California, Santa Cruz 1156 High Street Santa Cruz, CA 95064",
      inputtype: "textquery",
    });
    let output2 = JSON.stringify({
      key: "AIzaSyAwXLQfVOPKWdX9dKLbEqd1wegKu8_i3W8",
      input: "University of California, Santa Cruz 1156 High Street Santa Cruz, CA 95064",
      inputtype: "textquery",
    });
    //fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=mongolian%20grill&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@47.6918452,-122.2226413&key=AIzaSyDoZXJlmWAA-eixyj3B5N-y4Uq4UCovZbk`)
    //.then(res=>res.json()).then(result=>console.log(result));
    //console.log(output);
    fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDoZXJlmWAA-eixyj3B5N-y4Uq4UCovZbk`)
    .then(res=>res.json()).then(result=>console.log("1"+result.status));

    //let a = fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDoZXJlmWAA-eixyj3B5N-y4Uq4UCovZbk`);

    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location&rankby=distance&type=grocery_or_supermarket&key=AIzaSyDoZXJlmWAA-eixyj3B5N-y4Uq4UCovZbk`)
    .then(res=>res.json()).then(result=>console.log("2"+result.status));
  }

  render() {
    return (
      <Text>
      </Text>

    );
  }
}
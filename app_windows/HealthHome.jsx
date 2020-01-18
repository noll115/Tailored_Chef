import React, { Component } from 'react';
import { View, Button, StyleSheet, Text } from "react-native";
import { registerRootComponent } from "expo";
import MongoDB from "../app_modules/MongoDB";
class HealthHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };
    }

    componentDidMount() {
        MongoDB.loadClient().then(() => this.setState({ loggedIn: true }))
    }



    render() {
        
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default registerRootComponent(HealthHome);
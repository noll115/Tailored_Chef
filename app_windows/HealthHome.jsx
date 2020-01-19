import React, { Component } from 'react';
import { StyleSheet, Dimensions } from "react-native";
import { Button, ThemeProvider, Input } from "react-native-elements";
import * as  Animatable from 'react-native-animatable';
import { registerRootComponent } from "expo";
import MongoDB from "../app_modules/MongoDB";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Recipes from "./Recipes";


class HealthHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
        };
    }

    componentDidMount() {
        MongoDB.loadClient().then(() => this.setState({ loggedIn: true }))
    }



    render() {
        return (
            <ThemeProvider>
                {this.state.loggedIn ? <Recipes calories={700} mongo={MongoDB} /> : <Button />}
            </ThemeProvider>
        );
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

const MainNavigator = createStackNavigator({
    Home: HealthHome,
}, {
    initialRouteName: 'Home',
    defaultNavigationOptions: { headerShown: false }
});

const App = createAppContainer(MainNavigator);
export default registerRootComponent(App);
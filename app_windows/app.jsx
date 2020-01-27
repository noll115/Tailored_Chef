import React, { Component, Fragment } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { registerRootComponent } from 'expo'
import InitNav from './init_screens/InitScreenNav'
import { createSwitchNavigator } from 'react-navigation'
import MongoDB from "../app_modules/MongoDB"

import * as Font from 'expo-font';

class app extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fontloaded: false
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Quicksand': require("../assets/fonts/Quicksand-Regular.ttf"),
            'Open Sans': require("../assets/fonts/OpenSans-Regular.ttf"),
        });

        this.setState({ fontloaded: true })
    }


    render() {
        { if (!this.state.fontloaded) return null }
        return (
            <View style={{ flex: 1 }}>
                <InitNav />
            </View>
        )
    }



}
export default registerRootComponent(app)
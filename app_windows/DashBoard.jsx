
import React, { Component } from 'react';
import { View, BackHandler, ActivityIndicator } from "react-native";
import { Button, ThemeProvider, Input, Text, Card, Divider } from "react-native-elements";
import * as  Animatable from 'react-native-animatable';
import Recipe from "./Recipe";
import RecipeDetailed from "./RecipeDetailed";
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View style={{}}>

            </View>
        );
    }
}

export default DashBoard;
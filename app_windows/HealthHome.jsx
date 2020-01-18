import React, { Component } from 'react';
import { StyleSheet, Dimensions } from "react-native";
import { Button, ThemeProvider, Input } from "react-native-elements";
import * as  Animatable from 'react-native-animatable';
import { registerRootComponent } from "expo";
import MongoDB from "../app_modules/MongoDB";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Recipe from "./Recipe";


const animateUp = {
    from: {
        height: Dimensions.get("window").height / 2
    },
    to: {
        height: Dimensions.get("window").height / 10
    }
}

class HealthHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            calorieGoal: null,
        };
    }

    componentDidMount() {
        MongoDB.loadClient().then(() => this.setState({ loggedIn: true }))
    }

    onSubmitCal = calories => {
        this.setState({ calorieGoal: calories })
    }

    InputAnim = props => {
        <Input placeholder='Calories Goal'
            leftIcon={{ type: 'font-awesome', name: 'chevron-right' }}
            keyboardType="numeric"
            containerStyle={{ alignSelf: 'flex-end', width: "80%" }}
            onSubmitEditing={this.onSubmitCal}
        />
    }


    render() {
        return (
            <ThemeProvider>
                <Animatable.View
                    style={{
                        height: Dimensions.get('window').height / 2, flexDirection: "row", justifyContent: "center"
                    }}

                >
                    <Input placeholder='Calories Goal'
                        leftIcon={{ type: 'font-awesome', name: 'chevron-right' }}
                        keyboardType="numeric"
                        containerStyle={{ alignSelf: 'flex-end', width: "80%" }}
                        onSubmitEditing={this.onSubmitCal}
                    />
                </Animatable.View>

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
    Recipe: Recipe
}, {
    initialRouteName: 'Home',
    defaultNavigationOptions: { headerShown: false }
});

const App = createAppContainer(MainNavigator);
export default registerRootComponent(App);
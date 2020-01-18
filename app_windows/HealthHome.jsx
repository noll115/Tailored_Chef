import React, { Component } from 'react';
import { View, Button, StyleSheet, TextInput, Dimensions } from "react-native";
import { registerRootComponent } from "expo";
import MongoDB from "../app_modules/MongoDB";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Recipe from "./Recipe";
class HealthHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            calorieGoal: null
        };
    }

    componentDidMount() {
        MongoDB.loadClient().then(() => this.setState({ loggedIn: true }))
    }

    onChangeText = text => {
        console.log(text);

    }

    render() {
        return (<View style={styles}>
            <TextInput
                style={{ margin:Dimensions.get('window').height/2,height: 40,width:Dimensions.get('window').width/2, borderColor: 'gray', borderWidth: 1,alignSelf:'center' }}
                onChangeText={this.onChangeText}
                onSubmitEditing={()=>this.props.navigation.navigate("Recipes")}
                keyboardType="number-pad"
            />
        </View>);
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
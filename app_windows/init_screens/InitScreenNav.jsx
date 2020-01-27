import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { Animated } from 'react-native';
import StartScreen from './StartScreen'
import FitnessGoals from './FitnessGoals'
import Preferences from './Preferences'
import EndScreen from './EndScreen'

const SlideIn = ({ current, next, index, layouts }) => {
     const { screen } = layouts;

     const translateX = Animated.add(
          current.progress,
          next ? next.progress : 0
     ).interpolate({
          inputRange: [0, 1, 2],
          outputRange: [screen.width, 0, -screen.width]
     });

     return {
          cardStyle: {
               transform: [{ translateX }]
          }
     }
}

const InitStackNav = createStackNavigator({
     StartScreen: StartScreen,
     FitnessGoals: FitnessGoals,
     Preferences: Preferences,
     EndScreen: EndScreen,
}, {
     initialRouteName: 'StartScreen',
     defaultNavigationOptions: {
          headerShown: false,
          cardStyleInterpolator: SlideIn,
          cardStyle:{
               flex:3
          }
     },
});

const InitNav = createAppContainer(InitStackNav);

const IndicatorDots = (props) => {
     const { stackIndex } = props;
     let dots = [];
     for (let i = 0; i < 4; i++) {
          let dotStyle = { backgroundColor: stackIndex == i ? "#49274A" : "#94618E" }
          dots.push(
               <View key={i} style={[style.dotDisabled, dotStyle]} />
          );

     }
     return (
          <View style={{ height: 15, flexDirection: "row", justifyContent: "center" }}>
               {dots}
          </View>
     )
}

let style = StyleSheet.create({
     dotDisabled: {
          width: 15,
          height: "100%",
          marginHorizontal: "3%",
          borderRadius: 100
     }
})



export class InitScreen extends Component {
     constructor(props) {
          super(props);
          this.state = {
               index: 0
          }
     }
     onNavChange = (prevState, newState, action) => {
          this.setState({ index: newState.index })
     }
     render() {
          return (
               <View style={{ flex: 1, backgroundColor: "red" }}>
                    <InitNav  onNavigationStateChange={this.onNavChange} />
                    <View style={{ flex: 0.13, justifyContent: "center" }}>
                         <IndicatorDots stackIndex={this.state.index} />
                    </View>
               </View>
          )
     }
}




export default InitScreen;

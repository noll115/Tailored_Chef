import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { registerRootComponent } from 'expo';
import { Text, CheckBox, Image, Button } from 'react-native-elements';
import MongoDB from "../app_modules/MongoDB"
import Recipes from "./Recipes";
import DashBoard from './DashBoard';

class fitnessButton extends Component {
     render() {
          <View styles={styles.fitnessText}>
               <Text styles={styles.fitnessHeading}>apples</Text>
               <Text styles={styles.fitnessSubheading}>bananas</Text>
          </View>
     }
}

class FirstOnboarding extends Component {
     state = {
          isloggedIn: false
     }
     render() {
          if (!MongoDB.isLoggedIn()) return null;
          return (
               <View style={styles.container}>
                    <Text style={styles.heading}>WELCOME</Text>
                    <Text style={styles.subtext}>short introduction</Text>
                    <Image
                         source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }}
                         style={styles.image}
                    />
                    <Text style={styles.subtext}>better introduction</Text>
                    <Button
                         icon={{
                              // name: "arrow-right",
                              size: 15,
                              color: "white"
                         }}
                         title="Next"
                         onPress={() => this.props.navigation.navigate('FitnessGoals', {
                              mongodb: MongoDB
                         })}
                    />
               </View>
          )
     }
     componentDidMount() {
          MongoDB.loadClient().then(() => this.setState({ isloggedIn: true }));
     }
}

class FitnessGoals extends Component {

     constructor(props) {
          super(props);


          this.state = {
               loggedIn: false,
               calorieGoal: null,

               buildState: false,
               weightState: false,
               healthState: false,
               enduranceState: false,
               dietState: false

          };
     }

     render() {
          return (
               <View style={styles.container}>
                    <Text style={styles.heading}>Fitness Goals</Text>
                    <Text style={styles.subtext}>What is your main fitness goal?</Text>
                    <CheckBox
                         center
                         title='General'
                         containerStyle={styles.fitnessContainer}
                         textStyle={styles.fitnessText}
                         checkedIcon='check-circle'
                         uncheckedIcon='universal-access'
                         checkedColor='#FFF'
                         uncheckedColor="#FFF"
                         checked={this.state.buildState}
                         onPress={() => this.setState({
                              checked: true,

                              buildState: true,
                              weightState: false,
                              healthState: false,
                              enduranceState: false,
                              dietState: false,

                              calorieGoal: 3000
                         })}
                    />
                    <CheckBox
                         center
                         title='Body building'
                         containerStyle={styles.fitnessContainer}
                         textStyle={styles.fitnessText}
                         checkedIcon='check-circle'
                         // uncheckedIcon='fist-raised'
                         checkedColor='#FFF'
                         uncheckedColor="#FFF"
                         checked={this.state.weightState}
                         onPress={() => this.setState({
                              checked: true,

                              weightState: true,
                              buildState: false,
                              healthState: false,
                              enduranceState: false,
                              dietState: false,

                              calorieGoal: 1500
                         })}
                    />
                    <CheckBox
                         center
                         title='Fuel'
                         containerStyle={styles.fitnessContainer}
                         textStyle={styles.fitnessText}
                         checkedIcon='check-circle'
                         // uncheckedIcon='running'
                         checkedColor='#FFF'
                         uncheckedColor="#FFF"
                         checked={this.state.enduranceState}
                         onPress={() => this.setState({
                              checked: true,

                              enduranceState: true,
                              buildState: false,
                              weightState: false,
                              healthState: false,
                              dietState: false,

                              calorieGoal: 2500
                         })}
                    />
                    <CheckBox
                         center
                         title='Weight loss'
                         containerStyle={styles.fitnessContainer}
                         textStyle={styles.fitnessText}
                         checkedIcon='check-circle'
                         uncheckedIcon='heartbeat'
                         checkedColor='#FFF'
                         uncheckedColor="#FFF"
                         checked={this.state.dietState}
                         onPress={() => this.setState({
                              checked: true,

                              dietState: true,
                              buildState: false,
                              weightState: false,
                              healthState: false,
                              enduranceState: false,

                              calorieGoal: 2000
                         })}
                    />
                    <Button
                         disabled={this.state.checked ? undefined : true}
                         title="Next"
                         buttonStyle={styles.nextButton}
                         onPress={() => this.props.navigation.navigate('CuisinePreferences', {
                              calorieGoal: this.state.calorieGoal,
                              mongodb: this.props.navigation.getParam('mongodb', null)
                         })}
                    />
               </View>
          )
     }
}

class CuisinePreferences extends Component {

     constructor(props) {
          super(props);
          this.state = {
               loggedIn: false,
               cuisinePreferences: [],

               asianState: false,
               americanState: false,
               southernState: false,
               hispanicState: false,
               mediterraneanState: false

          };
     }

     render() {
          return (
               <View style={styles.container}>
                    <Text h4 style={styles.heading}>Cuisine Preferences!</Text>
                    <Text style={styles.subtext}>short introduction</Text>
                    <View>
                         <CheckBox
                              center
                              title='Asian'
                              checkedColor='green'
                              checked={this.state.asianState}
                              onPress={() => {
                                   this.setState({ asianState: !this.state.asianState });
                                   if (!this.state.asianState) {
                                        if (!this.state.cuisinePreferences.includes('ASN'))
                                             this.state.cuisinePreferences.push('ASN')
                                   } else
                                        this.state.cuisinePreferences = this.state.cuisinePreferences.filter((element) => {
                                             return element != 'ASN'
                                        });
                              }}
                         />
                         <CheckBox
                              center
                              title='American'
                              checkedColor='green'
                              checked={this.state.americanState}
                              onPress={() => {
                                   this.setState({ americanState: !this.state.americanState });
                                   if (!this.state.americanState) {
                                        if (!this.state.cuisinePreferences.includes('AMRN'))
                                             this.state.cuisinePreferences.push('AMRN')
                                   } else
                                        this.state.cuisinePreferences = this.state.cuisinePreferences.filter((element) => { return element != 'AMRN' });
                              }}
                         />
                         <CheckBox
                              center
                              title='Southern'
                              checkedColor='green'
                              checked={this.state.southernState}
                              onPress={() => {
                                   this.setState({ southernState: !this.state.southernState });
                                   if (!this.state.southernState) {
                                        if (!this.state.cuisinePreferences.includes('STHRN'))
                                             this.state.cuisinePreferences.push('STHRN')
                                   } else
                                        this.state.cuisinePreferences = this.state.cuisinePreferences.filter((element) => { return element != 'STHRN' });
                              }}
                         />
                         <CheckBox
                              center
                              title='Hispanic'
                              checkedColor='green'
                              checked={this.state.hispanicState}
                              onPress={() => {
                                   this.setState({ hispanicState: !this.state.hispanicState });
                                   if (!this.state.hispanicState) {
                                        if (!this.state.cuisinePreferences.includes('HISP'))
                                             this.state.cuisinePreferences.push('HISP')
                                   } else
                                        this.state.cuisinePreferences = this.state.cuisinePreferences.filter((element) => { return element != 'HISP' });
                              }}
                         />
                         <CheckBox
                              center
                              title='Mediterranean'
                              checkedColor='green'
                              checked={this.state.mediterraneanState}
                              onPress={() => {
                                   this.setState({
                                        mediterraneanState: !this.state.mediterraneanState
                                   });
                                   if (!this.state.mediterraneanState) {
                                        if (!this.state.cuisinePreferences.includes('MTRN'))
                                             this.state.cuisinePreferences.push('MTRN')
                                   } else
                                        this.state.cuisinePreferences = this.state.cuisinePreferences.filter((element) => { return element != 'MTRN' });
                              }}
                         />
                    </View>
                    <Button
                         icon={{
                              // name: "arrow-right",
                              size: 15,
                              color: "white"
                         }}
                         title="Submit"
                         onPress={() => this.props.navigation.navigate('LastOnboarding', {
                              mongodb: this.props.navigation.getParam('mongodb', null),
                              calorieGoal: this.props.navigation.getParam('calorieGoal', null)

                         })}
                    />
               </View>
          )
     }
}

class LastOnboarding extends Component {
     constructor(props) {
          super(props)

     }
     render() {
          return (
               <View style={styles.container}>
                    <Text style={styles.heading}>You're All Set!</Text>
                    <Text style={styles.subtext}>short introduction</Text>
                    <Image
                         source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }}
                         style={styles.image}
                    />
                    <Button
                         icon={{
                              // name: "arrow-right",
                              size: 15,
                              color: "white"
                         }}
                         title="Click here to get started!"
                         onPress={() => this.props.navigation.navigate('Dash', {
                              mongodb: this.props.navigation.getParam('mongodb', null),
                              calorieGoal: this.props.navigation.getParam('calorieGoal', 0)
                         })}
                    />
               </View>
          )
     }
}

const OnboardingStack = createStackNavigator({
     init: FirstOnboarding,
     FitnessGoals: FitnessGoals,
     CuisinePreferences: CuisinePreferences,
     LastOnboarding: LastOnboarding,
     Recipes: Recipes,
     Dash: DashBoard
}, {
     initialRouteName: 'init',
     defaultNavigationOptions: { headerShown: false }
});

const styles = StyleSheet.create({
     container: {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          backgroundColor: '#F8EEE7',
          alignItems: 'center',
     },
     fitnessContainer: {
          backgroundColor: '#94618E',
     },
     fitnessText: {
          color: '#FFFFFF'
     },
     heading: {
          fontSize: 45,
          marginTop: 50
     },
     subtext: {
          marginBottom: 28,
          fontSize: 16
     },
     nextButton: {
          marginTop: 25,
          marginBottom: 42,
          width: 160,
          backgroundColor: '#94618E'
     },
     image: {
          width: 200,
          height: 200
     },
     menuImages: {
          width: 150,
          height: 150,
     },
     menuImagesSelected: {
          borderWidth: 5
     }
});

const AppContainer = createAppContainer(OnboardingStack);
export default registerRootComponent(AppContainer)
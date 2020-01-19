import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { registerRootComponent } from 'expo';
import { CheckBox, Image } from 'react-native-elements';
import MongoDB from "../app_modules/MongoDB"
import Recipes from "./Recipes";

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
                              name: "arrow-right",
                              size: 15,
                              color: "white"
                         }}
                         title="Submit"
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
          console.log();


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
                    <Text style={styles.heading}>Fitness Goals!</Text>
                    <Text style={styles.subtext}>short introduction</Text>
                    <CheckBox
                         center
                         title='Build Muscle'
                         checkedIcon='dot-circle-o'
                         uncheckedIcon='circle-o'
                         checked={this.state.buildState}
                         onPress={() => this.setState({
                              checked: !this.state.buildState,

                              buildState: !this.state.buildState,
                              weightState: false,
                              healthState: false,
                              enduranceState: false,
                              dietState: false,

                              calorieGoal: 3000
                         })}
                    />
                    <CheckBox
                         center
                         title='Lose Weight'
                         checkedIcon='dot-circle-o'
                         uncheckedIcon='circle-o'
                         checked={this.state.weightState}
                         onPress={() => this.setState({
                              checked: !this.state.weightState,

                              weightState: !this.state.weightState,
                              buildState: false,
                              healthState: false,
                              enduranceState: false,
                              dietState: false,

                              calorieGoal: 1500
                         })}
                    />
                    <CheckBox
                         center
                         title='Improve Mental Health'
                         checkedIcon='dot-circle-o'
                         uncheckedIcon='circle-o'
                         checked={this.state.healthState}
                         onPress={() => this.setState({
                              checked: !this.state.healthState,

                              healthState: !this.state.healthState,
                              buildState: false,
                              weightState: false,
                              enduranceState: false,
                              dietState: false,

                              calorieGoal: 2000
                         })}
                    />
                    <CheckBox
                         center
                         title='Improve Physical Endurance'
                         checkedIcon='dot-circle-o'
                         uncheckedIcon='circle-o'
                         checked={this.state.enduranceState}
                         onPress={() => this.setState({
                              checked: !this.state.enduranceState,

                              enduranceState: !this.state.enduranceState,
                              buildState: false,
                              weightState: false,
                              healthState: false,
                              dietState: false,

                              calorieGoal: 2500
                         })}
                    />
                    <CheckBox
                         center
                         title='Achieve a Well-Balanced Diet'
                         checkedIcon='dot-circle-o'
                         uncheckedIcon='circle-o'
                         checked={this.state.dietState}
                         onPress={() => this.setState({
                              checked: !this.state.dietState,

                              dietState: !this.state.dietState,
                              buildState: false,
                              weightState: false,
                              healthState: false,
                              enduranceState: false,

                              calorieGoal: 2000
                         })}
                    />
                    <Button
                         icon={{
                              name: "arrow-right",
                              size: 15,
                              color: "white"
                         }}
                         title="Submit"
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
                    <Text style={styles.heading}>Cuisine Preferences!</Text>
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
                              name: "arrow-right",
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
                              name: "arrow-right",
                              size: 15,
                              color: "white"
                         }}
                         title="Click here to get started!"
                         onPress={() => this.props.navigation.navigate('Recipes', {
                              mongodb: this.props.navigation.getParam('mongodb', null),
                              calorieGoal: this.props.navigation.getParam('calorieGoal', null)
                         })}
                    />
               </View>
          )
     }
}

const OnboardingStack = createStackNavigator({
     FirstOnboarding: FirstOnboarding,
     FitnessGoals: FitnessGoals,
     CuisinePreferences: CuisinePreferences,
     LastOnboarding: LastOnboarding,
     Recipes: Recipes
}, {
     initialRouteName: 'FirstOnboarding',
     defaultNavigationOptions: { headerShown: false }
});

const styles = StyleSheet.create({
     container: {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
     },
     heading: {
          fontSize: 24,
          fontWeight: 'bold',
          marginTop: 15
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
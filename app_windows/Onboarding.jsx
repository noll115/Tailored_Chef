import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { registerRootComponent } from 'expo';
import { Text, CheckBox, Image, Button } from 'react-native-elements';
import MongoDB from "../app_modules/MongoDB"
import Recipes from "./Recipes";
import DashBoard from './DashBoard';
import Groceries from './Groceries';
import * as Font from 'expo-font';
import Logo from "../assets/images/chef.svg"
import { CardStyleInterpolators } from 'react-navigation-stack';
import { Animated } from 'react-native';




class FirstOnboarding extends Component {
     state = {
          isloggedIn: false,
          fontloaded: false
     }
     render() {

          { if (!this.state.fontloaded) return null }
          if (!MongoDB.isLoggedIn()) {
               return (
                    <View style={{ width: "100%", height: "100%", alignItems: "center" }}>
                         <Text style={{ fontWeight: "bold", height: "100%", textAlignVertical: "center" }}>Unable To Log Into MongoDB</Text>
                    </View>);
          }
          return (
               <View styles={styles.parentContainer}>
                    <View style={styles.container}>
                         <Text style={styles.header}>Let's get cooking.</Text>

                         <Logo style={styles.img} width={160.6} height={160} />
                    </View>
                    <Text style={styles.content}>We just have a few quick questions to tailor your experience.</Text>
                    <Button raised
                         icon={{
                              // name: "arrow-right",
                              size: 15,
                              color: "white"
                         }}
                         buttonStyle={styles.buttonStyle}
                         containerStyle={styles.buttonContainer}
                         title="Start"
                         onPress={() => this.props.navigation.navigate('FitnessGoals', {
                              mongodb: MongoDB
                         })}
                    />
               </View>
          )
     }
     async componentDidMount() {
          await Font.loadAsync({
               'Quicksand': require("../assets/fonts/Quicksand-Regular.ttf"),
               'Open Sans': require("../assets/fonts/OpenSans-Regular.ttf"),
          });

          await MongoDB.loadClient();
          this.setState({ fontloaded: true, isLoggedIn: true })
     }
}

const styles = StyleSheet.create({
     parentContainer: {
          height: "100%",
     },
     container: {
          backgroundColor: "red",
          width: "100%",
          paddingHorizontal: "15%",
          paddingTop: "10%",
          alignItems: "center"
     },
     header: {
          fontSize: 55,
          textAlign: "center",
          fontFamily: 'Quicksand',
          marginBottom: "10%"
     },
     img: {
          marginBottom: "15%"
     },
     buttonStyle: {
          backgroundColor: "#49274A",
          borderRadius: 5,
     },
     buttonContainer: {
          width: "60%",
          marginHorizontal: "20%"
     },
     content: {

          fontFamily: "Open Sans",
          fontSize: 19,
          textAlign: "center",
          width: "80%",
          margin: "10%"
     }
})

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
                    <Text style={styles.heading}>Preferences</Text>
                    <Text style={styles.subtext}>What kind of food do you like?</Text>
                    <View>
                         <CheckBox
                              center
                              title='Asian'
                              containerStyle={styles.fitnessContainer}
                              textStyle={styles.fitnessText}
                              checked={this.state.asianState}
                              checkedColor='#FFF'
                              uncheckedColor="#FFF"
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
                              containerStyle={styles.fitnessContainer}
                              textStyle={styles.fitnessText}
                              checked={this.state.americanState}
                              checkedColor='#FFF'
                              uncheckedColor="#FFF"
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
                              containerStyle={styles.fitnessContainer}
                              textStyle={styles.fitnessText}
                              checked={this.state.southernState}
                              checkedColor='#FFF'
                              uncheckedColor="#FFF"
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
                              containerStyle={styles.fitnessContainer}
                              textStyle={styles.fitnessText}
                              checked={this.state.hispanicState}
                              checkedColor='#FFF'
                              uncheckedColor="#FFF"
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
                              containerStyle={styles.fitnessContainer}
                              textStyle={styles.fitnessText}
                              checked={this.state.mediterraneanState}
                              checkedColor='#FFF'
                              uncheckedColor="#FFF"
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
                         title="Next"
                         buttonStyle={styles.nextButton}
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
                    <Text h1 style={{ alignSelf: "center", textAlign: "center", marginTop: 60 }}>Ready to get started?</Text>
                    <Image
                         source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }}
                         style={styles.image}
                    />
                    <Text style={styles.subtext}>Your custom made meal plan is just one step away.</Text>
                    <Button
                         icon={{
                              size: 15,
                              color: "white"
                         }}
                         buttonStyle={styles.nextButton}
                         title="Let's go!"
                         onPress={() => this.props.navigation.navigate('Dash', {
                              mongodb: this.props.navigation.getParam('mongodb', null),
                              calorieGoal: this.props.navigation.getParam('calorieGoal', 0)
                         })}
                    />
               </View>
          )
     }
}

const SlideIn = ({ current, next, index, layouts }) => {
     const { screen } = layouts;
     console.log(index);

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

const OnboardingStack = createStackNavigator({
     init: FirstOnboarding,
     FitnessGoals: FitnessGoals,
     CuisinePreferences: CuisinePreferences,
     LastOnboarding: LastOnboarding,
     Recipes: Recipes,
     Groceries: Groceries,
     Dash: DashBoard
}, {
     initialRouteName: 'init',
     defaultNavigationOptions: {
          headerShown: false,
          cardStyleInterpolator: SlideIn
     },
});


// const styles = StyleSheet.create({
//      container: {
//           display: 'flex',
//           flexDirection: 'column',
//           flex: 1,
//           backgroundColor: '#F8EEE7',
//           alignItems: 'center',
//      },
//      fitnessContainer: {
//           backgroundColor: '#94618E',
//      },
//      fitnessText: {
//           color: '#FFFFFF'
//      },
//      heading: {
//           fontSize: 45,
//           marginTop: 50
//      },
//      subtext: {
//           marginBottom: 28,
//           fontSize: 16
//      },
//      nextButton: {
//           marginTop: 25,
//           marginBottom: 42,
//           width: 160,
//           backgroundColor: '#94618E'
//      },
//      image: {
//           width: 200,
//           height: 200
//      },
//      menuImages: {
//           width: 150,
//           height: 150,
//      },
//      menuImagesSelected: {
//           borderWidth: 5
//      }
// });

const AppContainer = createAppContainer(OnboardingStack);
export default registerRootComponent(AppContainer)
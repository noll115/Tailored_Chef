import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, CheckBox, Image, Button } from 'react-native-elements';

class EndScreen extends Component {
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

export default EndScreen;
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from "../../assets/images/chef.svg"
import { Text, CheckBox, Image, Button } from 'react-native-elements';
import MongoDB from "../../app_modules/MongoDB"


class StartScreen extends Component {
    constructor(props) {
        super(props);
    }

    NextScreen = () =>{
        this.props.navigation.push("FitnessGoals")
    }


    render() {
        return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.header}>Let's get cooking.</Text>
                <Logo width={160} height={160} />
                <Text style={styles.content}>We just have a few quick questions to tailor your experience.</Text>
                <Button raised
                    titleStyle={styles.buttonFontStyle}
                    containerStyle={styles.buttonContainer}
                    buttonStyle={styles.buttonStyle}
                    title={"Start"} 
                    onPress={this.NextScreen}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: "15%",
        paddingTop: "10%",
        alignItems: "center"
    },
    header: {
        fontSize: 55,
        textAlign: "center",
        fontFamily: 'Quicksand',
        marginVertical: "10%"
    },
    buttonStyle: {
        backgroundColor: "#49274A",
        borderRadius: 5,
    },
    buttonFontStyle: {
        fontFamily: 'Open Sans'
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

export default StartScreen;
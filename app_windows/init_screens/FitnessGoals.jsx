import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, CheckBox, Image, Button } from 'react-native-elements';
import accessibility from "../../assets/images/accessibility.svg"
import directions from "../../assets/images/directions.svg"
import favorite from "../../assets/images/favorite.svg"
import fitness from "../../assets/images/fitness_center.svg"

class FitnessGoals extends Component {

    constructor(props) {
        super(props);

        this.state = {
            goalSelected: null
        };
    }

    fitnessGoals = {
        General: {
            text: "We'll tailor your plan for meals that follow general nutritional guidelines",
            svg: accessibility
        },
        "Body building": {
            text: "We'll tailor your plan for meals high in protein and low in carbohydrates",
            svg: fitness
        },
        Fuel: {
            text: "We'll tailor your plan for lightweight meals high in carbohydrates",
            svg: directions
        },
        "Weight loss": {
            text: "We'll tailor your plan to consist of meals low in fats and carbohydrates",
            svg: favorite
        }
    }

    selectGoal = (key) => {
        this.setState({ goalSelected: key })
    }

    nextScreen = () => {
        this.props.navigation.push("Preferences");
    }

    render() {
        let goalButtons = [];
        let goals = Object.keys(this.fitnessGoals);
        goals.forEach((goal, i) => {
            const goalBody = this.fitnessGoals[goal];
            let style = {
                borderTopRightRadius: i == 0 ? 8 : 0,
                borderTopLeftRadius: i == 0 ? 8 : 0,
                borderBottomRightRadius: i == goals.length - 1 ? 8 : 0,
                borderBottomLeftRadius: i == goals.length - 1 ? 8 : 0,
                padding: 10,
                backgroundColor: goal == this.state.goalSelected ? "#49274A" : "#94618E"
            }
            let elem = (
                <View onTouchEnd={() => this.selectGoal(goal)} key={goal} style={style} >
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                        <goalBody.svg style={{ marginRight: 10 }} />
                        <View>
                            <Text style={{ fontFamily: "Quicksand", fontSize: 25, color: "white" }}>{goal}</Text>
                            <Text style={{ width: 270, fontFamily: "Quicksand", fontSize: 16, color: "white" }}>{goalBody.text}</Text>
                        </View>
                    </View>
                </View>
            );
            goalButtons.push(elem);
        })
        return (
            <View style={{ padding: 32, paddingTop: 40, alignItems: "center" }}>
                <Text style={{ fontSize: 40, fontFamily: "Quicksand" }}>Fitness Goals</Text>
                <Text style={{ fontSize: 17, marginBottom: 25 }}>Please select your main fitness goal.</Text>
                {goalButtons}
                <Button raised
                    titleStyle={styles.buttonFontStyle}
                    containerStyle={styles.buttonContainer}
                    buttonStyle={styles.buttonStyle}
                    title={"Next"}
                    disabled={this.state.goalSelected == null}
                    onPress={this.nextScreen} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: "#49274A",
        borderRadius: 5,
    },
    buttonFontStyle: {
        fontFamily: 'Open Sans'
    },
    buttonContainer: {
        width: "60%",
        marginTop: "10%"
    },
})

export default FitnessGoals;

import React, { Component } from 'react';
import { View, BackHandler, ActivityIndicator } from "react-native";
import { Header, Icon, Text, Button, ListItem } from "react-native-elements";
import * as  Animatable from 'react-native-animatable';
import Recipe from "./Recipe";
import RecipeDetailed from "./RecipeDetailed";
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';


let data = {


    "Sunday, January 20th": {
        Breakfast: {
            general: "Chicken, noodle, and kale salad with an olive vinaigrette. Serves 1.",
            image: "https://whiskeynwry.files.wordpress.com/2015/07/img_0380.jpg",
            total_time: "20 mins"
        },
        Lunch: {
            general: "Chickpea salad with cucumber and pita chips. Serves 2.",
            image: "https://www.skinnytaste.com/wp-content/uploads/2019/06/Cucumber-Chickpea-Salad-8.jpg",
            total_time: "30 mins"
        },
        Dinner: {
            general: "Garlic sautéed shrimp with parmesan sauce and pasta. Serves 4.",
            image: "https://therecipecritic.com/wp-content/uploads/2016/08/lemongarlicparmesamshrimppasta4-667x1000.jpg",
            total_time: "1 hour 20 mins"
        }

    },
    "Monday, January 21st": {
        Breakfast: {
            general: "Chicken, noodle, and kale salad with an olive vinaigrette. Serves 1.",
            image: "https://whiskeynwry.files.wordpress.com/2015/07/img_0380.jpg",
            total_time: "20 mins"
        },
        Lunch: {
            general: "Chickpea salad with cucumber and pita chips. Serves 2.",
            image: "https://www.skinnytaste.com/wp-content/uploads/2019/06/Cucumber-Chickpea-Salad-8.jpg",
            total_time: "30 mins"
        },
        Dinner: {
            general: "Garlic sautéed shrimp with parmesan sauce and pasta. Serves 4.",
            image: "https://therecipecritic.com/wp-content/uploads/2016/08/lemongarlicparmesamshrimppasta4-667x1000.jpg",
            total_time: "1 hour 20 mins"
        }
    },
    "Tuesday, January 22nd": {
        Breakfast: {
            general: "Chicken, noodle, and kale salad with an olive vinaigrette. Serves 1.",
            image: "https://whiskeynwry.files.wordpress.com/2015/07/img_0380.jpg",
            total_time: "20 mins"
        },
        Lunch: {
            general: "Chickpea salad with cucumber and pita chips. Serves 2.",
            image: "https://www.skinnytaste.com/wp-content/uploads/2019/06/Cucumber-Chickpea-Salad-8.jpg",
            total_time: "30 mins"
        },
        Dinner: {
            general: "Garlic sautéed shrimp with parmesan sauce and pasta. Serves 4.",
            image: "https://therecipecritic.com/wp-content/uploads/2016/08/lemongarlicparmesamshrimppasta4-667x1000.jpg",
            total_time: "1 hour 20 mins"
        }
    }

}


class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days: { ...data }
        };
    }

    render() {
        let chiefTitle = <Text h2Style={{ fontWeight: "normal" }} h2>Tailord Chief</Text>;

        let dayFoodSummary = [];
        for (const day in this.state.days) {
            const daySuggestion = this.state.days[day];

            dayFoodSummary.push(<DayFoodSuggestions daySuggestion={daySuggestion} date={day} key={day} />);
        }

        return (
            <View style={{ backgroundColor: '#f8EEE7', width: "100%", height: "100%" }}>
                <View style={{ flex: 1.3 }}>
                    <Header leftComponent={{ icon: 'menu' }}
                        leftContainerStyle={{ left: "10%" }}
                        containerStyle={{ flex: 1.8, backgroundColor: "#F8EEE7" }}
                        placement="center"
                        centerComponent={{ text: chiefTitle }} />
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <Animatable.Text style={{ fontSize: 20, height: "100%", width: "50%", textAlign: "center", textAlignVertical: "center" }}>Menu</Animatable.Text>
                        <Animatable.Text style={{ fontSize: 20, height: "100%", width: "50%", textAlign: "center", textAlignVertical: "center" }}>Shopping List</Animatable.Text>
                        <Animatable.View style={{ borderBottomWidth: 3, position: "absolute", height: "100%", width: "49%", left: "0.5%" }}></Animatable.View>
                    </View>
                </View>
                <Animatable.View style={{ flex: 4 }}>
                    <View style={{ height: "100%", width: "100%" }}>
                        <SafeAreaView>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {dayFoodSummary}
                            </ScrollView>
                        </SafeAreaView>
                    </View>
                </Animatable.View>
            </View >
        );
    }
}



class DayFoodSuggestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foodForDay: []
        }
    }

    componentDidMount() {
        this.createFoodSuggestions(this.props)

    }

    createFoodSuggestions = ({ daySuggestion }) => {

        let foodForDay = [];
        for (const timeSlot in daySuggestion) {
            const foodSuggestion = daySuggestion[timeSlot];
            foodForDay.push(<FoodSlot foodData={foodSuggestion} timeSlot={timeSlot} key={timeSlot} />)
        }
        this.setState({ foodForDay })
    }

    render() {
        return (
            <View style={{ marginBottom: "10%" }}>
                <View style={{ borderBottomWidth: 1 }}>
                    <Text suppressHighlighting style={{ marginLeft: "4%", fontSize: 15 }}>{this.props.date}</Text>
                </View>
                {this.state.foodForDay}
            </View>
        );
    }
}


const FoodSlot = ({ foodData, timeSlot }) => {
    return (
        <ListItem
            containerStyle={{ backgroundColor:"#F8EEE7"}}
            subtitle={foodData.general}
            leftAvatar={{
                source: { uri: foodData.image },
                rounded: false, size: 60
            }}
            title={
                <View style={{ flexDirection: "row", flex: 1 }}>
                    <Text style={{ width: "50%", fontSize: 17 }}>{timeSlot}</Text><Text style={{ textAlign: "right", width: "50%", fontSize: 17 }}>~{foodData.total_time}</Text>
                </View>
            }
        />
    )
}


export default DashBoard;
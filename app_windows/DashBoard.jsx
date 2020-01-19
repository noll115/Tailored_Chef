
import React, { Component } from 'react';
import { View, BackHandler, ActivityIndicator, Dimensions } from "react-native";
import { Header, Icon, Text, Button, ListItem } from "react-native-elements";
import * as  Animatable from 'react-native-animatable';
import Recipe from "./Recipes";
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';


let data = {


    "Monday, January 20th": {
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
    "Tuesday, January 21st": {
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
    "Wednesday, January 22nd": {
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
            days: { ...data },
            showPanel: false
        };
    }
    panelShow = () => {
        this.setState({ showPanel: true });
    }

    panelClose = () => {
        this.setState({ showPanel: false });
    }

    render() {
        let chiefTitle = <Text h2Style={{ fontWeight: "normal" }} h2>Tailord Chef</Text>;
        let { showPanel } = this.state;
        let dayFoodSummary = [];
        let i = 1;

        for (const day in this.state.days) {
            const daySuggestion = this.state.days[day];

            dayFoodSummary.push(<DayFoodSuggestions daySuggestion={daySuggestion} date={day} key={day} delay={i * 250} />);
            i++;
        }

        return (
            <View style={{ backgroundColor: '#f8EEE7', width: "100%", height: "100%" }}>
                <View style={{ flex: 1.3 }}>
                    <Header leftComponent={<Icon name="menu" onPress={this.panelShow} underlayColor="#F4DECB" iconStyle={{ padding: 20 }} />}
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
                {this.state.showPanel ? <Panel panelCB={this.panelClose} navigation={this.props.navigation} /> : null}

            </View >

        );
    }
}

const Panel = ({ panelCB, navigation }) => {



    return (
        <Animatable.View useNativeDriver duration={500} animation="fadeInLeftBig" style={{ backgroundColor: "#f8EEE7", zIndex: 1, width: "50%", height: "100%", position: "absolute", translateX: -Dimensions.get("window").width / 2 }} >
            <View style={{ flex: 1, flexDirection: "column", width: "100%", height: "100%" }}>
                <View style={{ flex: 1 }} >
                    <Icon name="menu" iconStyle={{ marginTop: "25%", marginLeft: "50%" }} onPress={panelCB} />
                </View>
                <View style={{ flex: 6, backgroundColor: 'white' }}>
                    <Button title="Suggestions" onPress={() => navigation.navigate('Recipes', {
                        mongodb: navigation.getParam('mongodb', null),
                        calorieGoal: navigation.getParam('calorieGoal', 0)
                    })} buttonStyle={{ height: "30%", marginTop: "3%", borderRightWidth: 0, borderleftWidth: 0, borderRadius: 0, borderTopWidth: 2, borderBottomWidth: 2 }} type="outline" />
                </View>
            </View>
        </Animatable.View >)
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
            <Animatable.View animation="fadeInUp" delay={this.props.delay} useNativeDriver>
                <View style={{ marginBottom: "10%" }}>
                    <View style={{ borderBottomWidth: 1 }}>
                        <Text suppressHighlighting style={{ marginLeft: "4%", fontSize: 15 }}>{this.props.date}</Text>
                    </View>
                    {this.state.foodForDay}
                </View>
            </Animatable.View>
        );
    }
}


const FoodSlot = ({ foodData, timeSlot }) => {
    return (
        <ListItem
            containerStyle={{ backgroundColor: "#F8EEE7" }}
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
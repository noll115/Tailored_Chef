import React, { Component } from 'react';
import { StyleSheet, Dimensions, Text, View, Image } from "react-native";
import { Button, ThemeProvider, CheckBox } from "react-native-elements";
import { registerRootComponent } from "expo";
import MongoDB from "../app_modules/MongoDB";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

var chosen_recipes = [{
    "title": "Beef Stroganoff III",
    "total_time": 23,
    "yields": "8 serving(s)",
    "ingredients": {
        "spaghetti": "1 pound",
        "olive oil": "6 tablespoons",
        "garlic": "2",
        "ground black pepper": "2 teaspoons",
        "Pecorino Romano cheese": "1.75 cups"
    },
    "instructions": "Remove any fat and gristle from the roast and cut into strips 0.5 inch thick by 2 inches long. Season with 0.5 teaspoon of both salt and pepper.\nIn a large skillet over medium heat, melt the butter and brown the beef strips quickly, then push the beef strips off to one side. Add the onions and cook slowly for 3 to 5 minutes, then push to the side with the beef strips.\nStir the flour into the juices on the empty side of the pan. Pour in beef broth and bring to a boil, stirring constantly. Lower the heat and stir in mustard. Cover and simmer for 1 hour or until the meat is tender.\nFive minutes before serving, stir in the mushrooms, sour cream, and white wine. Heat briefly then salt and pepper to taste.\n",
    "image": "../assets/breakfast.jpg",
    "calories": 912
},
{
    "title": "Lime Chicken Soft Tacos",
    "total_time": 40,
    "yields": "10 serving(s)",
    "ingredients": {
        "garlic": "2",
        "olive oil": "3 tablespoons",
        "cauliflower": "1",
        "grated Parmesan cheese": "1/3 cup",
        "chopped fresh parsley": "1 tablespoon"
    },
    "instructions": "Step 1 Saute chicken in a medium saucepan over medium high heat for about 20 minutes. Add vinegar, lime juice, sugar, salt, pepper, green onion, garlic and oregano. Simmer for an extra 10 minutes. Advertisement\nStep 2 Heat an iron skillet over medium heat. Place a tortilla in the pan, warm, and turn over to heat the other side. Repeat with remaining tortillas. Serve lime chicken mixture in warm tortillas topped with tomato, lettuce, cheese and salsa.",
    "image": "../assets/lunch.jpg",
    "calories": 635
},
{
    "title": "Butternut Squash Soup II",
    "total_time": 50,
    "yields": "4 serving(s)",
    "ingredients": {
        "vegetable oil": "1 teaspoon",
        "onion": "1",
        "garlic": "3",
        "quinoa": "0.75 cup",
        "vegetable broth": "1.5 cups",
        "ground cumin": "1 teaspoon",
        "cayenne pepper": "0.25 teaspoon",
        "frozen corn kernels": "1 cup",
        "black beans": "15 ounce",
        "cilantro": "0.5 cup"
    },
    "instructions": "Melt the butter in a large pot, and cook the onion, celery, carrot, potatoes, and squash 5 minutes, or until lightly browned. Pour in enough of the chicken stock to cover vegetables. Bring to a boil. Reduce heat to low, cover pot, and simmer 40 minutes, or until all vegetables are tender.\nTransfer the soup to a blender, and blend until smooth. Return to pot, and mix in any remaining stock to attain desired consistency. Season with salt and pepper.\n",
    "image": "../assets/dinner.jpg",
    "calories": 219
}];
var groceries = {};

function getGroceries() {
    for (var i in chosen_recipes) {
        Object.keys(chosen_recipes[i].ingredients).forEach(function (ikey) {
            Object.keys(groceries).forEach(function (gkey) {
                //if keys match
                if (gkey == ikey) {
                    var measured = chosen_recipes[i].ingredients[ikey].split();
                    measured[0] = parseInt(measured[0]);
                    var g_measured = groceries[gkey].split;
                    g_measured[0] = parseInt(g_measured[0]);
                    //check measurement
                    if (measured[1] == g_measured[1]) {
                        //add numbers and save into groceries
                        groceries[ikey] = g_measured[0] + measured[0] + " " + g_measured[1];
                        return;
                    }
                }
            });
            //if they dont match, add to groceries
            groceries[ikey] = chosen_recipes[i].ingredients[ikey];
        });
    }
}

class GroceryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        };
    }

    render() {
        return (
            <CheckBox
                title={this.props.name}
                containerStyle={styles.fitnessContainer}
                textStyle={styles.fitnessText}
                checked={this.state.checked}
                onPress={() => this.setState({ checked: !this.state.checked })}
            />
        );
    }
}

class Groceries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };
    }
    componentDidMount() {
        MongoDB.loadClient().then(() => this.setState({ loggedIn: true }))
    }

    createGroceryList() {
        getGroceries();
        let list = [];
        Object.keys(groceries).forEach(function (key) {
            list.push(<GroceryItem style={styles.list} name={groceries[key] + " " + key} key={key} />);
        });
        return list;
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.title}>Grocery List</Text>
                        {this.createGroceryList()}
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8EEE7',
    },
    title: {
        marginHorizontal: 82,
        marginVertical: 23,
        color: "#94618E",
        fontSize: 34,
        fontFamily: 'Roboto',
        textAlign: "center",
    },
    list: {
        backgroundColor: '#F8EEE7',
        fontSize: 16,
        fontFamily: 'Roboto',
    },
    grocery: {
        flexDirection: "column",
        margin: 10,
        width: 24,
        height: 24,
        color: "#49274A",
    },
    fitnessContainer: {
        backgroundColor: '#94618E',
   },
    fitnessText: {
        color: '#FFFFFF'
   },
});

export default Groceries;
import { Card, Image, ListItem, Tile, Text, Button, Icon } from "react-native-elements";
import * as  Animatable from 'react-native-animatable';
import React from 'react';

import { View, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RecipeDetailed = ({ recipe,btnPressed }) => {
    return (
        <SafeAreaView style={{ width: "100%" }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={{ uri: recipe.image }} containerStyle={{ height: 200, width: "100%" }} />
                <View style={{ height: 100, paddingTop: "2%", width: "100%", alignItems: 'center', justifyContent: 'center' }}>
                    <Text h2 h2Style={{ fontSize: 30, paddingBottom: "3%" }} >{recipe.title}</Text>
                    <View style={{ flex: 1, alignItems: "center", flexDirection: "row", width: "100%" }}>
                        <Text style={{ width: "50%", paddingLeft: "10%", textDecorationLine: "underline" }} h4>Calories:{recipe.calories}</Text>
                        <Text style={{ width: "50%", textAlign: "right", paddingRight: "10%", textDecorationLine: "underline" }} h4>Cook Time:{recipe.total_time}</Text>
                    </View>
                </View>
                <View >
                    {recipe.ingredients.map((element, i) => {
                        return <ListItem style={{ paddingTop: "1%" }}
                            key={i}
                            title={element}
                            leftIcon={{ type: 'font-awesome', name: 'glass' }}
                        />
                    })}
                </View>
                <View style={{ width: Dimensions.get("window").width }}>
                    <Button icon={<Icon name="note-add" color="white" size={30} />}
                        containerStyle={{ marginTop: "5%", width: "80%", alignSelf: "center" }} title="Make Later" onPress={btnPressed} />
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

export default RecipeDetailed;
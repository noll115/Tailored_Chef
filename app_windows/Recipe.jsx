import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native'
import { Card, Image, ListItem } from "react-native-elements";
import * as  Animatable from 'react-native-animatable';

class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = { recipe: props.recipe };
    }

    fadeTransition = {
        0: {
            opacity: 1,
        },
        0.6: {
            opacity: 0.2,
        },
        0.7: {
            opacity: 0,
        }
    }
    BtnPressed = () => {
        this.item.animate({ 0: { scaleX: 1, scaleY: 1 }, 0.5: { scaleX: 0.9, scaleY: 0.9 }, 1: { scaleX: 1, scaleY: 1 } }, 200).then(() => {
            this.props.onPress(this.state.recipe._id);
        })
    }
    setRef = ref => this.item = ref;
    render() {
        let { recipe } = this.state;
        let animProps = { animation: null }
        let { state } = this.props
        switch (state) {
            case "fadeIn":
                animProps.animation = "fadeInRightBig";
                break;
            case "fadeOut":
                animProps.animation = "fadeOutLeftBig";
                break;
            case "scale":
                animProps.animation = this.fadeTransition;
                animProps.onAnimationEnd = this.props.scaleCB;
                break;
        }
        return (
            <Animatable.View ref={this.setRef} useNativeDriver  {...animProps} useNativeDriver delay={this.props.delay} >
                <ListItem
                    leftAvatar={{
                        containerStyle: { transform: [{ scale: 1.2 }] },
                        size: "large", rounded: false, source: { uri: recipe.image }, renderPlaceholderContent: <ActivityIndicator />
                    }} style={{ marginBottom: 4 }}
                    title={recipe.title}
                    subtitle={`Cals: ${recipe.calories}`}
                    onPress={this.BtnPressed}
                    bottomDivider chevron />
            </Animatable.View>
        );
    }
}

export default Recipe;
import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    TouchableHighlight
} from 'react-native';
import { graphql, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import logo from '../static/cardiogram.png'
import {
    StackNavigator,
} from 'react-navigation';

import {
    PricingCard,
    ListItem,
    FormLabel,
    FormInput,
    SocialIcon,
    SearchBar,
    Icon,
    Avatar,
    Button,
    FormValidationMessage
} from 'react-native-elements'

export default (props) => {
    return (
        <Wrapper {...props}/>
    )
}

class ProfileComponent extends Component {
    render(){
        return(
            <View>
                <Text>
                    Profile Component
                </Text>
            </View>
        )
    }
}

let Wrapper = compose(
    withApollo
)(ProfileComponent)
import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
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
import { graphql, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import logo from '../static/cardiogram.png'

export default (props) => {
    return(
        <Wrapper {...props}/>
    )
}

class Booking extends Component {
    render(){
        return(
            <View>
                <Text>
                    Booking
                </Text>
            </View>
        )
    }
}

let Wrapper = compose(
    withApollo
)(Booking)
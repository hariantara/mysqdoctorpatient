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


class Home extends Component {
    
    render(){
        return(
            <View>
                <Text>Home</Text>
            </View>
        )
    }
}

export default Home
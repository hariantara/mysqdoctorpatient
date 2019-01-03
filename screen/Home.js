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
import firebase from 'react-native-firebase'

class Home extends Component {
    constructor(props){
        super(props)
    }

    checkPermission = async()=>{
        try {
            const enabled = await firebase.messaging().hasPermission();
            console.log('enabled: ', enabled)
            if (enabled) {
                // user has permissions
                const fcmToken = await firebase.messaging().getToken();
                console.log('fcmToken: ', fcmToken)
                if (fcmToken) {
                    // user has a device token
                } else {
                    // user doesn't have a device token yet
                }
            } else {
                // user doesn't have permission
            }
            // User has authorised
        } catch (error) {
            // User has rejected permissions
        }
    }

    componentDidMount() {
        this.checkPermission()
        this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
            // Process your token as required
        });
        this.messageListener = firebase.messaging().onMessage((message) => {
            // Process your message as required
        });
    }

    componentWillUnmount() {
        this.onTokenRefreshListener();
        this.messageListener();
    }
    render(){
        return(
            <View>
                <Text>Home</Text>
            </View>
        )
    }
}

export default Home
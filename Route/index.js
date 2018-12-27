import React, {Component} from 'react'

import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';

import Home from '../screen/Home'
import Login from '../screen/Login'
import Profile from '../screen/Profile'
import Booking from '../screen/Booking'

const Navigations = StackNavigator({
    Login: {screen: Login},
    Home: TabNavigator({
        Home: {
            screen: Home,
            navigationOptions: ({ navigation }) => ({
                title: 'Home',
            }),
        },
        Profile: {
            screen: Profile,
            navigationOptions: ({ navigation }) => ({
                title: 'Profile',
            }),
        },
        Booking: {
            screen: Booking,
            navigationOptions: ({ navigation }) => ({
                title: 'Booking',
            }),
        }
    })
}, {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        },
        initialRouteName: 'Login'
})

export default Navigations
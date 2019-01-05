import React, {Component} from 'react'

import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';

import Home from '../screen/Home'
import Login from '../screen/Login'
import Profile from '../screen/Profile'
import Booking from '../screen/Booking'
import DetailProfile from '../component/DetailProfile'
import BookingDetail  from '../component/BookingDetail'

const Navigations = StackNavigator({
    Login: {
        screen: Login,
        navigationOptions: ({ navigation }) => ({
            title: 'Login',
        }),
    },
    Home: TabNavigator({
        Home: StackNavigator({
            Home: {
                screen: Home,
                navigationOptions: ({ navigation }) => ({
                    title: 'Home',
                }),
            },
            BookingDetail: {
                screen: BookingDetail,
                navigationOptions: ({ navigation }) => ({
                    title: 'Book Detail',
                }),
            }
        }, {
                headerMode: 'none',
                navigationOptions: {
                    headerVisible: false,
                },
                initialRouteName: 'Home'
            }),
        Profile: StackNavigator({
            Profile: {
                screen: Profile,
                navigationOptions: ({ navigation }) => ({
                    title: 'Profile',
                }),
            },
            DetailProfile: {
                screen: DetailProfile,
                navigationOptions: ({ navigation }) => ({
                    title: 'Detail',
                }),
            }
        },{
                headerMode: 'none',
                navigationOptions: {
                    headerVisible: false,
                },
                initialRouteName: 'Profile'
        }),
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
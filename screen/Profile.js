import React,  {Component} from 'react'
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

import ProfileComponent from '../component/ProfileComponent'

export default (props) => {
    return (
        <Wrapper {...props}/>
    )
}

class Profile extends Component {

    render(){
        console.log('Props Profile: ', this.props)
        return(
            <View>
                <ProfileComponent navigation={this.props.navigation}/>
            </View>
        )
    }
}

let Wrapper = compose(
    withApollo
)(Profile)
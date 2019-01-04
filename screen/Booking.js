import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity,
    TouchableHighlight
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
// import DateTimePicker from '../component/DateTimePicker'
// import DateTimePickerTester from '../component/DateTimePicker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Dropdown } from 'react-native-material-dropdown';
import CreateBooking from '../component/BookingComponent'

export default (props) => {
    return(
        <Wrapper {...props}/>
    )
}

class Booking extends Component {
    constructor(props){
        super(props)

        this.state = {
            
        }
    }


    render(){
        console.log('state booking: ', this.state)
        return(
            <View style={{flex: 1}}>
                <CreateBooking/>
            </View>
        )
    }
}

let Wrapper = compose(
    withApollo
)(Booking)
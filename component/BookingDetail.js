import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    FlatList,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import { graphql, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import logo from '../static/cardiogram.png'
import {
    StackNavigator,
} from 'react-navigation';

import {
    Card,
    PricingCard,
    ListItem,
    List,
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

class BookingDetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            detail: []
        }
    }

    componentDidMount(){
        if(!this.props.data.loading){
            let {data} = this.props 
            if(data){
                let {getDetailBookApp} = data 
                if(getDetailBookApp){
                    let {booking} = getDetailBookApp
                    if(booking){
                        // let detaiData = []
                        // detailData.push(booking)
                        this.setState({
                            detail: [booking]
                        })
                    }
                }
            }
        }
    }

    componentWillReceiveProps(nextProps){
        if(!nextProps.data.loading){
            let { data } = nextProps
            if (data) {
                let { getDetailBookApp } = data
                if (getDetailBookApp) {
                    let { booking } = getDetailBookApp
                    if (booking) {
                        // let detaiData = []
                        // detailData.push(booking)
                        this.setState({
                            detail: [booking]
                        })
                    }
                }
            }
        }
    }

    render(){
        console.log('Props Detail Booking: ', this.props)
        console.log('State Booking Detail: ', this.state)
        if(this.props.data.loading){
            return(
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#00000f"></ActivityIndicator>
                </View>
            )
        }
        return(
            <View>
                <Card>
                    {
                        this.state.detail.map(data => {
                            return(
                                <View key={String(data.id)}>
                                    <Avatar
                                        medium
                                        rounded
                                        source={{ uri: data.doctor_photo }}
                                        activeOpacity={0.7}
                                    />
                                    <PricingCard
                                        color={data.status === "request" ? "grey" : data.status === "accept" ? "green" : "red" }
                                        title={data.book_id}
                                        // price={data.time}
                                        info={[data.doctor_name, data.time]}
                                        button={{ title: data.status === "request" ? "waiting response" : data.status === "accept" ? "accepted" : "declined" }}
                                    />
                                </View>
                            )
                        })
                    }
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

let Queries = {
    getDetailBookApp: gql`
        query getDetailBookApp (
            $book_id: Int
        ){
            getDetailBookApp(book_id: $book_id){
                booking{
                    id, 
                    book_id
                    clinic_id
                    patient_id
                    patient_name
                    patient_photo
                    doctor_id
                    doctor_name
                    doctor_photo
                    symptom
                    time
                    status
                    created_at
                    updated_at
                    deleted_at
                },
                    error
            }
        }
    `
}

let Wrapper = compose(
    graphql(Queries.getDetailBookApp,{
        options: props => {
            return {
                variables: {book_id: parseInt(props.navigation.state.params.params)},
                fetchPolicy: "cache-and-network",
                ssr: false
            }
        }
    }),
    withApollo
)(BookingDetail)
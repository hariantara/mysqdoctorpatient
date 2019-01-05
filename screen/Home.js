import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    ScrollView,
    FlatList,
    KeyboardAvoidingView,
    ActivityIndicator,
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
import firebase from 'react-native-firebase'
import moment from 'moment'

export default (props) => {
    return(
        <Wrapper {...props}/>
    )
}

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            book: [],
            search: ""
        }
    }

    componentWillMount(){
        this.checkPermission()
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
                    let submit = await this.props.client
                        .query({
                            query: gql`
                                query saveFCMToken (
                                    $token: String
                                ){
                                    saveFCMToken(token: $token)
                                }
                            `,
                            variables: {
                                token: fcmToken
                            }
                        })
                    console.log('submit: ', submit)
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

    componentWillReceiveProps(nextProps){
        if(!nextProps.data.loading){
            this.setState({
                book: nextProps.data.getAllBookApp.booking
            })
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
        if(!this.props.data.loading){
            this.setState({
                book: this.props.data.getAllBookApp.booking
            })
        }
    }

    componentWillUnmount() {
        this.onTokenRefreshListener();
        this.messageListener();
    }
    render(){
        console.log('props HOME: ', this.props)
        if(this.props.data.loading){
            return(
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#00000f"></ActivityIndicator>
                </View>
            )
        }

        let filterData = this.state.book.filter((data)=>{
            return data.doctor_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1  
        })
        return(
            <View>
                <SearchBar
                    round
                    lightTheme
                    onChangeText={(search) => this.setState({ search })}
                    placeholder='Type Here...' />
                <ScrollView>
                    <View>
                        <FlatList
                            data={filterData}
                            keyExtractor={(item) => String(item.id)}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableHighlight onPress={() => this.props.navigation.navigate("BookingDetail", { params: item.id })}>
                                        <View>
                                            <ListItem
                                                roundAvatar
                                                avatar={{ uri: item.doctor_photo }}
                                                title={`${item.doctor_name}/${item.book_id}`}
                                                subtitle={`Appointment Time: ${moment(item.time).format('DDD MMM YYYY HH:mm')}`}
                                            />
                                        </View>
                                    </TouchableHighlight>
                                )
                            }}
                        />
                    </View>
                </ScrollView>
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
    // saveFCMToken: gql`
    //     query saveFCMToken (
    //         $token: String
    //     ){
    //         saveFCMToken(token: $token)
    //     }
    // `,
    getAllBookApp: gql`
        query{
            getAllBookApp{
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
    graphql(Queries.getAllBookApp,{
        options:{
            fetchPolicy: "cache-and-network",
            ssr: false
        }
    }),
    withApollo
)(Home)
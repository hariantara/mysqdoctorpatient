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
    TouchableHighlight,
    ActivityIndicator
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
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Dropdown } from 'react-native-material-dropdown';
import moment from 'moment';


export default (props) => {
    return (
        <Wrapper {...props} />
    )
}

let data = [{
    id: 1,
    value: 'Banana',
}, {
    id: 2,
    value: 'Mango',
}, {
    id: 3,
    value: 'Pear',
}];

let doctor = [{
    id: 1,
    value: "Marinka"
}, {
    id: 2,
    value: "Juna"
}, {
    id: 3,
    value: "Wucau"
}]

class CreateBooking extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isDateTimePickerVisible: false,
            clinic_id: "",
            symptom: "",
            doctor: [],
            clinic: [],
            clinic_id: "",
            doctor_id: "",
            idtemp: "",
            appTime: ""
        }
    }

    async componentDidMount(){
        if(!this.props.getAllClinic.loading){
            let data = this.props.getAllClinic.getAllClinic.clinic 
            let clinicManipulate = await Promise.all(data.map(async(datum)=>{
                let result = {
                    id: datum.id,
                    value: datum.clinic_name
                }
                return result
            }))
            console.log('clinicManipulate: ', clinicManipulate)
            if (clinicManipulate.length > 0){
                await this.setState({
                    clinic: clinicManipulate
                })
            }
        }

        if(!this.props.getAllDoctor.loading){
            let data = this.props.getAllDoctor.getAllDoctor.user 
            let doctorManipulate = await Promise.all(data.map(async(datum)=>{
                let result = {
                    id: datum.id,
                    value: data.name
                }
                return result
            }))
            console.log('doctorManipulate: ', doctorManipulate)
            if (doctorManipulate.length > 0){
                await this.setState({
                    doctor: doctorManipulate
                })
            }
        }
    }

    async componentWillReceiveProps(nextProps) {
        // console.log('nextProps.getAllClinic.getAllClinic.clinic: ', nextProps.getAllClinic.getAllClinic.clinic)
        if (!nextProps.getAllClinic.loading) {
            let data = nextProps.getAllClinic.getAllClinic.clinic
            let clinicManipulate = await Promise.all(data.map(async (datum) => {
                let result = {
                    id: datum.id,
                    value: datum.clinic_name
                }
                return result
            }))
            console.log('clinicManipulate: ', clinicManipulate)
            if (clinicManipulate.length > 0) {
                await this.setState({
                    clinic: clinicManipulate
                })
            }
        }

        if (!nextProps.getAllDoctor.loading) {
            let data = nextProps.getAllDoctor.getAllDoctor.user
            let doctorManipulate = await Promise.all(data.map(async (datum) => {
                let result = {
                    id: datum.id,
                    clinic_id: datum.clinic_id,
                    value: datum.name
                }
                return result
            }))
            console.log('doctorManipulate: ', doctorManipulate)
            if (doctorManipulate.length > 0) {
                await this.setState({
                    doctor: doctorManipulate
                })
            }
        }
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this.setState({
            appTime: moment(date).format('YYYY-MM-DD HH:mm:ss')
        })
        this._hideDateTimePicker();
    };

    clinic = async (index) => {
        console.log('id clinic: >>>', this.state.clinic[index].id)
        this.setState({
            clinic_id: this.state.clinic[index].id 
        }, async() => {
                let id = this.state.clinic[index].id
                if (id) {
                    let manipulate = []
                    await this.props.getAllDoctor.getAllDoctor.user.map((data) => {
                        console.log('data ----', data)
                        let status = false
                        if (id === data.clinic_id) {
                            status = true
                        }
                        if (status) {
                            manipulate.push({
                                id: data.id,
                                clinic_id: data.clinic_id,
                                value: data.name
                            })
                        }
                    })

                    console.log('manipulate: ', manipulate)
                    await this.setState({
                        doctor: manipulate
                    })
                }
        })
        
    }

    doctor = (index) => {
        console.log('doctor choosen: ', this.state.doctor[index].id )
        this.setState({
            doctor_id: this.state.doctor[index].id 
        })
    }

    symptom = (e) => {
        this.setState({
            symptom: e
        })
    }

    createBooking = async() => {
        try{
            let {
                clinic_id,
                doctor_id,
                symptom,
                appTime
            } = this.state 

            if(clinic_id === "" || doctor_id === "" || symptom === "" || appTime === ""){
                Alert.alert("Form should be filled")
            }else{
                let input = {
                    clinic_id,
                    doctor_id,
                    symptom,
                    time: appTime
                }

                let book = await this.props.createBooking(input)
                console.log('book: ', book)
                if(book.data.createBooking.error === null){
                    Alert.alert("Success Book, Go to Home to see Detail")
                    this.props.navigation.navigate("Home")
                }else{
                    Alert.alert("Opps !!, please try again")
                }
            }
        }catch(err){
            console.log('err: ', err)
        }
    }

    render() {
        console.log('Props create booking: ', this.props)
        console.log('state booking: ', this.state)

        if (this.props.getAllDoctor.loading){
            return(
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#00000f"></ActivityIndicator>
                </View>
            )
        }

        if (this.props.getAllClinic.loading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#00000f"></ActivityIndicator>
                </View>
            )
        }
        return (
            <View style={{ flex: 1 }}>
                {/* <DateTimePickerTester/> */}
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                    <View style={styles.form}>
                        <FormLabel>Symptom</FormLabel>
                        <FormInput
                            placeholder="write your symptom here . . ."
                            defaultValue={this.state.symptom}
                            onChangeText={this.symptom}
                        />
                        <FormValidationMessage>Example: flu, migrain</FormValidationMessage>
                    </View>
                </KeyboardAvoidingView>
                <View style={{ paddingLeft: '10%', paddingRight: '10%' }}>
                    <Dropdown
                        label='Clinic'
                        data={this.state.clinic}
                        // labelExtractor={({id}) => {
                        //     console.log('clinic_id: ', id)
                        //     this.clinic(id)
                        // }}
                        onChangeText={(value, index, data) => {
                            console.log('e ----> ', data)
                            this.clinic(index)
                        }}
                    />
                </View>
                <View style={{ paddingLeft: '10%', paddingRight: '10%' }}>
                    <Dropdown
                        label={this.state.doctor.length > 0 ? "Choose Doctor" : "No Doctor"}
                        data={this.state.doctor}
                        onChangeText={(e, i) => {
                            console.log('e doctor--- >>>', e)
                            console.log('i doctor--- >>>', i)
                            this.doctor(i)
                        }}
                    />
                </View>
                <View style={{ marginTop: 10, paddingLeft: '5%', paddingRight: '5%'}}>
                    <FormLabel>Appointment Time</FormLabel>
                    <FormLabel>{this.state.appTime === "" ? "-- : --" : this.state.appTime}</FormLabel>
                </View>
                <View style={{ marginTop: 20, paddingLeft: '5%', paddingRight: '5%' }}>
                    <Button
                        raised
                        backgroundColor="#4169E1"
                        onPress={this._showDateTimePicker}
                        title={'Selec Date & Time'}
                    />
                </View>
                
                <View>
                    <DateTimePicker
                        mode={'datetime'}
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleDatePicked}
                        onCancel={this._hideDateTimePicker}
                    />
                </View>
                <View style={{ marginTop: 70, paddingLeft: '5%', paddingRight: '5%' }}>
                    <Button
                        raised
                        style={{ borderRadius: 50 }}
                        backgroundColor="#3CB371"
                        title="BOOK"
                        onPress={this.createBooking}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    buttonBook: {
        borderRadius: 30
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dropdown: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        // marginLeft: 180,
        marginTop: 30,
        // marginBottom: 50,
        width: '90%'
    },
})

let Queries = {
    getAllClinic: gql`
        query getAllClinic{
        getAllClinic{
            clinic{
            id,
            clinic_name,
            clinic_mobile,
            clinic_address,
            clinic_email,
            location{
                lat,
                lng
            },
            viewport{
                northeast{
                lat,
                lng
                },
                southwest{
                lat,
                lng
                }
            },
            place_id
            },
            error
        }
        }
    `,
    getAllDoctor: gql`
        query getAllDoctor{
            getAllDoctor{
                user{
                id,
                name,
                username,
                email,
                password,
                phone,
                id_card,
                sip,
                photo,
                clinic_id,
                clinic_name,
                clinic_address
                },
                error
            }
        }
    `
}

let Mutations = {
    createBooking: gql`
        mutation createBooking(
            $input: createBooking
        ){
            createBooking(input: $input){
                booking{
                    id,
                    book_id,
                    clinic_id,
                    patient_id,
                    doctor_id,
                    symptom,
                    time,
                    status,
                    created_at,
                    updated_at,
                    deleted_at
                },
                error
            }
        }
    `
}

let Wrapper = compose(
    graphql(Mutations.createBooking, {
        props: ({mutate}) => ({
            createBooking: (input) => {
                return mutate({
                    variables: {
                        input
                    },
                    refetchQueries: [{
                        query: Queries.getAllClinic
                    },{
                        query: Queries.getAllDoctor
                    }]
                })
            }
        })
    }),
    graphql(Queries.getAllClinic,{
        name: "getAllClinic",
        options: {
            fetchPolicy: "cache-and-network",
            ssr: false
        }
    }),
    graphql(Queries.getAllDoctor,{
        name: "getAllDoctor",
        options: {
            fetchPolicy: "cache-and-network",
            ssr:false
        }
    }),
    withApollo
)(CreateBooking)
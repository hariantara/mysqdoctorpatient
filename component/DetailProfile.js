import React, {Component} from 'react'

import {
    Platform,
    StyleSheet,
    Image,
    Text,
    View,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    TouchableHighlight,
    FlatList,
    AsyncStorage,
    ActivityIndicator,
} from 'react-native';
import { graphql, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import logo from '../static/cardiogram.png'
import {
    StackNavigator,
} from 'react-navigation';

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
    List,
    FormValidationMessage
} from 'react-native-elements'

import ImagePicker from 'react-native-image-picker';
import add from '../static/add.png'
import env from '../shared/environment'

export default (props) => {
    return (
        <Wrapper {...props} />
    )
}

class DetailProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            pickedImage: null,
            name: "",
            password: "",
            phone: "",
            photo: "",
            username: "",
            id_card: "",
            id: "",
            email: "",
            file: null
        }
    }

    reset = () => {
        this.setState({
            pickedImage: null
        });
    }

    pickImageHandler = () => {
        ImagePicker.showImagePicker({ title: "Pick an Image", maxWidth: 800, maxHeight: 600 }, res => {
            console.log('res: --> ', res)
            if (res.didCancel) {
                console.log("User cancelled!");
                this.setState({file: null})
            } else if (res.error) {
                console.log("Error", res.error);
            } else {
                this.setState({
                    pickedImage: {uri:res.uri},
                    file: res
                });

            }
        });
    }

    resetHandler = () => {
        this.reset();
    }

    _getToken = async() => {
        try{
            let token = await AsyncStorage.getItem('shinchan')
            console.log('detail token: ', token)
        }catch(error){
            console.log(error)
        }
    }

    componentDidMount(){
        this._getToken()
        if(!this.props.data.loading){
            this.setState({
                name: this.props.data.getPatientDetailApp.user.name,
                password: this.props.data.getPatientDetailApp.user.password,
                phone: this.props.data.getPatientDetailApp.user.phone,
                photo: this.props.data.getPatientDetailApp.user.photo,
                username: this.props.data.getPatientDetailApp.user.username,
                id_card: this.props.data.getPatientDetailApp.user.id_card,
                id: this.props.data.getPatientDetailApp.user.id,
                email: this.props.data.getPatientDetailApp.user.email
            })
        }
    }

    componentWillReceiveProps(nextProps){
        if(!nextProps.data.loading){
            this.setState({
                name: nextProps.data.getPatientDetailApp.user.name,
                password: nextProps.data.getPatientDetailApp.user.password,
                phone: nextProps.data.getPatientDetailApp.user.phone,
                photo: nextProps.data.getPatientDetailApp.user.photo,
                username: nextProps.data.getPatientDetailApp.user.username,
                id_card: nextProps.data.getPatientDetailApp.user.id_card,
                id: nextProps.data.getPatientDetailApp.user.id,
                email: nextProps.data.getPatientDetailApp.user.email
            })
        }
    }

    name = (e) => {
        console.log('e -> ', e)
        this.setState({
            name: e
        })
    }

    username = (e) => {
        this.setState({
            username: e
        })
    }

    email = (e) => {
        this.setState({
            email: e
        })
    }

    phone = (e) => {
        this.setState({
            phone: e
        })
    }

    id_card = (e) => {
        this.setState({
            id_card: e
        })
    }

    onUpdate = async () => {
        console.log('masuk on update')
        try{
            let {
                name,
                phone,
                username,
                id_card,
                id,
                email
            } = this.state

            if(name === "" || username === "" || email === "" || phone === "" || id_card === ""){
                Alert.alert('Form must filled')
            }else{
                if(this.state.pickedImage === null){
                    console.log('masuk ke if > ')
                    let input = {
                        name,
                        username,
                        email,
                        phone,
                        id_card,
                        photo: this.state.photo
                    }
                    let update = await this.props.patientUpdate(input)
                    console.log('update: ', update)
                }else{
                    console.log('masuk ke else >>')
                    const data = new FormData()
                    data.append('file', this.state.file)
                    let upload = await fetch(env.graphqlUpload, {
                        method: 'post',
                        body: data
                    })
                    console.log('upload: ', upload)
                }
            }
        }catch(err){
            console.log('err: ', err)
        }
    }

    render(){
        console.log('Props Detail Profile: ', this.props)
        console.log('State Detail Profile: ', this.state)
        if(this.props.data.loading){
            return(
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#00000f"></ActivityIndicator>
                </View>
            )
        }
        return(
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.placeholder}>
                        {
                            this.state.pickedImage !== null ? 
                                <Avatar
                                    xlarge
                                    rounded
                                    source={this.state.pickedImage}
                                    activeOpacity={0.7}
                                />
                            :
                                <Avatar
                                    xlarge
                                    rounded
                                    source={{ uri: this.state.photo }}
                                    activeOpacity={0.7}
                                />
                        }
                    </View>
                    <View style={styles.add}>
                        <Avatar

                            small
                            rounded
                            source={add}
                            onPress={this.pickImageHandler}
                            activeOpacity={0.7} />
                    </View>
                    {/* <View>
                        
                        <Button title="Pick Image" onPress={this.pickImageHandler} />

                        <Button title="Delete" onPress={this.resetHandler} />

                    </View> */}
                    <View>
                        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                            <View style={styles.form}>
                                <FormLabel>Name</FormLabel>
                                <FormInput
                                    defaultValue={this.state.name}
                                    onChangeText={this.name}
                                />
                                <FormLabel>Username</FormLabel>
                                <FormInput
                                    defaultValue={this.state.username}
                                    onChangeText={this.username}
                                />
                                <FormLabel>Email</FormLabel>
                                <FormInput
                                    defaultValue={this.state.email}
                                    onChangeText={this.email}
                                />
                                <FormLabel>Phone</FormLabel>
                                <FormInput
                                    defaultValue={this.state.phone}
                                    onChangeText={this.phone}
                                />
                                <FormLabel>NRIC</FormLabel>
                                <FormInput
                                    defaultValue={this.state.id_card}
                                    onChangeText={this.id_card}
                                />
                            </View>
                            <View style={styles.update}>
                                <Button
                                    title='UPDATE'
                                    onPress={this.onUpdate}
                                />
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                    
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    add: {
        // position: 'absolute',
        left: 55,
        right: 0,
        top: 0,
        bottom: 500,
        alignItems: 'center',
        justifyContent: 'center'
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
    update: {
        marginTop: 50,
        marginBottom: 100,
        width: '80%'
    },
    form: {
        // marginLeft: 180,
        marginTop: 30,
        // marginBottom: 50,
        width: '90%'
    },
    textStyle: {
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center",
        color: "red",
        marginTop: 10
    },
    placeholder: {
        // position: 'absolute',
        marginBottom: 30,
        left: 0,
        right: 0,
        top: 70,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
        // paddingLeft: 60,
        // paddingTop: 20
        // borderWidth: 1,
        // borderColor: "black",
        // backgroundColor: "#eee",
        // width: "40%",
        // height: 170,
        // marginTop: 50,
        // borderRadius: 200
    },
    button: {
        width: "80%",
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    previewImage: {
        width: "100%",
        height: "100%"
    }
});

let Queries = {
    getPatientDetailApp: gql`
        query{
            getPatientDetailApp{
                user{
                    id,
                    name,
                    username,
                    email,
                    password,
                    phone,
                    id_card,
                    sip,
                    photo
                },
                error
            }
        }
    `
}

let Mutations = {
    patientUpdate: gql`
        mutation patientUpdate(
            $input: patientUpdate
        ){
            patientUpdate(input: $input){
                patient{
                    id,
                    name,
                    username,
                    email,
                    password,
                    phone,
                    id_card,
                    photo
                },
                error
            }
            }
    `
}

let Wrapper = compose(
    graphql(Mutations.patientUpdate, {
        props: ({mutate}) => ({
            patientUpdate: (input) => {
                return mutate({
                    variables: {
                        input
                    },
                    refetchQueries: [{
                        query: Queries.getPatientDetailApp
                    }]
                })
            }
        })
    }),
    graphql(Queries.getPatientDetailApp,{
        options: {
            fetchPolicy: "cache-and-network",
            ssr: false
        }
    }),
    withApollo
)(DetailProfile)
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
    AsyncStorage
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

export default (props) => {
    return (
        <Wrapper {...props} />
    )
}

class DetailProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            pickedImage: null
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
            } else if (res.error) {
                console.log("Error", res.error);
            } else {
                this.setState({
                    pickedImage: {uri:res.uri} 
                });

            }
        });
    }

    resetHandler = () => {
        this.reset();
    }

    render(){
        console.log('Props Detail Profile: ', this.props)
        console.log('State Detail Profile: ', this.state)
        return(
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.placeholder}>
                        <Image source={this.state.pickedImage} style={styles.previewImage} />
                    </View>
                    <View style={styles.button}>

                        <Button title="Pick Image" onPress={this.pickImageHandler} />

                        <Button title="Delete" onPress={this.resetHandler} />

                    </View>
                    <View>
                        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                            <View style={styles.form}>
                                <FormLabel>Name</FormLabel>
                                <FormInput
                                    placeholder='type username here . . .'
                                    onChangeText={this.username}
                                />
                                <FormLabel>Username</FormLabel>
                                <FormInput
                                    placeholder='type username here . . .'
                                    onChangeText={this.username}
                                />
                                <FormLabel>Email</FormLabel>
                                <FormInput
                                    placeholder='type username here . . .'
                                    onChangeText={this.username}
                                />
                                <FormLabel>Phone</FormLabel>
                                <FormInput
                                    placeholder='type username here . . .'
                                    onChangeText={this.username}
                                />
                                <FormLabel>NRIC</FormLabel>
                                <FormInput
                                    placeholder='type username here . . .'
                                    onChangeText={this.username}
                                />
                            </View>
                            <View style={styles.update}>
                                <Button
                                    title='UPDATE'
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
    update: {
        marginTop: 50,
        marginBottom: 100,
        width: '80%'
    },
    form: {
        // marginLeft: 180,
        marginTop: 30,
        // marginBottom: 50,
        width: '70%'
    },
    textStyle: {
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center",
        color: "red",
        marginTop: 10
    },
    placeholder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "40%",
        height: 170,
        marginTop: 50,
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

let Wrapper = compose(
    withApollo
)(DetailProfile)
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

import { AsyncStorage } from "react-native"
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

// const httpLink = createHttpLink({ uri: "http://localhost:3000/api/graphql" });
const httpLink = createHttpLink({ uri: "http://192.168.1.5:4000/graphql" });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: AsyncStorage.getItem('token') || "",
    }
  }));

  return forward(operation);
})


const wsLink = new WebSocketLink({
  uri: `ws://192.168.1.5:4000/subscriptions`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: AsyncStorage.getItem('token'),
    }
  }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  authMiddleware.concat(httpLink)
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

// import Login from '../doctor/screen/Login'

import Navigations from '../newdoc/Route'

class App extends Component {
  constructor(props){
    super(props)
  }
  render() {
    console.log('this.props ', this.props)
    return (
        <ApolloProvider client={client}>
          <View style={styles.container}>
            <Navigations/>
          </View>
        </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


export default App
import { ApolloProvider, ApolloClient, createNetworkInterface } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

const wsClient = new SubscriptionClient(`ws://localhost:4000/subscriptions`, {
    reconnect: true
});

const networkInterface = createNetworkInterface({
    uri: `http://localhost:4000/graphql`
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient
);

const client = new ApolloClient({
    networkInterface: networkInterfaceWithSubscriptions,
});

import App from '../App'

const ApolloApp = (props) => {
    console.log('props: ', props)
    return(
        <ApolloProvider client={client}>
            <App {...props} anu={'lalalal'}/>
        </ApolloProvider>
    )
}
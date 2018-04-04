import * as React from 'react'
import { render } from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider, Query } from 'react-apollo'
import gql from 'graphql-tag'

import registerServiceWorker from './registerServiceWorker'

const client = new ApolloClient({
    uri: `https://w5xlvm3vzz.lp.gql.zone/graphql`
})

const RATES_QUERY = gql`
    {
        rates(currency: "USD") {
            currency
            rate
        }
    }
`

const ExchangeRates = () => (
    <Query query={RATES_QUERY}>
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error :(</p>

            return data.rates.map(({ currency, rate }) => (
                <div key={currency}>
                    <p>{`${currency}: ${rate}`}</p>
                </div>
            ))
        }}
    </Query>
)

const App = () => (
    <ApolloProvider client={client}>
        <div>
            <h2>Microbz: Exchange Rates</h2>
            <ExchangeRates />
        </div>
    </ApolloProvider>
)

render(<App />, document.getElementById('root'))
registerServiceWorker()

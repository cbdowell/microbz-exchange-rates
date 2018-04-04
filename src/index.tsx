import * as React from 'react'
import { render } from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider, Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

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

const Title = styled.h1`
    font-size: 1.5em
    text-align: center
    color: palevioletred
`

const App = () => (
    <ApolloProvider client={client}>
        <div>
            <Title>
                Microbz: Exchange Rates
            </Title>
            <ExchangeRates />
        </div>
    </ApolloProvider>
)

render(<App />, document.getElementById('root'))
registerServiceWorker()

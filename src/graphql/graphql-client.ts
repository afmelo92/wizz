import { GraphQLClient } from 'graphql-request'

const endpoint = process.env.FAUNADB_ENDPOINT

const graphQLClient = new GraphQLClient(endpoint!, {
  headers: {
    authorization: `${process.env.FAUNADB_AUTH_TOKEN}`
  }
})

export default graphQLClient

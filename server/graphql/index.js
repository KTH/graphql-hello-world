const { ApolloServer, gql } = require('apollo-server-express')
const canvasApi = require('./canvasApi')
const ladokApi = require('./ladokApi')

const typeDefs = gql`
  type Module {
    canvasId: ID!
    canvasName: String!
    ladokId: ID!
    ladokName: String!
  }
  type Query {
    modules(courseId: ID!): [Module!]!
  }
`

const resolvers = {
  Query: {
    async modules (_parent, args) {
      const assignments = await canvasApi.getAssignments(args.courseId)

      return assignments.map(a => ({
        canvasId: a.id,
        canvasName: a.name,
        ladokId: a.integration_id
      }))
    }
  },

  /*
  Module: {
    async ladokName (obj) {
      return (await ladokApi.hamtaModul(obj.ladokId))
        .namn
    }
  }
  */
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

module.exports = server

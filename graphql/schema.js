const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type TestData {
        text: String!
        counter: Int!
    }


    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        status: String!
    }
    
    input UserInputData {
        email: String!
        name: String!
        password: String!
    }

    type RootQuery {
        hello: TestData!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
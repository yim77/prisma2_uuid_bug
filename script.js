/**
  *
  * This code was auto-generated based on the introspection result.
  * Consider it a playground to explore the Photon API.
  * Feel free to change it as much as you like or delete it altogether.
  *
  * The model `User` was randomly selected to demonstrate some API calls.
  *
  * Tip: Use the auto-completion of your editor to explore available API operations.
  *
  */
const express = require('express');
const Photon = require('@generated/photon');

const { ApolloServer, gql } = require('apollo-server-express');
const http =require('http');
const uuidv1 = require('uuid/v1');

const photon = new Photon();

const typeDefs = gql`
  #User Type
  type User {
    id: String
    name: String
    age: Int
    posts: [Post]
  }

  type Post {
    id: String
    text: String
    user: User
  }

  type Room {
    id: Int
    name: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    user(id: ID!): User
    room(id: Int!): Room
    users: [User]
    posts: [Post]
  }
`;
const resolvers = {
  Query: {
    user: (parent, args, context, info) =>  photon.users.findOne({where: {id: args.id},}),
    room: (parent, args, context, info) =>  photon.rooms.findOne({where: {id: args.id},}),
    users: () => photon.users.findMany(),
    posts: () => photon.posts.findMany(),
  },
};

const apollo = new ApolloServer({ typeDefs, resolvers });
const app = express()
apollo.applyMiddleware({ app })
var server = http.createServer(app)

// Add subscription support
apollo.installSubscriptionHandlers(server);

//DEBUG:
const MyFunc = async function() {
  const MyUser = await photon.users.findOne({where: {id: "936958ea-cb04-11e9-bcba-0242ac110002"},});
  console.log(MyUser);
}

MyFunc()


server.listen({ port: 4000 }, () => {
  console.log(`🚀  Server ready at 4000`);
});




/*

async function main() {
  // Tip: Explore some arguments to `findMany`
  const allUsers = await photon.users.findMany({
    where: { name: 'Alex' },
  })



  const allPosts = await photon.posts.findMany()
  console.log(`Retrieved all published users: `, allUsers)
  console.log(`Retrieved all published posts: `, allPosts)

  // Comment out the lines below to create a new User
  // ATTENTION: This code creates a new record in your database
  // const newUser = await photon.users.create({
  //   data: {
  //     // add some values here
  //   },
  // })
  // console.log(`Created a new User: `, newUser)
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await photon.disconnect()
  })
*/

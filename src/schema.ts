export const typeDefs = `
    type Query {
        health: String!
    }
`;

export const resolvers = {
  Query: {
    health: () => "I am alive!",
  },
};

const { ApolloServer } = require("apollo-server");

const path = require("path");
const fs = require("fs");

// actual implementation of the GraphQL schema
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      let idCount = links.length;

      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        title: args.title,
        url: args.url,
      };
      links.push(link);
      return link;
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
});

// store links at runtime
let links = [
  {
    id: "link-0",
    title: "Test Title",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
];

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));

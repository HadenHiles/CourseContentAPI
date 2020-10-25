const { ApolloServer } = require("apollo-server");
const schema = require("./schema");

// Temporarily define static courses
// TODO: Retrieve courses from graphql data source
const courses = [
    {
        id: '1',    
        title: 'Intro to Skating',
        url: 'https://thepond.howtohockey.com/courses/intro-to-skating/'
    },
    {
        id: '2',    
        title: 'Skating Level 1',
        url: 'https://thepond.howtohockey.com/courses/skating-level-1/',
        image_url: 'https://cdn.thepond.howtohockey.com/2020/10/intro-skating.jpg',
        available: true,
    },
];

// Retrieve courses from the "courses" array above.
const resolvers = {
    Query: {
        courses: () => courses,
        lessons: () => lessons
    },
};

// Initialize the ApolloServer with the schema definition and resolvers
const typeDefs = schema.typeDefs;
const server = new ApolloServer({ typeDefs, resolvers });

// launche the web server.
server.listen(4020).then(({ url }) => {
  console.log(`🚀 Server ready at ${url} `);
});
const { ApolloServer, gql } = require("apollo-server");
const dotenv = require("dotenv");
dotenv.config();
const { importSchema } = require("graphql-import");
const typeDefs = importSchema("./schema.graphql"); // Not sure if this works with the VS Code apollo extension

// Retrieve courses from the "courses" array above.
const resolvers = {
  Query: {
    allCourses: () => courses,
    course: (parent, args, context, info) => {
      return courses.find((course) => course.id === args.id);
    },
    courses: (parent, args, context, info) => {
      courses.find(
        (course) =>
          course.title.indexOf(args.title) != -1 ||
          course.short_description.indexOf(args.short_description) != -1 ||
          course.content.indexOf(args.content) != -1 ||
          course.available == args.available
      );
    },
    allLessons: () => lessons,
    lesson: (parent, args, context, info) => {
      return lessons.find((lesson) => lesson === args.id);
    },
    lessons: (parent, args, context, info) => {
      lessons.find(
        (lesson) =>
          lesson.title.toString().includes(args.title) ||
          lesson.short_description.toString().includes(args.short_description) ||
          lesson.content.toString().includes(args.content) ||
          lesson.available == args.available
      );
    },
  },
};

// Initialize the ApolloServer with the schema definition and resolvers
const server = new ApolloServer({ typeDefs, resolvers });

// launche the web server.
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url} `);
});

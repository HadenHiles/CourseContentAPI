const { gql } = require("apollo-server");

// Define the collection of type definitions for the schema
const typeDefs = gql`
  type Course {
    id: String
    title: String
    url: String
    short_description: String
    content: String
    video_embed: String
    image_url: String
    available: Boolean
    lessons: [Lesson]
  }

  type Lesson {
    id: String
    title: String
    url: String
    short_description: String
    content: String
    video_embed: String
    image_url: String
    available: Boolean
  }

  type Query {
    courses: [Course]
    lessons: [Lesson]
  }
`;

exports.typeDefs = typeDefs;
const { ApolloServer, gql } = require("apollo-server");
// const { importSchema } = require("graphql-import");
// const typeDefs = importSchema("./schema.graphql"); // Not sure if this works with the VS Code apollo extension

const typeDefs = gql`
  type Course {
    id: ID!
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
    id: ID!
    title: String
    url: String
    short_description: String
    content: String
    video_embed: String
    image_url: String
    available: Boolean
  }

  type Query {
    allCourses: [Course]
    course(id: ID!): Course
    courses(title: String, short_description: String, content: String, available: Boolean): [Course]
    allLessons: [Lesson]
    lesson(id: ID!): Lesson
    lessons(title: String, short_description: String, content: String, available: Boolean): [Lesson]
  }

  type Mutation {
    addCourse(id: ID!, title: String, url: String, short_description: String, content: String, video_embed: String, image_url: String, available: Boolean): Course!
  }
`;

// Temporarily define static courses
// TODO: Retrieve courses from a graphql data source (Apollo)
const courses = [
  {
    id: "1",
    title: "Intro to Skating",
    url: "https://thepond.howtohockey.com/courses/intro-to-skating/",
    short_description: "",
    content: "<h1>Intro to Skating</h1>",
    video_embed: "<iframe src=''></iframe>",
    image_url: "https://cdn.thepond.howtohockey.com/2020/10/intro-skating.jpg",
    available: true,
  },
  {
    id: "2",
    title: "Skating Level 1",
    url: "https://thepond.howtohockey.com/courses/skating-level-1/",
    short_description: "",
    content: "<h1>Skating Level 1</h1>",
    video_embed: "<iframe src=''></iframe>",
    image_url: "https://cdn.thepond.howtohockey.com/2020/10/intro-skating.jpg",
    available: true,
  },
  {
    id: "3",
    title: "Skating Level 2",
    url: "https://thepond.howtohockey.com/courses/skating-level-2/",
    short_description: "",
    content: "<h1>Skating Level 2</h1>",
    video_embed: "<iframe src=''></iframe>",
    image_url: "https://cdn.thepond.howtohockey.com/2020/10/intro-skating.jpg",
    available: false,
  },
];

const lessons = [
  {
    id: "1",
    title: "Good Posture is KEY",
    url: "https://thepond.howtohockey.com/lessons/good-posture-is-key/",
    short_description: "",
    content: "<h1>Good Posture is KEY</h1>",
    video_embed: "<iframe src=''></iframe>",
    image_url: "https://cdn.thepond.howtohockey.com/2020/10/intro-skating.jpg",
    available: true,
  },
];

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

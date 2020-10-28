// Import our crud operations for sqlite
var dao = require(`./dao.js`);

var resolverResult;

// Ensure that GraphQL knows what to do when the typeDefs are referenced
module.exports = {
  resolvers: {
    Query: {
      course: (parent, { id }, context, info) => {
        dao.course(id, (res) => {
          resolverResult = module.exports.mapCourse(res);
        });

        var tempRes = resolverResult;
        resolverResult = {};
        return tempRes;
      },
      courses: (parent, args, context, info) => {
        dao.courses((res) => {
          resolverResult = module.exports.mapCourses(res);
        });

        var tempRes = resolverResult;
        return tempRes;
      },
      lesson: (parent, { id }, context, info) => {
        dao.lesson(id, (res) => {
          return res;
        });
      },
      lessons: (parent, args, context, info) => {
        dao.lessons((res) => {
          resolverResult = module.exports.mapCourses(res); // TODO: Creat separate mapLessons method if necessary
        });

        var tempRes = resolverResult;
        return tempRes;
      },
    },
    Mutation: {
      createCourse: (parent, args, context, info) => {
        dao.createCourse(args, (res) => {
          resolverResult = module.exports.mapCourse(res);
        });

        var tempRes = resolverResult;
        return tempRes;
      },
      createLesson: (parent, args, context, info) => {
        dao.createLesson(args, (res) => {
          resolverResult = module.exports.mapCourse(res); // TODO: create separate mapLesson method if necessary
        });

        var tempRes = resolverResult;
        return tempRes;
      },
    },
  },
  // Convenience method for setting the proper attribute names for the GraphQL course schema
  mapCourse: (c) => {
    c.shortDescription = c.short_description;
    c.videoEmbed = c.video_embed;
    c.imageUrl = c.image_url;
    delete c.short_description;
    delete c.video_embed;
    delete c.image_url;

    return c;
  },
  // Map an array of courses
  mapCourses: (c) => {
      c.forEach(o => {
          o = module.exports.mapCourse(o);
      });

      return c;
  }
};

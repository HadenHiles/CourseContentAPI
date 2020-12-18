// Setup the sqlite database connection
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs"); // for reading retrieving the schema file
const dbSchema = fs.readFileSync(`./server/coursecontent.schema`).toString();
const dbPath = "./server/coursecontent.db";

const db = new sqlite3.Database(dbPath, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connected to " + dbPath + " database.");

  // Enable sqlite foreign keys
  db.exec("PRAGMA foreign_keys = ON;", function (error) {
    if (error) {
      console.error("Failed to enable Foreign Key Enforcement.");
    } else {
      console.log("Foreign Key Enforcement is on.");
    }
  });
});

// Create the sqlite databases (execute the sqlite schema)
db.exec(dbSchema, function (err) {
  if (err) {
    console.log(err);
  }
});

module.exports = {
  // Create a course
  createCourse: ({ title, url, shortDescription, content, videoEmbed, imageUrl, available }, cb) => {
    var sql = `INSERT INTO courses (
        title, 
        url, 
        short_description, 
        content, 
        video_embed, 
        image_url, 
        available
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    var params = [
      title,
      url == null ? "" : url,
      shortDescription == null ? "" : shortDescription,
      content == null ? "" : content,
      videoEmbed == null ? "" : videoEmbed,
      imageUrl == null ? "" : imageUrl,
      available == null ? false : available,
    ];

    db.run(sql, params, (err, row) => {
      if (err) {
        console.error(err);
      } else {
        // get the id of the inserted course
        db.get("SELECT last_insert_rowid() as id", function (err, row) {
          module.exports.course(row["id"], (res) => {
            cb(res);
          });
        });
      }
    });
  },

  // Update a course
  updateCourse: ({ id, title, url, shortDescription, content, videoEmbed, imageUrl, available }, cb) => {
    var sql = `UPDATE courses SET
          title = ?,
          url = ?, 
          short_description = ?, 
          content = ?, 
          video_embed = ?, 
          image_url = ?, 
          available = ?
        WHERE id = ?`;

    var params = [
      title,
      url == null ? "" : url,
      shortDescription == null ? "" : shortDescription,
      content == null ? "" : content,
      videoEmbed == null ? "" : videoEmbed,
      imageUrl == null ? "" : imageUrl,
      available == null ? false : available,
      id
    ];

    db.run(sql, params, (err, row) => {
      if (err) {
        console.error(err);
      } else {
        // get and return the updated course
        module.exports.course(id, (res) => {
          cb(res);
        });
      }
    });
  },

  // Lookup course by id
  course: (id, cb) => {
    var sql = `SELECT id, title, url, short_description, content, video_embed, image_url, available FROM courses WHERE id = (?)`;

    db.get(sql, [id], (err, row) => {
      if (err) {
        console.error(err);
      } else {
        cb(row);
      }
    });
  },

  // Get all the courses
  courses: (cb) => {
    var sql = `SELECT id, title, url, short_description, content, video_embed, image_url, available FROM courses`;

    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error(err);
      } else {
        cb(rows);
      }
    });
  },

  // Delete course by id
  deleteCourse: (id, cb) => {
    var sql = `DELETE FROM courses WHERE id = (?)`;

    db.run(sql, [id], (err, row) => {
      if (err) {
        console.error(err);
        cb({"success": false});
      } else {
        cb({"success": true});
      }
    });
  },

  // Create a lesson
  createLesson: ({ title, url, shortDescription, content, videoEmbed, imageUrl, available }, cb) => {
    var sql = `INSERT INTO lessons (
        title, 
        url, 
        short_description, 
        content, 
        video_embed, 
        image_url, 
        available
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    var params = [
      title,
      url == null ? "" : url,
      shortDescription == null ? "" : shortDescription,
      content == null ? "" : content,
      videoEmbed == null ? "" : videoEmbed,
      imageUrl == null ? "" : imageUrl,
      available == null ? false : available,
    ];

    db.run(sql, params, (err, row) => {
      if (err) {
        console.error(err);
      } else {
        // get the id of the inserted lesson
        db.get("SELECT last_insert_rowid() as id", function (err, row) {
          module.exports.lesson(row["id"], (res) => {
            cb(res);
          });
        });
      }
    });
  },

  // Update a lesson
  updateLesson: ({ id, title, url, shortDescription, content, videoEmbed, imageUrl, available }, cb) => {
    var sql = `UPDATE lessons SET
          title = ?,
          url = ?, 
          short_description = ?, 
          content = ?, 
          video_embed = ?, 
          image_url = ?, 
          available = ?
        WHERE id = ?`;

    var params = [
      title,
      url == null ? "" : url,
      shortDescription == null ? "" : shortDescription,
      content == null ? "" : content,
      videoEmbed == null ? "" : videoEmbed,
      imageUrl == null ? "" : imageUrl,
      available == null ? false : available,
      id
    ];

    db.run(sql, params, (err, row) => {
      if (err) {
        console.error(err);
      } else {
        // get and return the updated lesson
        module.exports.lesson(id, (res) => {
          cb(res);
        });
      }
    });
  },

  // Lookup lesson by id
  lesson: (id, cb) => {
    var sql = `SELECT id, title, url, short_description, content, video_embed, image_url, available FROM lessons WHERE id = (?)`;

    db.get(sql, [id], (err, row) => {
      if (err) {
        console.error(err);
      } else {
        cb(row);
      }
    });
  },

  // Get all the lessons
  lessons: (cb) => {
    var sql = `SELECT id, title, url, short_description, content, video_embed, image_url, available FROM lessons`;

    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error(err);
      } else {
        cb(rows);
      }
    });
  },

  // Delete lesson by id
  deleteLesson: (id, cb) => {
    var sql = `DELETE FROM lessons WHERE id = (?)`;

    db.run(sql, [id], (err, row) => {
      if (err) {
        console.error(err);
        cb({"success": false});
      } else {
        cb({"success": true});
      }
    });
  },
};

# Course Content API
An apollo-graphql-api using sqlite3 and React for managing basic multiplatform course content.

## Prerequisites
[Node.js](https://nodejs.org/) v12.x or later  
[npm](https://www.npmjs.com/) v6.x or later

## Installation
1. Clone repository
2. `cd CourseContentAPI`
3. `npm install && cd ./client && npm install`
4. In separate terminals run `npm run server` & `npm run client` respectively
5. View [graphql playground](http://localhost:4000) & [react app](http://localhost:3000)

## Issues
There may be [unresolved issues](https://github.com/HadenHiles/CourseContentAPI/issues) that could cause unexpected behaviour, please review prior to running the project.

### Example Mutation
```graphql
mutation {
  createCourse(title: "Test Course", url: "https://itworks.course.com", shortDescription: "test", content: "<h1>Test</h1>", videoEmbed: "<iframe src></iframe>" imageUrl: "http://img.png") {
    id
    title
    url
    shortDescription
    content
    videoEmbed
    imageUrl
    available
  }
}
```

### Example Query
```graphql
{
  courses {
    id,
    title,
    url,
    shortDescription,
    content,
    videoEmbed,
    imageUrl,
    available
  }
}
```

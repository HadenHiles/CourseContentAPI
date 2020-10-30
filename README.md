# Course Content API
A simple Apollo GraphQL API for managing course/lesson content to display on multiple platforms

## Prerequisites
[Node.js](https://nodejs.org/) v12.x or later  
[npm](https://www.npmjs.com/) v6.x or later

## Installation
1. `npm install || cd ./client && npm install`
2. In separate terminals run `npm run server` & `npm run client` respectively
3. view [graphql playground](http://localhost:4000) & [react app](http://localhost:3000)

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
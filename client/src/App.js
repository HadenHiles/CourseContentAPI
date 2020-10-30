import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const COURSES = gql`
  {
    courses {
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
`;

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function Courses() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(COURSES);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error :O</p>;
  }

  return data.courses.map(({ id, title, url, shortDescription, content, videoEmbed, imageUrl, available }) => (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          <a href={url}>{url}</a>
        </Typography>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {shortDescription}
        </Typography>
        <Typography variant="body2" component="p">
          {content}
          {videoEmbed}
          {imageUrl}
        </Typography>
      </CardContent>
      <CardActions>Available: {available ? "Yes" : "No"}</CardActions>
    </Card>
  ));
}

function App() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Course Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <ApolloProvider client={client}>
        <Courses />
      </ApolloProvider>
    </div>
  );
}

export default App;

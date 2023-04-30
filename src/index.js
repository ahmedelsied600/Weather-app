const express = require("express");
const app = express();

const forecast = require("./utils/forecast");
const geoCode = require("./utils/geoCode");

const port = process.env.PORT || 3020;
const path = require("path");

const PublicPath = path.join(__dirname, "/../public");
const partialsPath = path.join(__dirname, "/../templates/partials");
const viewsPath = path.join(__dirname, "/../templates/views");
console.log(viewsPath);

const hbs = require("hbs");
// Method#1 - creating directory paths maually - static pages
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Pathes of our files
// const ProjectStaticPath = path.join(__dirname, "/public");

// // express is used to manage front end templates
// // how to connect to certain path with all its html files (each html file represent a url path)
// app.use(express.static(ProjectStaticPath, { extensions: "html" }));

// // how to assign new url path different from all files in the path directory
// // note that it is very important to add '/' before the path in app.get()
// app.get("/help/*", (req, res) => {
//   res.send("this is an error for help page");
// });

// app.get("*", (req, res) => {
// // to print any value ==> we use res.send to send this value and be viewed in the the server page
// res.send("this is an error page");
// // to render any html page, we use res.render
// res.render('path_of_HTML_file')
// });

// Method#2 - creating directory paths using the templating system - dynamic pages
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// How to connect current templates to css files ?
// this happens using connecting actual static directory to public
// and accessing them from views as if the template file and css files are in the same directory
app.use(express.static(PublicPath));

app.set("view engine", "hbs");
// app.set('views','Path to which our files locate');
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "weather",
    name: "ahmed Hosney",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "weather",
    name: "ahmed Hosney",
    helpText: "This is some helpful text.",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "weather",
    name: "ahmed Hosney",
    helpText: "This is some helpful text.",
  });
});

app.get("/weather", async (requestMain, responseMain) => {
  geoCode(requestMain.query.address, (result, error) => {
    if (error) {
      // console.log("error1");

      return responseMain.send({ error });
    }
    forecast(result, (res, err) => {
      if (err) {
        return responseMain.send({ error: err });
      }
      responseMain.send({ forcast: res, location: result.location });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Andrew Mead",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Andrew Mead",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("server is up on server " + port);
});

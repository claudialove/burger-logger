var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "9Gjmrawt!",
  database: "burger_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Route GET
app.get("/", function(req, res) {
  //start with a query on the whole table
  connection.query("SELECT * FROM burger", function(err, result) {
    //standard error handling
    if (err) throw err;
    //declare variables which can handle the 2 states based on devoured
    const canHas = [];
    const wasYumz = [];
// iterate through the results with a for loop
    for (var i = 0; i < result.length; i++) {
      //pushing to one varible if  devoured
      if (result[i].devoured) {
        wasYumz.push(result[i]) 
    //pushing to the other variable if not devoured
      } else {
        canHas.push(result[i])
      }
    }
 //then render these arrays to index (object with key values)
    res.render("index", { 
      canHas: canHas,
      wasYumz: wasYumz
    })
  });
});


//Route POST
app.post("/", function (req, res) {
  connection.query(
      "INSERT INTO burger SET ?",
      {
          burger_name: req.body.burger,
          devoured: false
      },
      function (err, res) {
          if (err) throw err;
      }
  );
  res.redirect("/");
});

app.get("/api/:id", function (req, res) {
  connection.query(
      "UPDATE burger SET ? WHERE ?",
      [
          {
              devoured: true
          },
          {
              id: req.params.id
          }
      ],
      function (err, res) {
          if (err) throw err;
      }
  );
});


 
// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});

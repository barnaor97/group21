//import module
const express = require("express"); //bring the express package
const app = express(); //initiate the object which contain express
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const port = 3000;
const dbCrud = require("./db/dbCrud");
const sql = require("./db/DB");

app.use(express.static(path.join(__dirname, "static")));

app.use(bodyParser.json()); //init body parser
app.use(bodyParser.urlencoded({ extended: true })); //init body parser
app.use(cookieParser());

//load view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//routes
app.get("/", (req, res) => {
    res.render("homePage");
});

app.get("/homePage", (req, res) => {
    res.render("homePage");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/applications", (req, res) => {
    if (req.cookies.loggedInUserType !== "babysitter") {
        res.render("login");
    }
    res.render("applications");
});

app.get("/babysitterPage", (req, res) => {
    if (req.cookies.loggedInUserType !== "babysitter") {
        res.render("login");
    }
    res.render("babysitterPage");
});

app.get("/clientPage", (req, res) => {
    if (req.cookies.loggedInUserType !== "client") {
        res.render("login");
    }
    res.render("clientPage");
});

app.get("/clientSearch", (req, res) => {
    if (req.cookies.loggedInUserType !== "client") {
        res.render("login");
    }
    res.render("clientSearch");
});

app.get("/createNewOrder", (req, res) => {
    if (req.cookies.loggedInUserType !== "client") {
        res.render("login");
    }
    res.render("createNewOrder");
});

app.get("/newAccount-Babysitter", (req, res) => {
    res.render("newAccount-Babysitter");
});

app.get("/newAccount-Client", (req, res) => {
    res.render("newAccount-Client");
});

app.get("/newShift", (req, res) => {
    if (req.cookies.loggedInUserType !== "babysitter") {
        res.render("login");
    }
    res.render("newShift");
});

app.get("/ordersClient", (req, res) => {
    if (req.cookies.loggedInUserType !== "client") {
        res.render("login");
    }
    res.render("ordersClient");
});

app.get("/shifts", (req, res) => {
    if (req.cookies.loggedInUserType !== "babysitter") {
        res.render("login");
    }
    res.render("shifts");
});

//set up DB
//CREATE tables and INSERT them data
app.get("/initDb", dbCrud.init);

//show tables
app.get("/showTableBabysitters", dbCrud.showTableBabysitters);
app.get("/showTableClients", dbCrud.showTableClients);
app.get("/showTableOrders", dbCrud.showTableOrders);
app.get("/showTableShifts", dbCrud.showTableShifts);

//DROP tables
app.get("/dropTables", dbCrud.dropTables);

// routes
app.post("/login", dbCrud.login);
app.post("/createNewClient", dbCrud.createNewClient);
app.post("/createNewBabysitter", dbCrud.createNewBabysitter);
app.post("/createNewOrder", dbCrud.createNewOrder);
app.post("/createNewShift", dbCrud.createNewShift);
app.get("/getApplications", dbCrud.getApplications);
app.get("/getOrdersByClientId", dbCrud.getOrdersByClientId);
app.get("/getShiftsByBabysitterId", dbCrud.getShiftsByBabysitterId);
app.get("/searchBabysitters", dbCrud.searchBabysitters);
app.put("/approveOrder", dbCrud.approveOrder);
app.put("/updateOrderBabysitter", dbCrud.updateOrderBabysitter);
app.delete("/deleteShift", dbCrud.deleteShift);

//set up listen
app.listen(port, () => {
    console.log("server is running on port", port);
});

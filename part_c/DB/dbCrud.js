const sql = require("./DB");
const path = require("path");
const csv = require("csvtojson");

const init = (req, res) => {
    dropDb(req, res);
    createDb(req, res);
    useDb(req, res);

    createTableBabysitters(req, res);
    createTableClients(req, res);
    createTableOrders(req, res);
    createTableShifts(req, res);

    InsertDataBabysitter(req, res);
    InsertDataShifts(req, res);
    InsertDataClients(req, res);
    InsertDataOrders(req, res);

    res.status(200).send("DB Inited successfully!");
};

const dropDb = (req, res) => {
    const Q1 = "DROP DATABASE IF EXISTS `web`";
    sql.query(Q1, (err, mysqlres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in drop db web" });
            return;
        }
        console.log("dropped db web");
    });
};

const createDb = (req, res) => {
    const Q2 = "CREATE DATABASE IF NOT EXISTS web";
    sql.query(Q2, (err, mysqlres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating db" });
            return;
        }
        console.log("db web created");
    });
};

const useDb = (req, res) => {
    const Q3 = "use web";
    sql.query(Q3, (err, mysqlres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in using db web" });
            return;
        }
        console.log("using db web");
    });
};

//create tables
const createTableBabysitters = (req, res) => {
    const Q4 = `
    CREATE TABLE IF NOT EXISTS web.Babysitters(
      babysitterID INT NOT NULL AUTO_INCREMENT, 
      email VARCHAR(255) NOT NULL, 
      full_name VARCHAR(255) NOT NULL, 
      Date_Of_Birth datetime, 
      phone_Number VARCHAR(10), 
      password VARCHAR (15), 
      gender VARCHAR (15), 
      skill VARCHAR (300), 
      UNIQUE KEY email (email),
      PRIMARY KEY (babysitterID)
    )`;

    sql.query(Q4, (err, mysqlres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating table" });
            return;
        }
        console.log("created table Babysitters");
    });
};

const createTableClients = (req, res) => {
    const Q4 = `
    CREATE TABLE IF NOT EXISTS web.Clients(
      clientID INT NOT NULL AUTO_INCREMENT, 
      email VARCHAR(255) NOT NULL, 
      full_name VARCHAR(255) NOT NULL, 
      Date_Of_Birth datetime, 
      phone_Number VARCHAR(10), 
      password VARCHAR (15), 
      UNIQUE KEY email (email),
      PRIMARY KEY (clientID)
    )`;

    sql.query(Q4, (err, mysqlres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating table" });
            return;
        }
        console.log("created table Clients");
    });
};

const createTableOrders = (req, res) => {
    const Q4 = `
    CREATE TABLE IF NOT EXISTS web.Orders(
      orderID INT NOT NULL AUTO_INCREMENT, 
      clientID INT NOT NULL, 
      babysitterID INT,
      city VARCHAR(50),
      street VARCHAR (50), 
      number INT, 
      start DATETIME, 
      end DATETIME, 
      kids_number INT, 
      babysitterApproved tinyint(1),
      PRIMARY KEY (orderID),
      FOREIGN KEY (clientID) REFERENCES Clients(clientID)
    );`;

    sql.query(Q4, (err, mysqlres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating table" });
            return;
        }
        console.log("created table Orders");
    });
};

const createTableShifts = (req, res) => {
    const Q4 = `
    CREATE TABLE IF NOT EXISTS web.Shifts(
      shiftID INT NOT NULL AUTO_INCREMENT, 
      babysitterID INT NOT NULL, 
      start_time DATETIME, 
      end_time DATETIME, 
      city VARCHAR(50),
      PRIMARY KEY (shiftID),
      FOREIGN KEY (babysitterID) REFERENCES Babysitters(babysitterID)
    );`;

    sql.query(Q4, (err, mysqlres) => {
        if (err) {
            console.log("error ", err);
            res.status(400).send({ message: "error in creating table" });
            return;
        }
        console.log("created table Shifts");
    });
};

// run insert query
const InsertDataBabysitter = (req, res) => {
    var Q6 = "INSERT INTO web.babysitters SET ?";
    const csvFilePath = path.join(__dirname, "BabysitterData.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);
            jsonObj.forEach((element) => {
                var NewEntry = {
                    email: element.email,
                    full_name: element.full_name,
                    Date_Of_Birth: element.Date_Of_Birth,
                    phone_Number: element.phone_Number,
                    password: element.password,
                    gender: element.gender,
                    skill: element.skill,
                };
                sql.query(Q6, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data", err);
                    } else {
                        console.log("created row sucssefuly ");
                    }
                });
            });
        });
};

const InsertDataClients = (req, res) => {
    var Q6 = "INSERT INTO web.Clients SET ?";
    const csvFilePath = path.join(__dirname, "ClientData.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);
            jsonObj.forEach((element) => {
                var NewEntry = {
                    email: element.email,
                    full_name: element.full_name,
                    Date_Of_Birth: element.Date_Of_Birth,
                    phone_Number: element.phone_Number,
                    password: element.password,
                };
                sql.query(Q6, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data", err);
                    } else {
                        console.log("created row sucssefuly ");
                    }
                });
            });
        });
};

const InsertDataOrders = (req, res) => {
    var Q6 = "INSERT INTO web.orders SET ?";
    const csvFilePath = path.join(__dirname, "OrdersData.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);
            jsonObj.forEach((element) => {
                var NewEntry = {
                    clientID: element.clientID,
                    babysitterID: Math.floor(Math.random() * 3 + 1),
                    city: element.city,
                    street: element.street,
                    number: element.number,
                    start: element.start,
                    end: element.end,
                    kids_number: element.kids_number,
                    babysitterApproved: element.babysitterApproved,
                };
                sql.query(Q6, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data", err);
                    } else {
                        console.log("created row sucssefuly ");
                    }
                });
            });
        });
};

const InsertDataShifts = (req, res) => {
    var Q6 = "INSERT INTO web.shifts SET ?";
    const csvFilePath = path.join(__dirname, "ShiftsData.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            console.log(jsonObj);
            jsonObj.forEach((element) => {
                var NewEntry = {
                    babysitterID: element.babysitterID,
                    start_time: element.start_time,
                    end_time: element.end_time,
                    city: element.city,
                };
                sql.query(Q6, NewEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data", err);
                    } else {
                        console.log("created row sucssefuly ");
                    }
                });
            });
        });
};

//show tables
const showTableBabysitters = (req, res) => {
    const Q5 = "select * from web.Babysitters";
    sql.query(Q5, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.send("cannot find table babysitters");
            return;
        }
        res.send(mysqlres);
        return;
    });
};

const showTableClients = (req, res) => {
    const Q5 = "select * from web.Clients";
    sql.query(Q5, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.send("cannot find table Clients");
            return;
        }
        res.send(mysqlres);
        return;
    });
};

const showTableOrders = (req, res) => {
    const Q5 = "select * from web.Orders";
    sql.query(Q5, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.send("cannot find table Orders");
            return;
        }
        res.send(mysqlres);
        return;
    });
};

const showTableShifts = (req, res) => {
    const Q5 = "select * from web.Shifts";
    sql.query(Q5, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.send("cannot find table Shifts");
            return;
        }
        res.send(mysqlres);
        return;
    });
};

//create a babysitter
const createNewBabysitter = (req, res) => {
    // validate info exists
    if (!req.body) {
        res.status(400).send("content cannot be empty");
        return;
    }
    // pull info from body into object
    const newBabysitter = {
        email: req.body.email,
        full_name: req.body.full_name,
        Date_Of_Birth: req.body.Date_Of_Birth,
        phone_Number: req.body.phone_Number,
        password: req.body.password,
        skill: req.body.skill,
        gender: req.body.gender,
    };

    // run insert query
    const Q6 = "insert into web.Babysitters set ?";
    sql.query(Q6, newBabysitter, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
            return;
        }
        console.log("created new babysitter", req.body);
        newBabysitter.babysitterID = mysqlres.insertId;
        res.status(200).json(newBabysitter);
        return;
    });
};

//create a Client
const createNewClient = (req, res) => {
    // validate info exists
    if (!req.body) {
        res.status(400).send("content cannot be empty");
        return;
    }
    // pull info from body into object
    const newClient = {
        email: req.body.email,
        full_name: req.body.full_name,
        Date_Of_Birth: req.body.Date_Of_Birth,
        phone_Number: req.body.phone_Number,
        password: req.body.password,
    };
    // run insert query
    const Q6 = "insert into web.Clients set ?";
    sql.query(Q6, newClient, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
            return;
        }
        console.log("created new client", req.body);
        newClient.clientID = mysqlres.insertId;
        res.status(200).json(newClient);
        return;
    });
};

//create an order
const createNewOrder = (req, res) => {
    // validate info exists
    if (!req.body) {
        res.status(400).send("content cannot be empty");
        return;
    }

    // pull info from body into object
    const newOrder = {
        clientID: req.body.clientID,
        city: req.body.city,
        street: req.body.street,
        number: req.body.number,
        start: req.body.start,
        end: req.body.end,
        kids_number: req.body.kids_number,
        babysitterApproved: 0,
    };
    // run insert query
    const Q6 = "insert into web.Orders set ?";
    sql.query(Q6, newOrder, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
            return;
        }
        console.log("created new order", req.body);
        newOrder.orderID = mysqlres.insertId;
        res.status(200).json(newOrder);
        return;
    });
};

//create A shift
const createNewShift = (req, res) => {
    // validate info exists
    if (!req.body) {
        res.status(400).send("content cannot be empty");
        return;
    }
    // pull info from body into object
    const newShift = {
        babysitterID: req.body.babysitterID,
        city: req.body.city,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
    };
    // run insert query
    const Q6 = "insert into web.Shifts set ?";
    sql.query(Q6, newShift, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
            return;
        }
        console.log("created new shift", req.body);
        newShift.shiftID = mysqlres.insertId;
        res.status(200).json(newShift);
        return;
    });
};

const dropTables = (req,res) => {
    dropTableShifts(req.res);
    dropTableOrders(req,res);
    dropTableClients(req,res);
    dropTableBabysitters(req, res); 
    
    res.status(200).send("tables droped successfully!");
};

const dropTableBabysitters = (req, res) => {
    const Q7 = "DROP TABLE web.Babysitters";
    sql.query(Q7, (err, mysqlres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({ message: "error in dropping table" + err });
            return;
        }
        console.log("table Babysitters dropped");
       
        return;
    });
};

const dropTableClients = (req, res) => {
    const Q7 = "DROP TABLE web.Clients";
    sql.query(Q7, (err, mysqlres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({ message: "error in dropping table" + err });
            return;
        }
        console.log("table Clients dropped");
        
        return;
    });
};

const dropTableOrders = (req, res) => {
    const Q7 = "DROP TABLE web.Orders";
    sql.query(Q7, (err, mysqlres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({ message: "error in dropping table" + err });
            return;
        }
        console.log("table Orders dropped");
        
        return;
    });
};

const dropTableShifts = (req, res) => {
    const Q7 = "DROP TABLE web.Shifts";
    sql.query(Q7, (err, mysqlres) => {
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({ message: "error in dropping table" + err });
            return;
        }
        console.log("table shifts dropped");
        
        return;
    });
};

const login = (req, res) => {
    if (!req.body) {
        console.log("username & password are required");
        res.redirect(
            "/login?e=" + encodeURIComponent("username & password are required")
        );
    }

    const { email, password } = req.body;
    sql.query(
        "SELECT * FROM web.Clients WHERE `email` = '" +
            email +
            "' AND `password` = '" +
            password +
            "' LIMIT 1",
        function (err, data, fields) {
            if (err) {
                res.redirect("/login?e=" + encodeURIComponent(err.message));
            } else if (data.length) {
                const loggedInUser = JSON.parse(JSON.stringify(data[0]));
                res.cookie("loggedInUser", loggedInUser);
                res.cookie("loggedInUserType", "client");
                res.redirect("/clientPage");
            } else {
                sql.query(
                    "SELECT * FROM web.Babysitters WHERE `email` = '" +
                        email +
                        "' AND `password` = '" +
                        password +
                        "' LIMIT 1",
                    function (err, data, fields) {
                        if (err) {
                            res.redirect(
                                "/login?e=" + encodeURIComponent(err.message)
                            );
                        } else if (data.length) {
                            const loggedInUser = JSON.parse(
                                JSON.stringify(data[0])
                            );
                            res.cookie("loggedInUser", loggedInUser);
                            res.cookie("loggedInUserType", "babysitter");
                            res.redirect("/babysitterPage");
                        } else {
                            res.redirect(
                                "/login?e=" +
                                    encodeURIComponent(
                                        "user was not found for the given credentials"
                                    )
                            );
                        }
                    }
                );
            }
        }
    );
};

const getOrdersByClientId = (req, res) => {
    const { clientID } = req.query;
    const Q5 = `select o.*, b.full_name from web.Orders as o
    left join web.Babysitters as b on o.babysitterID = b.babysitterID
    WHERE o.clientID = ${clientID}`;
    sql.query(Q5, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.send("cannot find Orders for clientID: " + clientID);
            return;
        }
        res.send(mysqlres);
        return;
    });
};

const getShiftsByBabysitterId = (req, res) => {
    const { babysitterID } = req.query;
    const Q5 = `select * from web.Shifts 
    WHERE babysitterID = ${babysitterID}`;
    sql.query(Q5, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.send("cannot find Shifts for babysitterID: " + babysitterID);
            return;
        }
        res.send(mysqlres);
        return;
    });
};

const getApplications = (req, res) => {
    const { babysitterID } = req.query;
    const Q5 = `SELECT o.*, c.full_name, c.phone_Number 
    FROM web.Orders as o 
    JOIN web.Clients as c on c.clientID = o.clientID 
    WHERE o.babysitterID = ${babysitterID}`;
    sql.query(Q5, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.send("cannot find Orders for babysitterID: " + babysitterID);
            return;
        }
        res.send(mysqlres);
        return;
    });
};

const searchBabysitters = (req, res) => {
    const { city, start, end } = req.query;
    let start_time = start.replaceAll("-", "/").replace("T", " ");
    let end_time = end.replaceAll("-", "/").replace("T", " ");

    const Q5 = `SELECT s.*, b.full_name, b.phone_Number, b.email, b.gender, b.skill, b.Date_Of_Birth 
    FROM Web.Shifts as s
    JOIN Web.Babysitters b on b.babysitterID = s.babysitterID
    WHERE s.city LIKE '%${city}%' AND s.start_time >= '${start_time}' AND s.end_time <= '${end_time}'`;

    sql.query(Q5, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.send(
                `cannot find babysitters for city: ${city}, start: ${start}, end: ${end}`
            );
            return;
        }
        res.send(mysqlres);
        return;
    });
};

const approveOrder = (req, res) => {
    // validate info exists
    if (!req.body) {
        res.status(400).send("content cannot be empty");
        return;
    }

    // pull info from body into object
    const update = {
        orderID: req.body.orderID,
        babysitterID: req.body.babysitterID,
    };

    // run insert query
    const Q6 = `UPDATE web.Orders set babysitterApproved = 1 WHERE babysitterID = ${update.babysitterID} AND orderID = ${update.orderID}`;
    sql.query(Q6, update, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
            return;
        }
        console.log("updated order", req.body);
        res.status(200).json(update);
        return;
    });
};

const updateOrderBabysitter = (req, res) => {
    // validate info exists
    if (!req.body) {
        res.status(400).send("content cannot be empty");
        return;
    }

    // pull info from body into object
    const update = {
        orderID: req.body.orderID,
        babysitterID: req.body.babysitterID,
    };

    // run insert query
    const Q6 = `UPDATE web.Orders set babysitterID = ${update.babysitterID} WHERE orderID = ${update.orderID}`;
    sql.query(Q6, update, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
            return;
        }
        console.log("updated order", req.body);
        res.status(200).json(update);
        return;
    });
};

const deleteShift = (req, res) => {
    const { id } = req.query;
    const Q5 = `DELETE from web.Shifts 
    WHERE shiftID = ${id}`;
    sql.query(Q5, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.send("cannot delete Shift for shiftID: " + id);
            return;
        }
        res.send(mysqlres);
        return;
    });
};

module.exports = {
    init,
    login,
    getOrdersByClientId,
    getShiftsByBabysitterId,
    getApplications,
    searchBabysitters,
    approveOrder,
    updateOrderBabysitter,
    showTableBabysitters,
    showTableClients,
    showTableOrders,
    showTableShifts,
    createNewClient,
    createNewBabysitter,
    createNewOrder,
    createNewShift,
    deleteShift,
    dropTables
};

const express = require('express');
const path = require('path');
const ejs = require('ejs');
const collection = require("./config");
const bcrypt = require('bcrypt');

const app = express();
// convert data into json format
app.use(express.json());
// Static file
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));

// Set up views directory and view engine
app.set('views', path.join(__dirname,'views'));
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/SmartPhones", (req, res) => {
    res.render("smartphones"); 
});

app.get("/AppleDetails", (req, res) => {
    res.render("appledetails"); 
});

app.get("/SamsungDetails", (req, res) => {
    res.render("samsungdetails"); 
});

app.get("/OnePlusDetails", (req, res) => {
    res.render("oneplusdetails"); 
});

app.get("/GooglepixelDetails", (req, res) => {
    res.render("Googlepixeldetails"); 
});

app.get('/NothingDetails', (req, res) => {
    res.render('nothingdetails');
})

app.get("/Laptops", (req, res) => {
    res.render("laptops");
});

app.get("/Explore", (req, res) => {
    res.render("explore"); // Assuming "smartphones.ejs" is in your views directory
});

app.get('/slide', (req, res) => {
    res.render('slide');
});

app.get('/Laptops', (req, res) => {
    res.render('laptops');
});

app.get('/GadgetNews', (req, res) => {
    res.render('gadgetnews');
})

app.get('/Speakers', (req, res) => {
    res.render('speakers');
});

app.get('/Watches', (req, res) => {
    res.render('watches');
});

app.get('/Earpods', (req, res) => {
    res.render('earpods');
})

app.get('/AppleLaptops', (req, res) => {
    res.render('applelaptops');
})

app.get('/Watches', (req, res) => {
    res.render('watches');
})

// Register User
app.post("/signup", async (req, res) => {
    try {
        const data = {
            name: req.body.username,
            email: req.body.email,
            password: req.body.password
        }

        // Check if the email already exists in the database
        const existingUser = await collection.findOne({ email: data.email });

        if (existingUser) {
            res.send('Email already exists. Please choose a different email.');
        } else {
            // Hash the password using bcrypt
            const saltRounds = 10; // Number of salt rounds for bcrypt
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);

            data.password = hashedPassword; // Replace the original password with the hashed one

            const userdata = await collection.insertMany(data);
            console.log(userdata);
            res.send('User registered successfully!');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing request.');
    }
});

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ email: req.body.email });
        if (!check) {
            res.send("Email cannot be found");
        } else {
            // Compare the hashed password from the database with the plaintext password
            const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
            if (!isPasswordMatch) {
                res.send("Wrong Password");
            } else {
                res.render("index");
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing request.');
    }
});


// Define Port for Application
const port = 5424;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});

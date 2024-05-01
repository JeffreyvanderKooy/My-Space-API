import axios from "axios";
import express from "express";
import bodyParser from "body-parser"

const app = express();
const port = 3000;

const API_KEY = "";

const todayDate = new Date();
var day = todayDate.getDate();
if (day < 10) {
    day = "0" + day.toString();
}

var month = todayDate.getMonth() + 1;
if (month < 10) {
    month = "0" + month.toString();
}

var year = todayDate.getFullYear()
var date = `${year}-${month}-${day}`

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

var tommorowDay = tomorrow.getDate();
if (tommorowDay < 10) {
    tommorowDay = "0" + tommorowDay.toString();
}

var tommorowMonth = tomorrow.getMonth() + 1;
if (tommorowMonth < 10) {
    tommorowMonth = "0" + tommorowMonth.toString();
}

var tommorowYear = tomorrow.getFullYear()
var tomorrowDate = `${tommorowYear}-${tommorowMonth}-${tommorowDay}`


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/asteroid", async(req, res)=> {

    try {
    const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${tomorrowDate}&api_key=${API_KEY}`);
    const data = response.data;

    const myObject = data.near_earth_objects;
    let value;
    for (const key in myObject) {
    value = myObject[key];
}
    var content = value[Math.floor(Math.random()*value.length)];

    var name = content.name;
    var magnitude = content.absolute_magnitude_h;
    var km = (content.estimated_diameter.kilometers.estimated_diameter_min + content.estimated_diameter.kilometers.estimated_diameter_min) / 2;
    var miles = (content.estimated_diameter.miles.estimated_diameter_min + content.estimated_diameter.miles.estimated_diameter_min) / 2;
    var dangerous = content.is_potentially_hazardous_asteroid;
    
    const myClosest = content.close_approach_data;
    let dato;
    for (const key in myClosest) {
    dato = myClosest[key];
    
    var closest = dato.close_approach_date_full;

    var kmh = dato.relative_velocity.kilometers_per_hour;
    var mph = dato.relative_velocity.miles_per_hour;

    res.render("asteroid.ejs", {
        name: name,
        magnitude: magnitude,
        km: km,
        miles: miles,
        dangerous: dangerous,
        closest: closest,
        kmh: kmh,
        mph: mph,
    })
    }
    } catch (error) {
        console.log(error);
    }
});

app.get("/rover", async(req, res)=> {

    try {
    
    const yesterday = new Date(new Date());
    yesterday.setDate(yesterday.getDate() - 1);
    
    var yesterdayDay = yesterday.getDate();
    var yesterdayMonth = yesterday.getMonth() +1;
    var yesterdayYear = 2022;

    var yesterdayDate = (`${yesterdayYear}-${yesterdayMonth}-${yesterdayDay}`);

    const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${yesterdayDate}&api_key=${API_KEY}`);
    const data = response.data.photos;
    
    const content = [];
    var AmountOfSlides = 5;

    for (var i=0; i<AmountOfSlides; i++) {
        content.push(data[Math.floor(Math.random()*data.length)].img_src);
    }
    
    res.render("rover.ejs", {
        date: date,
        content: content,
    })

    } catch (error) {
        console.log(error);
    }
})

app.get("/astrology", async(req, res)=> {

    try {
        
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
        const data = response.data;
        
        res.render("astrology.ejs", {
            content: data,
        })

       
    } catch (error) {
        console.log(error);
    }
})

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.listen(port, () => {
    console.log(`listen on port:${port}`);
})
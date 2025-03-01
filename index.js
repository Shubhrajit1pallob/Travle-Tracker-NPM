import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Client({
  user: process.env.DB_USER,
  host: "localhost",
  database: "world",
  password: process.env.DB_PASSWORD,
  port: 5432,
});


const app = express();
const port = 3000;

db.connect();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisited() {

  let country_code = [];
  const result = await db.query("SELECT country_code FROM visited_countries");
  result.rows.forEach((row) => {
    country_code.push(row.country_code);
  });
  return country_code;

}

app.get("/", async (req, res) => {
  //Write your code here.
  const country_code = await checkVisited();
  // console.log(country_code);
  res.render("index.ejs", { countries: country_code, total: country_code.length });
});

app.post("/add", async (req, res) => {
  const country = capitalizeFirstLetter(req.body.country);
  console.log(country);
  try {
    // Queries the database for the country code
    const result = await db.query(
      "SELECT country_code FROM countries WHERE country_name LIKE $1",
      [`%${country}%`]
    );
    if (result.rows.length > 0) {
      const country_code = result.rows[0].country_code;
      console.log(`Found: ${country}`);

      // Check if the country code is already in the visited_countries table
      const visited = await checkVisited();

      if (visited.includes(country_code)) {
        console.log("Country already visited");
        res.render("index.ejs", { countries: visited, total: visited.length, error: "Country already visited" });
        return;
      }

      // Inserts the country code into the visited_countries table if it is not already there
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [country_code]
      );
      res.redirect("/");
    } else {
      const country_code = await checkVisited();
      res.render("index.ejs", { countries: country_code, total: country_code.length, error: "Country not found" });
      console.error("Country code not found for:", country);
    }
  } catch (err) {
    console.error("Error executing query", err.stack);
  }

});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



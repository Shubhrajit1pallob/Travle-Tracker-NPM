# Travel Tracker

Travel Tracker is a web application that allows users to track the countries they have visited. Users can add new countries to their visited list, and the application will display the total number of countries visited.

## Features

- Add a country to the visited list
- Display the total number of countries visited
- Prevent duplicate entries for visited countries
- Display error messages for invalid or duplicate country entries

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- EJS (Embedded JavaScript) for templating
- dotenv for environment variable management

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/travel-tracker.git
   cd travel-tracker
   ```
2. Install the dependencies:

    ```sh
    npm install
    ```

3. Set up the PostgreSQL database:

- Create a PostgreSQL database named world.
- Create the necessary tables:

    ```sh
    CREATE TABLE countries (
        country_name VARCHAR(255) PRIMARY KEY,
        country_code VARCHAR(10)
    );

    CREATE TABLE visited_countries (
        country_code VARCHAR(10) PRIMARY KEY
    );
    ```

4. Create a .env file in the root directory and add your database credentials:

    ```sh
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=world
    ```

5. Start the server:

    ```sh
    npm start
    ```

## Usage

1. Enter the name of a country in the input field and click the "Add" button.
2. If the country exists in the database and has not been visited before, it will be added to the visited list.
3. The total number of countries visited will be displayed.
4. If the country does not exist in the database or has already been visited, an error message will be displayed.

## Project Structure

```
    travel-tracker/
    ├── public/
    │   └── ... (static files)
    ├── views/
    │   └── index.ejs (EJS template)
    ├── .env (environment variables)
    ├── index.js (main server file)
    ├── package.json (project metadata and dependencies)
    └── README.md (project documentation)
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
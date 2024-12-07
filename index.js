import express from "express";
import { aol } from "./middleware/aol.js";
import { limiter } from "./middleware/rateLimit.js";
import { headersRoute } from "./middleware/headers.js";

const app = express();

//middleware for json
app.use(express.json());

//custom middleware
app.use(aol);

//express rate limit middleware
app.use(limiter);

// headers middleware
app.use(headersRoute);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

//middleware for handling 'Not found' error
const handleNotFound = (req, res) => {
  res.status(404).json({
    error: 404,
    message: "Not found.",
  });
};

app.use(handleNotFound);

app.listen(3000, () => {
  console.log("Server started on Port 3000!");
});

# Express Middleware Project

## Project Overview

This project demonstrates the use of custom and third-party middleware in an Express.js application. It explores middleware concepts by:

- Logging request and day-specific messages (custom middleware).
- Limiting API requests using **express-rate-limit**.
- Inspecting request headers (middleware stack exploration).
- Testing each middleware for functionality and integration.

---

## Project Initialization

### Repository Setup

1. **Created a GitHub Repository**:
   - Repository Name: `express-middleware`
   - Initialized the repository with a README file and .gitignore set to Node.
2. **Cloned the Repository Locally**:
   ```bash
   git clone <repository-url>
   cd express-middleware
   ```

### Project Configuration

1. **Initialized a Node.js Project**:
   ```bash
   npm init -y
   ```
   - Set `"type": "module"` in `package.json` for ES module support.
2. **Installed Dependencies**:
   ```bash
   npm install express
   npm install --save-dev nodemon
   npm install express-rate-limit
   ```
3. **Configured `package.json` Scripts**:
   ```json
   "scripts": {
     "start": "node index.js",
     "dev": "nodemon index.js"
   }
   ```

---

## Creating the Server

1. **Set Up the Basic Server (`index.js`)**:

   - Imported necessary modules and middleware.
   - Configured a JSON parser middleware.
   - Defined routes and middleware to handle 404 errors.

   ```javascript
   import express from "express";
   import { aol } from "./middleware/aol.js";
   import { limiter } from "./middleware/rateLimit.js";
   import { headersRoute } from "./middleware/headers.js";

   const app = express();
   app.use(express.json());
   app.use(aol);
   app.use(limiter);
   app.use(headersRoute);

   app.get("/", (req, res) => {
     res.send("Hello, World!");
   });

   const handleNotFound = (req, res) => {
     res.status(404).json({ error: 404, message: "Not found." });
   };

   app.use(handleNotFound);

   app.listen(3000, () => {
     console.log("Server started on Port 3000!");
   });
   ```

---

## Custom Middleware (`aol.js`)

### Functionality

The custom middleware logs a message indicating the current day and date, inspired by the classic "You've got mail!" greeting.

### Code Example

```javascript
const aol = (req, res, next) => {
  const today = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = days[today.getDay()];
  const date = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  console.log(
    `You've got mail! Today on ${dayName}, ${date} you have 10 unread messages.`
  );
  next();
};

export { aol };
```

---

## Third-Party Middleware (`rateLimit.js`)

### Functionality

This middleware uses **express-rate-limit** to limit the number of requests from a single IP to 10 requests per 3 minutes.

### Code Example

```javascript
import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 3 minutes
  limit: 10, // Max 10 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});

export { limiter };
```

### Testing

- **Steps**:
  1. Start the server: `npm run dev`.
  2. Use Postman or Thunder Client to make multiple requests to `http://localhost:3000`.
  3. Observe that after 10 requests, further attempts return a `429 Too Many Requests` error.
     ![alt text](<Screenshot 2024-12-05 211349.png>)

---

## Exploring Middleware Stack (`headers.js`)

### Functionality

This middleware logs specific headers such as:

- `Host`
- `Accept-Language`
- `User-Agent` (Platform/Browser Info)

### Code Example

```javascript
const headersRoute = (req, res, next) => {
  const host = req.headers.host || "Unknown";
  const language = req.headers["accept-language"] || "Unknown";
  const platform = req.headers["user-agent"] || "Unknown";

  console.log(`Headers Host: ${host}`);
  console.log(`Headers Language: ${language}`);
  console.log(`Headers Platform: ${platform}`);

  next();
};

export { headersRoute };
```

### Testing

- **Steps**:
  1. Send a request to the server using a browser or API client.
  2. Observe the logged headers in the console:
     ```
     Headers Host: localhost:3000
     Headers Language: en-US,en;q=0.9
     Headers Platform: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
     ```

---

## Testing the Project

### Tools Used

- **Thunder Client** for API requests.
- Browser for quick testing of the `GET /` route.

### Test Cases

1. **Custom Middleware**:
   - Verify the "You've got mail!" message in the server console.
2. **Rate Limiting**:
   - Test that the server allows only 10 requests per 3 minutes.
3. **Header Logging**:
   - Confirm headers are logged correctly for each request.

---

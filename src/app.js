const express = require("express");

const app = express();

const urlsRouter = require("./urls/urls.router");

app.use(express.json());

app.use("/urls", urlsRouter);

// Not found handler
app.use((req, res, next) => {
    next({
        status: 404,
        message: `Not found: ${req.originalUrl}`
    });
});

// error handler
app.use((err, req, res, next) => {
    console.error(err);
    const { status = 500, message = "Something went wrong!" } = err;
    res.status(status).json({ error: message });
});

module.exports = app;


/*
HTTP verb	Path	Description
XXX POST	/urls	Create a new short URL
XXX GET	/urls/:urlId	Retrieve a short URL by ID
XXX PUT	/urls/:urlId	Update a short URL by ID
XXX GET	/urls	Retrieve a list of all short URLs
XXX GET	/urls/:urlId/uses	Retrieve a list of use metrics for a given short URL ID
GET	/urls/:urlId/uses/:useId	Retrieve a use metric by ID for a given short URL ID
*/
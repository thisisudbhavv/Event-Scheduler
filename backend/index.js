const express = require("express");
const { google } = require("googleapis");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const scopes = ["https://www.googleapis.com/auth/calendar"];

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

const calendar = google.calendar({
  version: "v3",
  auth: oauth2Client,
});

const port = process.env.PORT || 8000;

app.get("/auth", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });

  res.redirect(url);
});

app.get("/auth/redirect", async (req, res) => {
  try {
    const { tokens } = await oauth2Client.getToken(req.query.code);
    oauth2Client.setCredentials(tokens);

    res.redirect(`${process.env.FRONTEND_URL}/addevent?auth=success`);
  } catch (error) {
    console.log("Error during OAuth redirect:", error);
    res.status(500).send("Authentication Failed!");
  }
});

app.post("/create-event", async (req, res) => {
  const data = req.body;

  const event = {
    summary: data.summary,
    location: data.location,

    description: data.description,
    start: {
      dateTime: data.start.dateTime,
      timeZone: data.start.timeZone,
    },
    end: {
      dateTime: data.end.dateTime,
      timeZone: data.end.timeZone,
    },
    colorId: data.colorId,
    conferenceData: {
      createRequest: {
        requestId: uuidv4(),
      },
    },
    attendees: data.attendees,
  };

  try {
    const result = await calendar.events.insert({
      calendarId: "primary",
      auth: oauth2Client,
      conferenceDataVersion: 1,
      sendUpdates: "all",
      resource: event,
    });
    res.send({
      status: 200,
      message: "Event Created",
      link: result.data.hangoutLink,
    });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const express = require("express");
const { google } = require("googleapis");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");

dotenv.config();

const app = express();
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

const event = {
  summary: "Tech talk",
  location: "Meet",

  description: "Demo event",
  start: {
    dateTime: "2024-08-20T13:30:00+05:30",
    timeZone: "Asia/Kolkata",
  },
  end: {
    dateTime: "2024-08-20T14:30:00+05:30",
    timeZone: "Asia/Kolkata",
  },
  colorId: 1,
  conferenceData: {
    createRequest: {
      requestId: uuidv4(),
    },
  },
  attendees: [{ email: "thisisudbhavv@gmail.com" }],
};

const port = process.env.PORT || 8000;

app.get("/auth", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });

  res.redirect(url);
});

app.get("/auth/redirect", async (req, res) => {
  const { tokens } = await oauth2Client.getToken(req.query.code);
  oauth2Client.setCredentials(tokens);
  res.send("Authentication Successful!");
});

app.get("/create-event", async (req, res) => {
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

import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const AddEvent = () => {
  const [summary, setSummary] = useState("");
  const [loc, setLoc] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endDate, setEndDate] = useState();
  const [endTime, setEndTime] = useState();
  const [emails, setEmails] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const authStatus = queryParams.get("auth");

    if (authStatus === "success") {
      alert("Authentication Successful!");
    }
  }, [location]);

  const handleEmails = (event) => {
    const emails = event.target.value.split(",");
    setEmails(emails);
  };

  const handleAddEvent = async () => {
    try {
      const eventDetails = {
        summary,
        location: loc,
        description,
        start: {
          dateTime: `${startDate}T${startTime}:00`,
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: `${endDate}T${endTime}:00`,
          timeZone: "Asia/Kolkata",
        },
        attendees: emails.map((email) => ({ email: email.trim() })),
        colorId: 1,
      };

      const response = await axios.post(
        "http://localhost:3000/create-event",
        eventDetails
      );
      alert(`Event Created! Join link: ${response.data.link}`);
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="grid grid-cols-2">
        <div className="flex flex-col justify-end pr-80">
          <div className="text-6xl font-bold text-blue-900 py-5">Evently</div>
          <div className="text-2xl font-medium text-gray-600">
            Effortless Meeting Scheduling
          </div>
        </div>
        <div className="">
          <InputBox
            onChange={(e) => {
              setSummary(e.target.value);
            }}
            label={"Title"}
            placeholder={"John Doe"}
          />
          <InputBox
            onChange={(e) => {
              setLoc(e.target.value);
            }}
            label={"Location"}
            placeholder={"Meet"}
          />
          <InputBox
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            label={"Description"}
            placeholder={"Description"}
          />
          <div className="flex flex-row">
            <InputBox
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
              label={"Start Date"}
              placeholder={"dd/mm/yyyy"}
              type={"Date"}
            />
            <InputBox
              onChange={(e) => {
                setStartTime(e.target.value);
              }}
              label={"Start Time"}
              placeholder={"hh:mm:ss"}
              type={"Time"}
            />
          </div>
          <div className="flex flex-row">
            <InputBox
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
              label={"End Date"}
              placeholder={"dd/mm/yyyy"}
              type={"Date"}
            />
            <InputBox
              onChange={(e) => {
                setEndTime(e.target.value);
              }}
              label={"End Time"}
              placeholder={"hh:mm:ss"}
              type={"Time"}
            />
          </div>
          <div className="p-2">
            <div className="block mb-2 text-sm font-medium text-gray-900">
              Attendess
            </div>
            <div>
              <input
                className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={"Emails seperated by comma"}
                type="email"
                multiple
                onChange={handleEmails}
              />
            </div>
          </div>
          <Button onClick={handleAddEvent} label={"Add Event"} />
        </div>
      </div>
    </div>
  );
};

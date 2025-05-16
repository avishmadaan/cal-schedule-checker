import axios from "axios";
import { sentAlertEmail } from "./emailer.js";
import cron from "node-cron";


const INPUT_PAYLOAD = {
    json: {
      isTeamEvent: false,
      usernameList: ["100xdevs"],
      eventTypeSlug: "super30-interviews",
      startTime: "2025-05-31T18:30:00.000Z",
      endTime:   "2025-06-30T18:29:59.999Z",
      timeZone:  "Asia/Dushanbe",
      duration:  null,
      rescheduleUid:       null,
      orgSlug:             null,
      teamMemberEmail:     null,
      routedTeamMemberIds: null,
      skipContactOwner:    false,
      _shouldServeCache:   null,
      routingFormResponseId: null,
      email:               null
    },
    meta: {
      values: {
        duration:               ["undefined"],
        orgSlug:                ["undefined"],
        teamMemberEmail:        ["undefined"],
        _shouldServeCache:      ["undefined"],
        routingFormResponseId:  ["undefined"]
      }
    }
  };

async function callingCal() {
  try {
    // let Axios handle the percent-encoding
    const response = await axios.get(
      "https://cal.com/api/trpc/slots/getSchedule",
      { params: { input: JSON.stringify(INPUT_PAYLOAD) } }
    );

    const events = response.data.result.data.json.slots;
    if(!isEmpty(events))  {
      console.log(`Found  slots—sending email…`);
      await sentAlertEmail("theavishmadaan@gmail.com");
    } else {
      console.log("No slots available right now.");
    }
  } catch (e) {
    if (e.response) {
      console.error(
        "Cal API error:",
        e.response.status,
        JSON.stringify(e.response.data, null, 2)
      );
    } else {
      console.error("Network/other error:", e);
    }
  }
}

callingCal();

const isEmpty = (obj) => Object.keys(obj).length === 0;

cron.schedule(
    "*/10 * * * *",         // ── every 10th minute
    async () => {
      console.log("Scheduler triggered at", new Date().toISOString());
      await callingCal();
    },
    {
      scheduled: true,
      timezone: "Asia/Kolkata" // optional, ensures correct TZ
    }
  );
  
  console.log("Cron job set up: callingCal() will run every 10 minutes.");
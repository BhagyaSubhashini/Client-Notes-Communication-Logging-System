import axios from "axios";

const formatPhoneNumber = (phone) => {
  if (!phone) return null;

  // Remove spaces and dashes
  phone = phone.replace(/\s+/g, "").replace(/-/g, "");

  // Convert 07xxxxxxxx -> 947xxxxxxxx
  if (phone.startsWith("07")) {
    return "94" + phone.substring(1);
  }

  // Already in international format
  if (phone.startsWith("94")) {
    return phone;
  }

  return phone;
};

export const sendSMS = async (phoneNumber, message) => {
  try {
    const recipient = formatPhoneNumber(phoneNumber);

    const response = await axios.post(
      `${process.env.TEXTLK_API_URL}/sms/send`,
      {
        recipient,
        sender_id: process.env.TEXTLK_SENDER_ID,
        type: "plain",
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TEXTLK_API_TOKEN}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("SMS Sent Successfully");
    console.log(response.data);

    return true;

  } catch (err) {

    console.error(
      "SMS Failed:",
      err.response?.data || err.message
    );

    return false;
  }
};
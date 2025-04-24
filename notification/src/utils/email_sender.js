import { mailsand } from "../config/email_config.js"

export const emailSender = async (value) => {
  try {
    const candidateList = value.candidates.map(
      (c, i) => `<li><strong>Passenger ${i + 1}:</strong> ${c.name} (Age: ${c.age})</li>`
    ).join('');

    const formattedDate = new Date(value.booked_at).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    const formattedTime = new Date(value.booked_at).toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit'
    });

    await mailsand.sendMail({
      from: process.env.GMAIL,
      to: value.email,
      subject: "✈️ Flight Ticket Booking Confirmation",
      text: "Your flight ticket has been successfully booked. Check your email for details.",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #e6f2ff;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); overflow: hidden;">
            <div style="background-color: #007bff; color: white; padding: 20px; text-align: center;">
              <h2>✅ Flight Ticket Confirmed</h2>
              <p style="margin: 5px 0;">Booking ID: #${value.id}</p>
              <p style="margin: 0;">Flight ID: ${value.flight_id}</p>
            </div>
            <div style="padding: 20px;">
              <p><strong>Status:</strong> ${value.status.toUpperCase()}</p>
              <p><strong>Booked At:</strong> ${formattedDate} - ${formattedTime}</p>
              <p><strong>Total Price:</strong> ₹${value.totel_price}</p>
              <hr />
              <h3>Passenger Details</h3>
              <ul style="padding-left: 20px;">
                ${candidateList}
              </ul>
              <p>Please keep this email as your digital flight ticket.</p>
              <p style="margin-top: 20px;">We wish you a pleasant journey! 🛫</p>
            </div>
            <div style="background-color: #f1f1f1; text-align: center; padding: 10px; font-size: 12px; color: #555;">
              Need help? Contact us at support@example.com
            </div>
          </div>
        </div>
      `
    });
  } catch (error) {
    console.log(error);
  }
}

export const DelemailSender = async (value) => {
  try {
    const candidateList = value.candidates.map(
      (c, i) => `<li><strong>Passenger ${i + 1}:</strong> ${c.name} (Age: ${c.age})</li>`
    ).join('');

    const formattedDate = new Date(value.booked_at).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    const formattedTime = new Date(value.booked_at).toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit'
    });

    await mailsand.sendMail({
      from: process.env.GMAIL,
      to: value.email,
      subject: "❌ Flight Ticket Cancellation Notice",
      text: "Your flight ticket has been canceled. Please check your email for details.",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #fff3f3;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); overflow: hidden;">
            <div style="background-color: #dc3545; color: white; padding: 20px; text-align: center;">
              <h2>❌ Flight Ticket Canceled</h2>
              <p style="margin: 5px 0;">Booking ID: #${value.id}</p>
              <p style="margin: 0;">Flight ID: ${value.flight_id}</p>
            </div>
            <div style="padding: 20px;">
              <p><strong>Status:</strong> ${value.status.toUpperCase()}</p>
              <p><strong>Booked At:</strong> ${formattedDate} - ${formattedTime}</p>
              <p><strong>Total Price Refunded:</strong> ₹${value.totel_price}</p>
              <hr />
              <h3>Passenger Details</h3>
              <ul style="padding-left: 20px;">
                ${candidateList}
              </ul>
              <p>This email confirms the cancellation of your flight booking.</p>
              <p style="margin-top: 20px;">We’re sorry for the inconvenience caused.</p>
            </div>
            <div style="background-color: #f1f1f1; text-align: center; padding: 10px; font-size: 12px; color: #555;">
              Need help? Contact us at support@example.com
            </div>
          </div>
        </div>
      `
    });
  } catch (error) {
    console.log(error);
  }
}




// arijitm717@gmail.com
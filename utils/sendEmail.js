const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  const otp = text.toString();
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "sahilalagiya104@gmail.com",
        pass: "oyvwtsylfexkookl",
      },
    });
    console.log(email, subject, text);
    await transport.sendMail({
      from: "sahilalagiya104@gmail.com",
      to: email,
      subject: subject,
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">PodTok</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing Podtok. Use the following verification code to verify your account.</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
    <p style="font-size:0.9em;">Regards,<br />Podtok</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Podtok</p>
      <p>1600 Amphitheatre Parkway</p>
      <p>California</p>
    </div>
  </div>
</div>`,
    });
    console.log("email send");
  } catch (error) {
    console.log("email not send successfully");
    console.log(error);
  }
};

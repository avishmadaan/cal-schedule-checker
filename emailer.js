import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service:"gmail",

    auth:{
        user:"avishrmadaan@gmail.com",
        pass:"ofdg svit dfhs igco"
    }
})


export const sentAlertEmail = async (email) => {
    try {
      const info = await transporter.sendMail({
        from: "Super 30 ", 
        to: email,
        subject: `Slots Available now for interview`,
        text: `
  Dear Avish, 

  Slots are available check fast

  Link: https://cal.com/100xdevs/super30-interviews

  Thanks
  Avish
        `,
      });
  
      console.log("Email sent: " + info.response);
    } catch (e) {
    //   console.error("Error sending email", e);
    }
  };
  

  



  
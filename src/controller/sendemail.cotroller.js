const nodemailer = require("nodemailer");
const path = require("path");
const pathname=path.dirname("image-1718594021008-610744375")

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "raktpx2356@gmail.com",
    pass: "vtch nogu fpds dvzd",
  },
});

const sendEmail = async (to) => {
  try {
    
    const info = await transporter.sendMail({
      from: 'raktpx2356@gmail.com', 
      to:to, 
      subject:"niga bro", 
      text:"bhag bhosdina",
      attachments:[
        {   // use URL as an attachment
          filename: 'cccccc.jpg',
          // path: 'F:/lerneNode/project/cccccc.jpg'
      }
      ]
    });

    console.log("Message sent: %s", info);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};


module.exports =sendEmail


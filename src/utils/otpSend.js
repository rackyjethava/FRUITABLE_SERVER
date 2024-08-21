const otpSend = (req,res,next) => {
    try {
        const accountSid =process.env.TWILIO_ACCOUNT_SID;
        const authToken =process.env.TWILIO_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);
        const otp = Math.floor(1000 + Math.random() * 9000);

        req.session.otp=otp
        client.messages
            .create({
                // from: '+12513092638',
                // to: '+916354489368',
                // body: `Your OTP is ${otp}`
            })
            .then(message => next())

    } catch (error) {

    }
}

const verifyOtp = (req, res) => {
    console.log(req.body,"body");
    const userOtp = req.body.otp; 
    console.log(userOtp,"body");
    console.log(req.session.otp,"session");

    if (req.session.otp && req.session.otp == userOtp) {
        res.send('OTP verified successfully');
    } else {
        res.status(400).send('Invalid OTP');
    }
};

module.exports = {
    otpSend,
    verifyOtp
}
const AWS = require("aws-sdk");
console.log("!",process.env.AWS_SECRET,"1",process.env.AWS_ID)
const config = new AWS.Config({
    region: "eu-central-1",
    secretAccessKey: process.env.AWS_SECRET,
    accessKeyId: process.env.AWS_ID
});
const ses = new AWS.SES(config);

function sendResetLink(email, id) {
    console.log("!",email,"2",id)
    const params = {
        Destination: {
            ToAddresses: [
                email,
            ]
        },
        Message: {
            Body: {
                Text: {
                    Charset: "UTF-8",
                    Data: `To reset your password, please click on this link: http://localhost:3000/reset/${id}`
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: "Reset password instructions"
            }
        },
        Source: "omking@gmail.com",
    };

    ses.sendEmail(params, (err) => {
        if (err) {
            console.log(err);
        }
    });
}


function sendVerifyLink(email, id) {
    console.log("!",email,"2",id)
    const params = {
        Destination: {
            ToAddresses: [
                email,
            ]
        },
        Message: {
            Body: {
                Text: {
                    Charset: "UTF-8",
                    Data: `To verify your email, please click on this link: http://localhost:3000/${id}`
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: "verify email"
            }
        },
        Source: "omking@gmail.com",
    };

    ses.sendEmail(params, (err) => {
        if (err) {
            console.log(err);
        }
    });
}


module.exports = {sendResetLink,sendVerifyLink};

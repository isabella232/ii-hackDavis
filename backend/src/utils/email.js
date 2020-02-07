const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'mxthu@ucdavis.edu',
        subject: 'welcome to the app',
        text: `Welcome to the app, ${name}. Let me know how you get along`
    })
}

const sendVerifyEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'test@example.com',
        subject: 'Verify',
        text: `Welcome to the app, ${name}. Let me know how you get along`
    })
}

const sendRejectEmail = async (email, name) => {
    sgMail.send({
        to: email,
        from: 'test@example.com',
        subject: 'Reject, biatch',
        text: `Sad ${name}.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendVerifyEmail,
    sendRejectEmail
}

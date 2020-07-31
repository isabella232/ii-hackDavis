const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// replace from email with an offical email

const sendWelcomeEmail = (email, name, id) => {
    sgMail.send({
        to: email,
        from: 'test@example.com',
        subject: 'Welcome to Indigenous Interpreters!',
        text: `Welcome to Indigenous Interpreters, ${name}. Please click on the attached link to verify your account.\n ${process.env.PROD_FRONTEND_URL}/user/${id}/verify`
    })
}

const sendVerifyEmail = async (email, name) => {
    sgMail.send({
        to: email,
        from: 'test@example.com',
        subject: 'Your Certificate Has Been Verified!',
        text: `Dear, ${name}.\n Your uploaded certificate has been verified. Thank you.`
    })
}

const sendRejectEmail = async (email, name) => {
    sgMail.send({
        to: email,
        from: 'test@example.com',
        subject: 'Your Certificate Has Been Rejected.',
        text: `Dear, ${name}.\n Your uploaded certificate has been rejected. Please reupload it.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendVerifyEmail,
    sendRejectEmail
}

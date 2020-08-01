const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// replace from email with an offical email

const signature = "\n\nFaithfully yours,\n\nThe Indigenous Interpreters Team."

const sendWelcomeEmail = async (email, name, id) => {
    try {
        const msg = {
            to: email,
            from: process.env.HOST_EMAIL,
            subject: 'Welcome to Indigenous Interpreters!',
            text: `Dear ${name},\n\n Welcome to Indigenous Interpreters! Please go to the attached link to verify your account.\n\n${process.env.PROD_FRONTEND_URL}/user/${id}/account/verify\n\nAgain, thank you for joining us.${signature}`
        }
        await sgMail.send(msg)
    } catch (error) {
        throw error
    }
}

const sendCertVerifyEmail = async (email, name, certTitle) => {
    try {
        const msg = {
            to: email,
            from: process.env.HOST_EMAIL,
            subject: 'Your Certificate Has Been Verified!',
            text: `Dear ${name},\n\n Your uploaded certificate ${certTitle} has been verified.${signature}`
        }
        await sgMail.send(msg)
    } catch (error) {
        throw error
    }
}

const sendResetPasswordEmail = async (email, name, id) => {
    try {
        const msg = {
            to: email,
            from: process.env.HOST_EMAIL,
            subject: 'Reset Your Account\'s Password.',
            text: `Dear ${name},\n\n Please go to the attached link below to reset your password.\n\n${process.env.PROD_FRONTEND_URL}/user/${id}/password/reset${signature}`
        }
        await sgMail.send(msg)
    } catch (error) {
        throw error
    }
}

const sendCertRejectEmail = async (email, name, certTitle) => {
    try {
        const msg = {
            to: email,
            from: process.env.HOST_EMAIL,
            subject: 'Your Certificate Has Been Rejected.',
            text: `Dear ${name},\n\n Your uploaded certificate ${certTitle} has been rejected. Please try again or contact us for more details.${signature}`
        }
        await sgMail.send(msg)
    } catch (error) {
        throw error
    }
}

const sendInterpreterVerifyEmail = async (email, name) => {
    try {
        const msg = {
            to: email,
            from: process.env.HOST_EMAIL,
            subject: 'Your Account Has Been Verified!',
            text: `Dear ${name},\n\n Your account has been verified. You now appear on the search for everyone to see.${signature}`
        }
        await sgMail.send(msg)
    } catch (error) {
        throw error
    }
}

const sendInterpreterRejectEmail = async (email, name) => {
    try {
        const msg = {
            to: email,
            from: process.env.HOST_EMAIL,
            subject: 'Your Account Has Been Rejected.',
            text: `Dear ${name},\n\nYour account has been rejected. You will not appear on the search for everyone to see at the moment. Please try again or contact us for more details.${signature}`
        }
        await sgMail.send(msg)
    } catch (error) {
        throw error
    }
}

module.exports = {
    sendWelcomeEmail,
    sendCertVerifyEmail,
    sendCertRejectEmail,
    sendInterpreterVerifyEmail,
    sendInterpreterRejectEmail,
    sendResetPasswordEmail
}

const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

templates = {
    welcome: "d-02c66199ac6a4306b66e5635b239886b"
}

const signature = "\n\nFaithfully yours,\n\nThe Indigenous Interpreters Team."

const sendWelcomeEmail = async (email, name, id) => {
    try {
        const msg = {
            to: email,
            from: process.env.HOST_EMAIL,
            templateId: templates.welcome,
            dynamic_template_data: {
                name: name,
                link: `${process.env.FRONTEND_URL}/user/${id}/account/verify`
            }
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
            text: `Dear ${name},\n\nYour uploaded certificate ${certTitle} has been verified.${signature}`
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
            text: `Dear ${name},\n\nPlease go to the attached link below to reset your password.\n\n${process.env.FRONTEND_URL}/user/${id}/password/reset${signature}`
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
            text: `Dear ${name},\n\nYour uploaded certificate ${certTitle} has been rejected. Please try again or contact us for more details.${signature}`
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
            text: `Dear ${name},\n\nYour account has been verified. You now appear on the search for everyone to see.${signature}`
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

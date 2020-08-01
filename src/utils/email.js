const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// replace from email with an offical email

const sendWelcomeEmail = async (email, name, id) => {
    try {
        const msg = {
            to: email,
            from: process.env.HOST_EMAIL,
            subject: 'Welcome to Indigenous Interpreters!',
            text: `Welcome to Indigenous Interpreters, ${name}. Please click on the attached link to verify your account.\n ${process.env.PROD_FRONTEND_URL}/user/${id}/verify`
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
            text: `Dear, ${name}.\n Your uploaded certificate ${certTitle} has been verified. Thank you.`
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
            text: `Dear, ${name}.\n Your uploaded certificate ${certTitle} has been rejected. Please check the uploaded file again or contact us for more details.`
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
            text: `Dear, ${name}.\n Your uploaded certificate has been verified. Thank you.`
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
            text: `Dear, ${name}.\n Your uploaded certificate has been rejected. Please reupload it.`
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
    sendInterpreterRejectEmail
}

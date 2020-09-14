const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

templates = {
	clientToVerify: "d-02c66199ac6a4306b66e5635b239886b",
	interpreterToVerify: "d-1099fc9175e645609f21c29f1038fd07",
	adminToVerify: "d-bceb77d0028b4a57a9e31f98afd66970",
	certVerified: "d-d2dabde3019a4d15aa3fbc960c1195ba",
	certRejected: "d-c4ee65e548a44836a39d48a64e77005a",
	resetPassword: "d-579f23e50d4e4be1b3dea4afed195f82",
	resetPasswordConfirm: "d-9693ab91633d4b9783d22966bb54f2de",
	userVerified: "d-14ce36854f614f349070bab53ec13bc1",
	interpreterVerified: "d-8d1882abd3cc4a6fa2d7eb0c5747c55f",
	interpreterRejected: "d-6349dc440dc54b6381ef5ad3032e4644",
};

const sendClientToVerifyEmail = async (email, name, id) => {
	try {
		const msg = {
			to: email,
			from: process.env.HOST_EMAIL,
			templateId: templates.clientToVerify,
			dynamic_template_data: {
				name: name,
				link: `${process.env.PROD_FRONTEND_URL}/user/${id}/account/verify`,
				// link: `${process.env.DEV_FRONTEND_URL}/user/${id}/account/verify`,
			},
		};
		await sgMail.send(msg);
	} catch (error) {
		throw error;
	}
};

const sendInterpreterToVerifyEmail = async (email, name, id) => {
	try {
		const msg = {
			to: email,
			from: process.env.HOST_EMAIL,
			templateId: templates.interpreterToVerify,
			dynamic_template_data: {
				name: name,
				link: `${process.env.PROD_FRONTEND_URL}/user/${id}/account/verify`,
				// link: `${process.env.DEV_FRONTEND_URL}/user/${id}/account/verify`,
			},
		};
		await sgMail.send(msg);
	} catch (error) {
		throw error;
	}
};

const sendAdminToVerifyEmail = async (email, name, id) => {
	try {
		const msg = {
			to: email,
			from: process.env.HOST_EMAIL,
			templateId: templates.adminToVerify,
			dynamic_template_data: {
				name: name,
				link: `${process.env.PROD_FRONTEND_URL}/user/${id}/account/verify`,
				// link: `${process.env.DEV_FRONTEND_URL}/user/${id}/account/verify`,
			},
		};
		await sgMail.send(msg);
	} catch (error) {
		throw error;
	}
};

const sendInterpreterVerifiedEmail = async (email, name) => {
	try {
		const msg = {
			to: email,
			from: process.env.HOST_EMAIL,
			templateId: templates.interpreterVerified,
			dynamic_template_data: {
				name: name,
			},
		};
		await sgMail.send(msg);
	} catch (error) {
		throw error;
	}
};

const sendInterpreterRejectedEmail = async (email, name) => {
	try {
		const msg = {
			to: email,
			from: process.env.HOST_EMAIL,
			templateId: templates.interpreterRejected,
			dynamic_template_data: {
				name: name,
			},
		};
		await sgMail.send(msg);
	} catch (error) {
		throw error;
	}
};

const sendCertVerifiedEmail = async (email, name, certTitle) => {
	try {
		const msg = {
			to: email,
			from: process.env.HOST_EMAIL,
			templateId: templates.certVerified,
			dynamic_template_data: {
				name: name,
				certTitle: certTitle,
			},
		};
		await sgMail.send(msg);
	} catch (error) {
		throw error;
	}
};

const sendCertRejectedEmail = async (email, name, certTitle) => {
	try {
		const msg = {
			to: email,
			from: process.env.HOST_EMAIL,
			templateId: templates.certRejected,
			dynamic_template_data: {
				name: name,
				certTitle: certTitle,
			},
		};
		await sgMail.send(msg);
	} catch (error) {
		throw error;
	}
};

const sendResetPasswordPromptEmail = async (email, name, id) => {
	try {
		const msg = {
			to: email,
			from: process.env.HOST_EMAIL,
			templateId: templates.resetPassword,
			dynamic_template_data: {
				name: name,
				link: `${process.env.PROD_FRONTEND_URL}/user/${id}/password/reset`,
				// link: `${process.env.DEV_FRONTEND_URL}/user/${id}/password/reset`,
			},
		};
		await sgMail.send(msg);
	} catch (error) {
		throw error;
	}
};

const sendResetPasswordConfirmEmail = async (email, name) => {
	try {
		const msg = {
			to: email,
			from: process.env.HOST_EMAIL,
			templateId: templates.resetPasswordConfirm,
			dynamic_template_data: {
				name: name,
			}
		}
		await sgMail.send(msg);
	} catch (error) {
		throw error;
	}
}
const sendUserVerifiedEmail = async (email, name) => {
	try {
		const msg = {
			to: email,
			from: process.env.HOST_EMAIL,
			templateId: templates.userVerified,
			dynamic_template_data: {
				name: name
			}
		}
		await sgMail.send(msg);
	} catch (error) {
		throw error;
	}
}

module.exports = {
	sendClientToVerifyEmail,
	sendAdminToVerifyEmail,
	sendInterpreterToVerifyEmail,
	sendCertVerifiedEmail,
	sendCertRejectedEmail,
	sendInterpreterVerifiedEmail,
	sendInterpreterRejectedEmail,
	sendResetPasswordPromptEmail,
	sendResetPasswordConfirmEmail,
	sendUserVerifiedEmail
};

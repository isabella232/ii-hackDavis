const express = require("express");
const sharp = require("sharp");
const ObjectID = require("mongodb").ObjectID;
const Admin = require("../models/admin");
const AdminCode = require("../models/adminCode");
const Interpreter = require("../models/interpreter");
const auth = require("../middleware/auth");
const {
	sendCertVerifyEmail,
	sendCertRejectEmail,
	sendInterpreterVerifyEmail,
	sendInterpreterRejectEmail,
} = require("../utils/email");
const { saveInterpreter, removeInterpreter } = require("../utils/algolia");
const { getToValidate } = require("../utils/admin");
const { imgUploader, getAvatarURL } = require("../utils/image");
const { sendAdminToVerifyEmail } = require("../utils/email");
const { fillSignupInfo } = require("../utils/user");

const router = new express.Router();

// create admin account
router.post(
	"/api/admin/create",
	imgUploader.single("avatar"),
	async (req, res) => {
		try {
			await AdminCode.checkMatch(req.body.adminCode);
			const buffer = await sharp(req.file.buffer)
				.resize({ width: 250, height: 250 })
				.png()
				.toBuffer();
			const info = fillSignupInfo(req.body, buffer);
			const admin = new Admin(info);
			await admin.save();
			await sendAdminToVerifyEmail(
				admin.email,
				admin.name,
				admin._id.toString()
			);
			res.status(201).send();
		} catch (e) {
			console.log(e);

			if (e.code === 11000)
				res
					.status(400)
					.send({
						message: "Email already registered. Please use another email.",
					});

			res.status(400).send(e);
		}
	},
	(error, req, res, next) => {
		res.status(400).send({ message: error.message });
	}
);

// get admin's home page
router.get(
	"/api/admin/home",
	auth,
	async (req, res) => {
		const admin = req.user;
		try {
			await admin.isAdmin();
			const data = {
				name: admin.name,
				email: admin.email,
				avatar: admin.avatar.url,
			};
			res.send(data);
		} catch (error) {
			res.status(400).send(error);
		}
	},
	(error, req, res, next) => {
		res.status(400).send({ error: error.message });
	}
);

// get all interpreter reviews
router.get("/api/admin/allToReviews", auth, async (req, res) => {
	try {
		await req.user.isAdmin();
		const interpreters = await Interpreter.find({
			$or: [
				{ isVerified: false },
				{
					certifications: {
						$elemMatch: { isValidated: false, isRejected: false },
					},
				},
			],
		}).limit(10);
		res.send(getToValidate(interpreters));
	} catch (error) {
		res.status(400).send(error);
	}
});

// validate a certificate
router.patch("/api/admin/certificates/:id/validate", auth, async (req, res) => {
	const id = req.params.id;
	try {
		await req.user.isAdmin();
		const interpreter = await Interpreter.findOne().elemMatch(
			"certifications",
			{ _id: new ObjectID(id) }
		);
		const index = interpreter.certifications.findIndex(
			(certificate) => certificate._id.toString() === id
		);

		interpreter.certifications[index].isValidated = true;
		interpreter.certifications[index].isRejected = false;

		await interpreter.save();

		await sendCertVerifyEmail(
			interpreter.email,
			interpreter.name,
			interpreter.certifications[index].title
		);

		res.send();
	} catch (error) {
		res.status(400).send(error);
	}
});

// reject a certificate
router.patch("/api/admin/certificates/:id/reject", auth, async (req, res) => {
	const id = req.params.id;
	try {
		await req.user.isAdmin();
		const interpreter = await Interpreter.findOne().elemMatch(
			"certifications",
			{ _id: new ObjectID(id) }
		);
		const index = interpreter.certifications.findIndex(
			(certificate) => certificate._id.toString() === id
		);

		interpreter.certifications[index].isRejected = true;
		interpreter.certifications[index].isValidated = false;
		await interpreter.save();

		await sendCertRejectEmail(
			interpreter.email,
			interpreter.name,
			interpreter.certifications[index].title
		);

		res.send();
	} catch (error) {
		res.status(400).send(error);
	}
});

// verify an interpreter
router.patch("/api/admin/interpreters/:id/verify", auth, async (req, res) => {
	const id = req.params.id;
	try {
		await req.user.isAdmin();
		const interpreter = await Interpreter.findOneAndUpdate(
			{ _id: new ObjectID(id) },
			{ isVerified: true, isRejected: false }
		);
		saveInterpreter(interpreter);
		await sendInterpreterVerifyEmail(interpreter.email, interpreter.name);
		res.send();
	} catch (error) {
		console.log(error);
		res.status(400).send(error);
	}
});

// reject an interpreter
router.patch("/api/admin/interpreters/:id/reject", auth, async (req, res) => {
	const id = req.params.id;
	try {
		await req.user.isAdmin();
		const interpreter = await Interpreter.findOneAndUpdate(
			{ _id: new ObjectID(id) },
			{ isVerified: false, isRejected: true }
		);
		removeInterpreter(interpreter._id);
		await sendInterpreterRejectEmail(interpreter.email, interpreter.name);
		res.send();
	} catch (error) {
		console.log(error);
		res.status(400).send(error);
	}
});

// create an admin code
router.post("/api/admin/code/create", auth, async (req, res) => {
	const admin = req.user;
	try {
		await admin.isAdmin();
		await AdminCode.isNew(req.body.adminCode);
		const adminCode = new AdminCode({ code: req.body.adminCode });
		await adminCode.save();
		res.status(201).send();
	} catch (e) {
		console.log(e);
		res.status(400).send({ error: e.message });
	}
});

// update admin's info
router.patch(
	"/api/admin/updateInfo",
	auth,
	imgUploader.single("avatar"),
	async (req, res) => {
		const admin = req.user;
		const updates = Object.keys(req.body);

		try {
			await admin.isAdmin();
			if (req.file) {
				admin.avatar.buffer = await sharp(req.file.buffer)
					.resize({ width: 250, height: 250 })
					.png()
					.toBuffer();
			}
			admin.name = req.body.name;
			await admin.save();
			res.send();
		} catch (e) {
			console.log(e);
			res.status(400).send(e);
		}
	},
	(error, req, res, next) => {
		res.status(400).send({ error: error.message });
	}
);

module.exports = router;

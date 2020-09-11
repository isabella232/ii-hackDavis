const express = require("express");
const sharp = require("sharp");
const ObjectID = require("mongodb").ObjectID;
const Event = require("../models/event");
const Interpreter = require("../models/interpreter");
const auth = require("../middleware/auth");
const { saveInterpreter } = require("../utils/algolia");
const {
  imgUploader,
  getAvatarURL,
  getCertificateURL,
} = require("../utils/image");
const { accumulateRatings, processReviews } = require("../utils/interpreter");
const { sendInterpreterToVerifyEmail } = require("../utils/email");
const { fillSignupInfo } = require("../utils/user");

const router = new express.Router();

// create interpreter account
router.post(
  "/api/interpreter/create",
  imgUploader.single("avatar"),
  async (req, res) => {
    try {
      const buffer = await sharp(req.file.buffer)
        .resize({ width: 250, height: 250 })
        .png()
        .toBuffer();
      let services = [],
        list = JSON.parse(req.body.services);
      for (const service of list) {
        services.push(service);
      }
      const info = fillSignupInfo(req.body, buffer);
      const extraInfo = {
        phone: req.body.phone,
        services: services,
        summary: req.body.summary,
        languages: JSON.parse(req.body.languages),
      };
      const interpreter = new Interpreter(Object.assign({}, info, extraInfo));
      await interpreter.generateCoordinates(req.body.location);
      await interpreter.save();
      await sendInterpreterToVerifyEmail(
        interpreter.email,
        interpreter.name,
        interpreter._id.toString()
      );
      res.status(201).send();
    } catch (e) {
      console.log(e);

      if (e.code === 11000)
        res.status(400).send({
          message: "Email already registered. Please use another email.",
        });

      res.status(400).send(e);
    }
  },
  (error, req, res, next) => {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
);

// fetch all details for interpreter
router.get("/api/interpreters/:id/details", auth, async (req, res) => {
  try {
    const interpreter = await Interpreter.findById(req.params.id);
    const reviews = processReviews([...interpreter.reviews]);
    const certifications = [];
    interpreter.certifications.forEach((certificate) => {
      if (!certificate.isRejected) {
        const cert = {
          id: certificate._id.toString(),
          title: certificate.title,
          image: certificate.file.url,
          isValidated: certificate.isValidated,
        };
        certifications.push(cert);
      }
    });
    const details = {
      rating: interpreter.rating ? interpreter.rating : null,
      certifications: certifications,
      reviews: reviews,
    };
    res.send(details);
  } catch (e) {
    res.status(404).send();
  }
});

// add review by interpreter to db
router.post("/api/interpreters/:id/reviews/add", auth, async (req, res) => {
  try {
    const interpreter = await Interpreter.findById(req.params.id);
    if (!interpreter.rating) {
      interpreter.rating = req.body.rating;
    } else {
      interpreter.rating = accumulateRatings(
        req.body.rating,
        interpreter.rating,
        interpreter.reviews.length
      );
    }
    const review = {
      rating: req.body.rating,
      reviewerName: req.user.name,
      comment: req.body.comment,
    };
    interpreter.reviews.push(review);
    interpreter.save();
    res.send();
  } catch (e) {
    res.status(404).send();
  }
});

// upload a certificate separately
router.post(
  "/api/interpreter/certificate/upload",
  auth,
  imgUploader.single("certificate"),
  async (req, res) => {
    try {
      const interpreter = req.user;
      const certificateID = ObjectID();
      const certificate = {
        _id: certificateID,
        title: req.body.title,
        file: {
          buffer: req.file.buffer,
          url: getCertificateURL(certificateID),
        },
      };

      interpreter.certifications.push(certificate);
      await interpreter.save();
      res.send();
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// delete a certificate
router.delete(
  "/api/interpreter/certificates/:id/delete",
  auth,
  async (req, res) => {
    try {
      const interpreter = req.user;
      interpreter.certifications = interpreter.certifications.filter(
        (cert) => cert._id.toString() !== req.params.id
      );
      await interpreter.save();
      res.send();
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: error.message });
    }
  }
);

// fetch a certificate image
router.get("/api/interpreter/certificates/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const interpreter = await Interpreter.findOne().elemMatch(
      "certifications",
      { _id: new ObjectID(id) }
    );
    const certificate = interpreter.certifications.find(
      (certificate) => certificate._id.toString() === id
    );

    if (!interpreter || !certificate) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(certificate.file.buffer);
  } catch (e) {
    res.status(404).send();
  }
});

// get interpreter's home page
router.get("/api/interpreter/home", auth, async (req, res) => {
  try {
    const interpreter = req.user;
    const now = new Date();
    const events = await Event.find({
      isArchived: false,
      forInterpreters: true,
    })
      .where("date")
      .gte(now);
    const certifications = [],
      languages = [];
    for (const cert of interpreter.certifications) {
      certifications.push({
        id: cert._id,
        title: cert.title,
        image: cert.file.url,
        isValidated: cert.isValidated,
        isRejected: cert.isRejected,
      });
    }
    for (const lang of interpreter.languages) {
      languages.push({ language: lang.language, fluency: lang.fluency });
    }
    const data = {
      name: interpreter.name,
      email: interpreter.email,
      avatar: interpreter.avatar.url,
      location: interpreter.location.str,
      phone: interpreter.phone,
      languages: languages,
      certifications: certifications,
      services: interpreter.services,
      rating: interpreter.rating,
      reviews: processReviews([...interpreter.reviews]),
      isVerified: interpreter.isVerified,
      summary: interpreter.summary,
      events: events,
    };
    res.send(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

// update interpreter's info
router.patch(
  "/api/interpreter/updateInfo",
  auth,
  imgUploader.single("avatar"),
  async (req, res) => {
    const interpreter = req.user;
    const rawUpdates = ["name", "summary"],
      processedUpdates = ["languages", "services"];

    try {
      if (req.file) {
        // update avatar
        interpreter.avatar.buffer = await sharp(req.file.buffer)
          .resize({ width: 250, height: 250 })
          .png()
          .toBuffer();
      }

      processedUpdates.forEach((update) => {
        // update languages, services
        if (req.body[update] !== null) {
          interpreter[update] = JSON.parse(req.body[update]);
        }
      });

      rawUpdates.forEach((update) => {
        // update names, summary
        if (req.body[update] !== null) {
          interpreter[update] = req.body[update];
        }
      });

      await interpreter.generateCoordinates(req.body.location); // update location
      await interpreter.save();
      saveInterpreter(interpreter);
      res.send();
    } catch (e) {
      res.status(400).send(e);
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;

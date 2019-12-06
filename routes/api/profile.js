const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const validateProfileInput = require("../../validation/profile");
const validteExperienceInput = require("../../validation/experience");
const validteEducationInput = require("../../validation/education");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route GET api/profile
// @desc GET current user profile
// @access private
router.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const errors = {};

		Profile.findOne({ user: req.user.id })
			.populate("user", ["name", "avatar"])
			.then(profile => {
				if (!profile) {
					errors.noprofile = "there is no profile for this user";
					return res.status(404).json(errors);
				}
				res.json(profile);
			})
			.catch(err => res.status(400).json(err));
	}
);

// @route GET api/profile/user/:user_id
// @desc get a user profile by handle
// @access public
router.get("/all", (req, res) => {
	errors = {};
	Profile.find()
		.populate("user", ["name", "avatar"])
		.then(profiles => {
			if (!profiles) {
				errors.noprofile = "There are no profiles";
				return res.status(404).json(errors);
			}
			res.json(profiles);
		})
		.catch(err => {
			errors.noprofile = "No profile found";
			console.log(err);
			return res.status(500).json(errors);
		});
});

// @route GET api/profile/handle/:handle
// @desc get a user profile by handle
// @access public
router.get("/handle/:handle", (req, res) => {
	const errors = {};
	Profile.findOne({ handle: req.params.handle })
		.populate("user", ["name", "avatar"])
		.then(profile => {
			if (!profile) {
				errors.noprofile = "There is no profile for this user";
				return res.status(404).json(errors);
			}
			res.json(profile);
		})(err => {
		console.log(err);
		return res
			.status(404)
			.json({ profile: "An Error occurred please try again" });
	});
});

// @route POST api/profile/user/:user_id
// @desc get a user profile by handle
// @access public
router.get("/user/:user_id", (req, res) => {
	const errors = {};
	Profile.findOne({ user: req.params.user_id })
		.populate("user", ["name", "avatar"])
		.then(profile => {
			if (!profile) {
				errors.noprofile = "There is no profile for this user";
				return res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch(err => {
			console.log(err);
			return res
				.status(500)
				.json({ profile: "An Error occurred please try again" });
		});
});

// @route POST api/profile
// @desc create or edit user profile
// @access private
router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		//check the request for errors
		const { errors, isValid } = validateProfileInput(req.body);

		//return the errors if there is any
		if (!isValid) {
			return res.status(400).json(errors);
		}

		const profileFields = {};
		profileFields.user = req.user.id;
		if (req.body.handle) profileFields.handle = req.body.handle;
		if (req.body.workPlace) profileFields.workPlace = req.body.workPlace;
		if (req.body.website) profileFields.website = req.body.website;
		if (req.body.location) profileFields.location = req.body.location;
		if (req.body.bio) profileFields.bio = req.body.bio;
		if (req.body.status) profileFields.status = req.body.status;

		profileFields.social = {};
		if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
		if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
		if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
		if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

		Profile.findOne({ user: req.user.id }).then(profile => {
			if (profile) {
				//update the profile if it exists
				Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				).then(profile => res.json(profile));
			} else {
				//first check if the handle exists
				Profile.findOne({ handle: profileFields.handle }).then(profile => {
					if (profile) {
						errors.handle = "Handle already exists";
						res.status(400).json(errors);
					}else{
						//create the profile
						new Profile(profileFields).save().then(profile => res.json(profile));
					}
				});
			}
		});
	}
);

// @route POST api/profile/experience
// @desc add user work experience
// @access private
router.post(
	"/experience",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { errors, isValid } = validteExperienceInput(req.body);

		//return the errors if there is any
		if (!isValid) {
			return res.status(400).json(errors);
		}

		Profile.findOne({ user: req.user.id }).then(profile => {
			const newExperience = {
				title: req.body.title,
				organization: req.body.organization,
				location: req.body.location,
				from: req.body.from,
				to: req.body.to,
				current: req.body.current,
				description: req.body.description
			};

			profile.experience.unshift(newExperience);

			profile.save().then(profile => {
				res.json(profile);
			});
		});
	}
);


// @route POST api/profile/education
// @desc add user work experience
// @access private
router.post(
	"/education",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { errors, isValid } = validteEducationInput(req.body);

		//return the errors if there is any
		if (!isValid) {
			return res.status(400).json(errors);
		}

		Profile.findOne({ user: req.user.id }).then(profile => {
			const newEducation = {
				school: req.body.school,
				degree: req.body.degree,
				fieldOfStudy: req.body.fieldOfStudy,
				from: req.body.from,
				to: req.body.to,
				current: req.body.current,
				description: req.body.description
			};

			profile.education.unshift(newEducation);

			profile.save().then(profile => {
				res.json(profile);
			});
		});
	}
);

// @route DELETE api/profile/experience/:exp_id
// @desc delete user experience
// @access private
router.delete(
	"/experience/:exp_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {

		Profile.findOne({ user: req.user.id }).then(profile => {
			const removeIndex = profile.experience
				.map(item => item.id)
				.indexOf(req.params.exp_id);

				profile.experience.splice(removeIndex, 1);

				profile.save().then(profile => res.json(profile))
		})
		.catch(err => {
			console.log(err)
			res.status(500).json('Sorry An error occurred please try again')
		});
	}
);

// @route DELETE api/profile/education/:edu_id
// @desc delete user education
// @access private
router.delete(
	"/education/:edu_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {

		Profile.findOne({ user: req.user.id }).then(profile => {
			const removeIndex = profile.education
				.map(item => item.id)
				.indexOf(req.params.edu_id);

				profile.education.splice(removeIndex, 1);

				profile.save().then(profile => res.json(profile))
		})
		.catch(err => {
			console.log(err)
			res.status(500).json('Sorry An error occurred please try again')
		});
	}
);

// @route DELETE api/profile/
// @desc delete user user and profile
// @access private
router.delete(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Profile.findOneAndRemove({ user: req.user.id })
			.then(() => {
				User.findOneAndRemove({ _id: req.user.id })
					.then(() => res.json({ success: true }))
			})
	}
);

module.exports = router;

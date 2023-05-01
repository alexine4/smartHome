const bCrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const connectionDB = require("../connection/connectionDB");
const errorHandler = require("../utils/errorHandler");
const axios = require('axios');

let PasswordCheck;

module.exports.login = async (req, res) => {
	if (req.body.login) {
		// ckeck login is email or not
		const checkEmail = user.findOne("email", req.body.login);
		checkEmail.then((Email) => {
			if (Email !== true) {
				// email already exist
				const passwordResult = bCrypt.compareSync(
					req.body.password,
					Email.dataValues.password
				);
				if (passwordResult) {
					// generate token
					const token = jwt.sign({
							userId: Email.dataValues.userId,
							userName: Email.dataValues.userName,
							email: Email.dataValues.email,
							homeIp: Email.dataValues.homeIp,
							superUserStatus: Email.dataValues.superUserStatus,
						},
						connectionDB.jwt, {
							expiresIn: "24h"
						}
					);
					res.status(200).json({
						token: `Bearer ${token}`,
					});
				} else {
					res.status(401).json({
						message: "Password do not match",
					});
				}
			} else {
				const checkUserName = user.findOne("userName", req.body.login);
				checkUserName.then((Name) => {
					if (Name !== true) {
						// UserName already exist
						const passwordResult = bCrypt.compareSync(
							req.body.password,
							Name.dataValues.password
						);
						if (passwordResult) {
							// generate token
							const token = jwt.sign({
									userId: Name.dataValues.userId,
									userName: Name.dataValues.userName,
									email: Name.dataValues.email,
									homeIp: Email.dataValues.homeIp,
									superUserStatus: Name.dataValues.superUserStatus,
								},
								connectionDB.jwt, {
									expiresIn: "24h"
								}
							);
							res.status(200).json({
								token: `Bearer ${token}`,
							});
						} else {
							res.status(401).json({
								message: "Password do not match",
							});
						}
					} else {
						// userName doesn't exist
						res.status(404).json({
							message: "Incorrect input data",
						});
					}
				});
			}
		});
	}
};

module.exports.register = async function (req, res) {
	// initialization

	user.initialization();
	// password gurd
	if (req.body.userName && req.body.email && req.body.password) {
		const salt = bCrypt.genSaltSync(10);
		const password = req.body.password;

		user.findOne("userName", req.body.userName).then((userNameExist) => {
			if (userNameExist === null) {
				user.findOne("email", req.body.email).then((emailExist) => {
					if (emailExist === null) {
						// create new user
						user.create(
							req.body.userName,
							req.body.email,
							bCrypt.hashSync(password, salt),
							req.body.homeIp
						)
						try {
							connectionDB.sequelize.sync({
								alter: true
							});
							res.status(201).json({
								message: "New user created",
							});
						} catch (e) {
							errorHandler(res, e);
						}
					} else {
						res.status(404).json({
							message: "User with this email already exists",
						});
					}
				})
			} else {
				res.status(404).json({
					message: "User with this uesrname already exists",
				});
			}
		});
	} else {
		res.status(404).json({
			message: "The password field cannot be empty",
		});
	}
};



module.exports.checkPassword = async (req, res) => {
	if (req.body.userName) {
		const checkUserName = user.findOne("userName", req.body.userName);
		checkUserName.then((Name) => {
			if (Name !== true) {
				// User already exist
				const passwordResult = bCrypt.compareSync(
					req.body.password,
					Name.dataValues.password
				);
				if (passwordResult) {
					res.status(200).json(true);
				} else {
					res.status(200).json(false);
				}
			} else {
				// user doesn't exist
				res.status(404).json(false);
			}
		});
	}
};


module.exports.confirmConnectionReq = async (req, res) => {
	//for full programm
	//const deviceUrl = 'http://' + req.body.homeIp + '/device';

	//for tests
	const deviceUrl = 'http://localhost:5000/api/auth/device';

	PasswordCheck = generatePassword(10);

	// Об'єкт з параметрами команди
	const command = {
		password: PasswordCheck
	};
	console.log(PasswordCheck);
	// Відправлення POST-запиту на сервер
	axios.post(deviceUrl, command)
		.then((response) => {
			console.log('The command was successfully sent to the device.');
			res.status(200).json({
				message: "Device ID exist "
			})
		})
		.catch((error) => {
			console.log('An error occurred while sending the command.');
			console.error(error);
			res.status(404).json({
				message: "Device with this ID does not exist"
			})
		});
}
module.exports.confirmConnectionRes = async(req, res)=>{
	console.log(PasswordCheck);
	console.log("sdfsdfs" + req.body.confirmCode);
	res.status(200).json({
		message: "Confirm success"
	})
}

function generatePassword(length) {
	var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	var password = "";
	for (var i = 0; i < length; i++) {
		var randomIndex = Math.floor(Math.random() * charset.length);
		password += charset[randomIndex];
	}
	return password;
}

//device simulete
module.exports.test = async(req, res)=>{
	res.status(200).json({
		message: "confirm code:" + req.body.password
	})
}
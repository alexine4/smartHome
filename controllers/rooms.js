const rooms = require("../models/rooms");
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async (req, res) => {
	try {
		await rooms.findAll(req.user.houseId).then((Rooms) => {
			
				res.status(200).json(Rooms);
			
		});
	} catch (error) {
		errorHandler(res,error);
	}
};
module.exports.getByID = async (req, res) => {
	try {
		await rooms.findOneByID(req.params.roomId).then((Rooms) => {
			if (Rooms !== null) {
				res.status(200).json(Rooms);
			} else {
				res.status(404).json({
					message: "No content found",
				});
			}
		});
	} catch (error) {
		errorHandler(res,error);
	}
};

module.exports.addNew = async (req, res) => {
	try {
		await rooms.findOneByName(req.body.roomName).then((result) => {
			if (result === null) {
				rooms.create(req.body.typeId,req.user.houseId, req.body.roomName).then(() => {
					res.status(201).json({
						message: "Room create successfully",
					});
				});
			} else {
				res.status(409).json({
					message: "Room with this name already exist`s",
				});
			}
		});
	} catch (error) {
		errorHandler(res,error);
	}
};
module.exports.updateByID = async (req, res) => {
	try {
		await rooms.update(req.params.roomId, req.body.typeId, req.body.newRoomName)
			.then(() => {
				res.status(200).json({
					message: "Room updated successfully",
				});
			});
	} catch (error) {
		errorHandler(res,error);
	}
};
module.exports.deleteByID = async (req, res) => {
	try {
		await rooms.delete(req.params.roomId).then(() => {
			res.status(202).json({
				message: "Room remove successfully",
			});
		});
	} catch (error) {
		errorHandler(res,error);
	}
};

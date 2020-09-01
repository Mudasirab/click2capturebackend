const db = require("../models");
const comments = db.comments_table;
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Comment
    const comments_table = new comments({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });

    // Save Comments in the database
    comments_table
        .save(comments_table)
        .then(data => {
            // res.send(data);
            res.status(200).send(JSON.stringify({ message: "success", data }));
            //res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the comments."
            });
        });
};
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    comments.find(condition)
        .then(data => {
            res.status(200).send(JSON.stringify({ message: "success", data }));
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving."
            });
        });
};
//findBy ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    comments.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found with id " + id });
            else res.status(200).send(JSON.stringify({ message: "success", data }));
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving with id=" + id });
        });
};
//update 
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    comments.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update with id=${id}.`
                });
            } else res.send(JSON.stringify({ message: "success", data }));
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating with id=" + id
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;

    comments.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete id=${id}.`
                });
            } else {
                res.send(JSON.stringify({ message: "success" }));
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete with id=" + id
            });
        });
};
exports.deleteAll = (req, res) => {
    comments.deleteMany({})
        .then(data => {
            res.send(JSON.stringify({ message: "success" }));
            // res.send({
            //     message: `${data.deletedCount} were deleted successfully!`
            // });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all."
            });
        });
};
exports.findAllPublished = (req, res) => {
    comments.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving."
            });
        });
};
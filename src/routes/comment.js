module.exports = app => {
    const comments = require("../controllers/commentController");

    var router = require("express").Router();

    // Create a new comment
    router.post("/addcomment", comments.create);

    // Retrieve all comments
    router.get("/getComments", comments.findAll);

    // Retrieve all published comments
    router.get("/published", comments.findAllPublished);

    // Retrieve a single comment with id
    router.get("/:id", comments.findOne);

    // Update a comment with id
    router.put("/:id", comments.update);

    // Delete a comment with id
    router.delete("/:id", comments.delete);

    // Create a new comment
    router.delete("/", comments.deleteAll);

    app.use('/api/comments', router);
};
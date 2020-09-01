module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            email: String,
            name: String,
            message: String
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const comments = mongoose.model("comments_tables", schema);
    return comments;
};
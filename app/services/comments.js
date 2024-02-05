const { ObjectId } = require("mongodb");
const Comments = require("../models/comments");

module.exports = {
  createComment: async (text, postid, by) => {
    const newComment = new Comments({
      text: text,
      postid: postid,
      by: by,
    });

    return newComment.save();
  },
  getComments: async (id) => {
    const comments = await Comments.aggregate([
      {
        $match: {
          postid: new ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "by",
          foreignField: "_id",
          as: "byname",
        },
      },
      {
        $unwind: {
          path: "$byname",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $group: {
          _id: "$_id",
          text: {
            $first: "$text",
          },
          username: {
            $first: "$byname.name",
          },
          userid: {
            $first: "$by",
          },
        },
      },
    ]);
    return comments;
  },

  deleteComment: async (id) => {
    const deleted = await Comments.deleteOne({ _id: id });
    return deleted;
  },

  deletebyPostid: async (postid) => {
    const deleted = await Comments.deleteMany({ postid: postid });
    return deleted;
  },
};

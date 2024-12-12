const { z } = require("zod");

const createComment = z.object({
    body: z.object({
        blogId: z.string().min(24, "Invalid Blog ID").max(24, "Invalid Blog ID"),
        userId: z.string().min(24, "Invalid User ID").max(24, "Invalid User ID").optional(),
        text: z.string().min(1, "Comment text is required").trim(),
    })
});

const updateComment = z.object({
    body: z.object({
        blogId: z.string().min(24, "Invalid Blog ID").max(24, "Invalid Blog ID").optional(),
        userId: z.string().min(24, "Invalid User ID").max(24, "Invalid User ID").optional(),
        text: z.string().min(1, "Comment text is required").trim().optional(),
    })
});

const replyComment = z.object({
    body: z.object({
        text: z.string().min(1, "Comment text is required").trim(),
    })
});

const updateReplyComment = z.object({
    body: z.object({
        text: z.string().min(1, "Comment text is required").trim().optional(),
    })
});

const commentValidations = { createComment, updateComment, replyComment, updateReplyComment };

module.exports = commentValidations;

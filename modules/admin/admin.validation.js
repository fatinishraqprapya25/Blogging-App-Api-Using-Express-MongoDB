const { z } = require('zod');

const adminCreationValidationSchema = z.object({
    body: z.object({
        user: z.string().length(24, "User ID must be 24 characters long").regex(/^[0-9a-fA-F]{24}$/, "User ID must be a valid ObjectId")
    })
});

const adminBlogApproveValidationSchema = z.object({
    body: z.object({
        user: z.string().length(24, "User ID must be 24 characters long").regex(/^[0-9a-fA-F]{24}$/, "User ID must be a valid ObjectId")
    })
});

module.exports = { adminCreationValidationSchema, adminBlogApproveValidationSchema };
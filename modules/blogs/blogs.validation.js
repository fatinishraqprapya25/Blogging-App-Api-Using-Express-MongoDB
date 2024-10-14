const { z } = require('zod');

const blogCreationValidationSchema = z.object({
    writer: z.string().regex(/^[a-f\d]{24}$/i, "Invalid ObjectId"),
    title: z.string().trim().min(1, "Title is required"),
    description: z.string().trim().min(1, "Description is required"),
    isDeleted: z.boolean().optional().default(false),
    blogImage: z.string().optional()
});

const blogValidations = { blogCreationValidationSchema };
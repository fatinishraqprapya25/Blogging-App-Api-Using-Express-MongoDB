const { z } = require('zod');

const creatUserValidationSchema = z.object({
    body: z.object({
        firstName: z.string().min(1, { message: "First name is required" }),
        lastName: z.string().min(1, { message: "Last name is required" }),
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
        phone: z.string().min(11, { message: "Phone number must be at least 10 digits" }),
    })
});

const verifyUserValidation = z.object({
    body: z.object({
        email: z.string().email({ message: "Invalid Email Address" }),
        code: z.string().min(6, { message: "Code must be at least 6 digits" })
    })
});

const sendVerificationCodeValidation = z.object({
    body: z.object({
        email: z.string().email({ message: "Invalid Email Address" }),
    })
});

const resetPasswordValidation = z.object({
    body: z.object({
        email: z.string().email({ message: "Invalid Email Address" }),
        code: z.string().min(6, { message: "Code must be at least 6 digits" }),
        password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    })
});

const updateUserValidationSchema = z.object({
    body: z.object({
        firstName: z.string().min(1, { message: "First name must be at least 1 character long" }).optional(),
        lastName: z.string().min(1, { message: "Last name must be at least 1 character long" }).optional(),
        email: z.string().email({ message: "Invalid email address" }).optional(),
        password: z.string().min(6, { message: "Password must be at least 6 characters long" }).optional(),
        phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }).optional()
    })
});

const userLoginValidationSchema = z.object({
    body: z.object({
        email: z.string().email({ message: "Invalid email address" }).nonempty("email is required"),
        password: z.string().nonempty("password is required")
    })
});

const userValidations = { creatUserValidationSchema, updateUserValidationSchema, userLoginValidationSchema, verifyUserValidation, resetPasswordValidation, sendVerificationCodeValidation };

module.exports = userValidations

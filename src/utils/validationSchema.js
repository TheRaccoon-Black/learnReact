export const userValidationSchema = {
    username: {
        isLength: {
            options: { min: 2, max: 10 },
            errorMessage: "Username min 2 max 10",
        },
        notEmpty: {
            errorMessage: "Username is required",
        },
        isString: {
            errorMessage: "Username must be a String",
        }},
        displayName: {
            notEmpty: true
        }}
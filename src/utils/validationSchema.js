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
        },
        password: { // Tambahkan validasi untuk password
        notEmpty: {
            errorMessage: "Password is required"
        },
        isLength: {
            options: { min: 6 },
            errorMessage: "Password must be at least 6 characters long"
        }
    }
    }
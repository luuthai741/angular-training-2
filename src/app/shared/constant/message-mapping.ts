export const ERROR_MESSAGES: { [key: string]: string } = {
    required: "This field is required",
    usernameExisting: "Username already exists",
    invalidPassword: "Password must be at least 9 characters, contain a capital letter and a special character.",
    confirmPassword: "Passwords do not match",
    invalidFullName: "Full name is required, max 20 characters, and no special characters.",
    invalidAge: "Age should be between 1 and 99",
    invalidNumber: "Invalid number",
    mismatch: "Passwords do not match!",
    invalidImageUrl: "Please enter a valid image URL (e.g., https://example.com/image.jpg)",
    invalidPrice: "Price should be between 0.1 and 1000.00",
    productIsNotFound: "Product's not found",
    productCreatedFail: "Product created fail",
    productUpdatedFail: "Product updated fail",
    productDeleteFail: "Product deleted fail",
    userIsNotFound: "User's not found",
    loginFailed: "Invalid login credentials",
}

export const SUCCESS_MESSAGES: { [key: string]: string } = {
    productCreatedSuccess: "Product created successfully",
    productUpdatedSuccess: "Product updated successfully",
    productDeletedSuccess: "Product deleted successfully",
    userCreatedSuccess: "User created successfully",
    userUpdatedSuccess: "User updated successfully",
    userDeletedSuccess: "User deleted successfully",
    signUpSuccess: "Sign up successfully",
}
export const WARNING_MESSAGES: { [key: string]: string } = {
    deleteProductConfirm: "Do you really want to delete this product?",
    deleteUserConfirm: "Do you really want to delete this user?",
}


export function isSuccess(code: number): boolean {
    return code >= 200 && code < 300;
}

export function isError(code: number): boolean {
    return code >= 400;
}
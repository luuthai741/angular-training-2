import {MessageType} from "./message.type";

const ERROR_MESSAGES: { [key: string]: string } = {
    required: "Please enter ",
    usernameExisting: "Username already exists",
    invalidPassword: "Password must be at least 9 characters, contain a capital letter and a special character.",
    confirmPassword: "Passwords don't matches",
    invalidFullName: "Full name is required, max 20 characters, and no special characters or numbers.",
    invalidAge: "Age should be between 1 and 99",
    invalidNumber: "Invalid number",
    mismatch: "Passwords do not match!",
    invalidImageUrl: "Invalid image URL (e.g., https://example.com/image.jpg)",
    invalidPrice: "Price should be between 0.1 and 1000.00",
    productIsNotFound: "Product's not found",
    productCreatedFail: "Product created fail",
    productUpdatedFail: "Product updated fail",
    productDeleteFail: "Product deleted fail",
    userIsNotFound: "User's not found",
    loginFailed: "Invalid login credentials",
}

const SUCCESS_MESSAGES: { [key: string]: string } = {
    productCreatedSuccess: "Product created successfully",
    productUpdatedSuccess: "Product updated successfully",
    productDeletedSuccess: "Product deleted successfully",
    userCreatedSuccess: "User created successfully",
    userUpdatedSuccess: "User updated successfully",
    userDeletedSuccess: "User deleted successfully",
    signUpSuccess: "Sign up successfully",
}

const WARNING_MESSAGES: { [key: string]: string } = {
    deleteProductConfirm: "Do you really want to delete this product?",
    deleteUserConfirm: "Do you really want to delete this user?",
}

export function getMessageByKey(messageType: MessageType, messageKey: string): string {
    switch (messageType) {
        case MessageType.ERROR:
            return ERROR_MESSAGES[messageKey];
        case MessageType.SUCCESS:
            return SUCCESS_MESSAGES[messageKey];
        case MessageType.WARNING:
            return WARNING_MESSAGES[messageKey];
        default:
            return "";
    }
}
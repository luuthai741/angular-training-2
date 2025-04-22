export const userFormTitles: { [key: string]: string } = {
    "id": "Id",
    "username": "Username",
    "passwordGroup": "Confirm Password",
    "passwordGroup.password": "Password",
    "passwordGroup.confirmPassword": "Confirm Password",
    "fullName": "Full Name",
    "age": "Age",
    "gender": "Gender",
    "role": "Role",
    "adminCode": "Admin Code",
    "subscriptionCode": "Subscription Code"
}

export const userFormValidators: { [key: string]: string[] } = {
    "id": [],
    "username": ['required', 'usernameExisting'],
    "passwordGroup": ['mismatch'],
    "passwordGroup.password": ['required', 'invalidPassword'],
    "passwordGroup.confirmPassword": ['required'],
    "fullName": ['required', 'invalidFullName'],
    "age": ['required', 'invalidAge', 'invalidNumber'],
    "gender": ['required'],
    "role": ['required'],
    "adminCode": [],
    "subscriptionCode": []
}

export const productFormTitles: { [key: string]: string } = {
    "id": "Id",
    "title": "Title",
    "price": "Price",
    "description": "Description",
    "category": "Category",
    "image": "Image",
}

export const productFormValidator: { [key: string]: string[] } = {
    "id": [],
    "title": ['required'],
    "price": ['required', 'invalidPrice'],
    "description": ['required'],
    "category": ['required'],
    "image": ['required', 'invalidImageUrl']
}

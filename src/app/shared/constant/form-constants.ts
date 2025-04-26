export const formTitles: { [key: string]: string } = {
    "id": "Id",
    //User
    "username": "Username",
    "passwordGroup": "Confirm Password",
    "password": "Password",
    "confirmPassword": "Confirm Password",
    "passwordGroup.password": "Password",
    "passwordGroup.confirmPassword": "Confirm Password",
    "fullName": "Full Name",
    "age": "Age",
    "gender": "Gender",
    "role": "Role",
    "adminCode": "Admin Code",
    "subscriptionCode": "Subscription Code",
    //Product
    "title": "Title",
    "price": "Price",
    "description": "Description",
    "category": "Category",
    "image": "Image",
}

export const formValidators: { [key: string]: string[] } = {
    "id": [],
    //User
    "username": ['required', 'usernameExisting'],
    "passwordGroup": ['mismatch'],
    "password": ['required', 'invalidPassword'],
    "confirmPassword": ['required', 'mismatch'],
    "passwordGroup.password": ['required', 'invalidPassword'],
    "passwordGroup.confirmPassword": ['required'],
    "fullName": ['required', 'invalidFullName'],
    "age": ['required', 'invalidAge', 'invalidNumber'],
    "gender": ['required'],
    "role": ['required'],
    "adminCode": [],
    "subscriptionCode": [],
    //Product
    "title": ['required'],
    "price": ['required', 'invalidPrice'],
    "description": ['required'],
    "category": ['required'],
    "image": ['required', 'invalidImageUrl']
}


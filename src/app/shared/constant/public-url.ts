export const publicUrl: string[] = ['/login', '/register'];

export enum ROUTE {
    HOME = '/',
    LOGIN = '/login',
    REGISTER = '/register',
    UNAUTHORIZED = '/unauthorized',
    NOT_FOUND = '/not-found',
    ADMIN_USERS = '/admin/users',
    ADMIN_USERS_DETAILS = '/admin/users/details',
    ADMIN_USERS_CREATE = '/admin/users/create',
    ADMIN_USERS_EDIT = '/admin/users/edit',
    ADMIN_PRODUCTS = '/admin/products',
    ADMIN_PRODUCTS_DETAILS = '/admin/products/details',
    ADMIN_PRODUCTS_CREATE = '/admin/products/create',
    ADMIN_PRODUCTS_EDIT = '/admin/products/edit',
}

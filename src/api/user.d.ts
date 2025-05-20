/**
 * 用户注册
 * @param params
 */
export declare const userRegister: (params: any) => Promise<import("axios").AxiosResponse<any, any>>;
/**
 * 用户登录
 * @param params
 */
export declare const userLogin: (params: any) => Promise<import("axios").AxiosResponse<any, any>>;
/**
 * 用户注销
 * @param params
 */
export declare const userLogout: (params: any) => Promise<import("axios").AxiosResponse<any, any>>;
/**
 * 获取当前用户
 */
export declare const getCurrentUser: () => Promise<import("axios").AxiosResponse<any, any>>;
/**
 * 获取用户列表
 * @param username
 */
export declare const searchUsers: (username: any) => Promise<import("axios").AxiosResponse<any, any>>;
/**
 * 删除用户
 * @param id
 */
export declare const deleteUser: (id: string) => Promise<import("axios").AxiosResponse<any, any>>;

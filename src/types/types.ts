export type TPost = {
    postId: string
    postText: string
    timestamp: string
    userHandle: string
    userImage: string
}

export type token = {
    token: string
}

export type error = {
    general?: string
    confirmPassword?: string
    handle?: string
    email?: string
}

export type ArrayOfTPosts = Array<TPost>

export type TLoginUser = {
    email: string
    password: string
}

export type TSignUp = {
    confirmPassword: string
    handle: string
} & TLoginUser
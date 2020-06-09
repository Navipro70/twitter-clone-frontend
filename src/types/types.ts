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

export type TCredentials = {
    userId: string
    email: string
    timestamp: string
    imageUrl: string
    handle: string
    location?: string
    website?: string
    bio?: string
}

export type TLike = {
    postId: string
    userHandle: string
}

export type TArrayOfLikes = Array<TLike>

//TODO Add type for notifications

// export type TNotifications = {
//     postId: string
//
// }
export type TPost = {
    postId: string
    postText: string
    timestamp: string
    userHandle: string
    userImage: string
    commentCount?: number
    likeCount?: number
}

export type token = {
    token: string
}

export type error = {
    general?: string
    confirmPassword?: string
    handle?: string
    email?: string
    error?: string
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
} & TUserDetails

export type TLike = {
    postId: string
    userHandle: string
}

export type TArrayOfLikes = Array<TLike>
export type TArrayOfNotifications = Array<TNotifications>

//TODO Remove all no needed rerendering in components

type TNotifications = {
    postId: string
    read: boolean
    recipient: string
    sender: string
    timestamp: string
    type: string
}

export type TUserDetails = {
    bio?: string
    website?: string
    location?: string
}
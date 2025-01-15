import Jwt from "jsonwebtoken"

export interface JWTUserPayload{
    id: number;
    email: string;
}

export const generateJwtAccessToken = (payload: JWTUserPayload, secret: string) =>{
    return Jwt.sign(
        payload,
        secret,
        {
            expiresIn:"15m"
        }
    )
}

export const generateJwtRefreshToken = (payload: JWTUserPayload, secret: string)=>{
    return Jwt.sign(
        payload,
        secret,
        {
            expiresIn: "15d"
        }
    )
}

export const verifyJwt = (token: string, secret: string): JWTUserPayload | null =>{
    try {
        return Jwt.verify(token, secret) as JWTUserPayload;
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            return null;
        }
        throw error;
    }
}
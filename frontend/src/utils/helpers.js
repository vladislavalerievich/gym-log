import jwt_decode from 'jwt-decode';


export const isTokenValid = (token) => {
    const decodedToken = jwt_decode(token);
    const currentDate = new Date();
    return decodedToken.exp * 1000 > currentDate.getTime();
}

export const timestampToString = (timestamp) => {
    const date = new Date(timestamp);
    return date.toDateString().toLocaleString();
}
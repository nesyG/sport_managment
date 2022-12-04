const jwt = require("jsonwebtoken");

// Extract User ID from token
const getUserId = (header: string) => {
    try{
        const token = header.split(" ")[1];
        return jwt.verify(token, process.env.JWT_SECRET).id;
    } catch {
        return false;
    }
}


export default getUserId
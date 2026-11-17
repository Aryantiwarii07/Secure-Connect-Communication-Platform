
const jwt = require("jsonwebtoken");

// AUTHENTICATION MIDDLEWARE
const protect = (req, res, next) => {
    try {
        // Get authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Attach user information to request
        req.user = {
            id: decoded.sub,
            role: decoded.role
        };

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};


// ROLE-BASED ACCESS CONTROL
const authorize = (...allowedRoles) => {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access forbidden: insufficient permissions"
            });
        }

        next();
    };
};

module.exports = {
    protect,
    authorize
};

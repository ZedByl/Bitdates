const jwt = require('jsonwebtoken');
const authenticateUser = (req, res, next) => {
    const token = req.cookies.authToken;

    // console.log(token, req);

    if (!token) {
        return res.status(401).json({ message: 'Требуется авторизация' });
    }

    try {
        const decoded = jwt.verify(token, 'bitdata-backend');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Неверный или истекший токен' });
    }
};

module.exports = authenticateUser;

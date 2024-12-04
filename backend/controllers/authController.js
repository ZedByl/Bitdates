const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
    const token = jwt.sign(
        { id: req.user.id, email: req.user.emails[0].value },
        'bitdata-backend',
        { expiresIn: '1w'}
    );

    res.cookie('authToken', token, { httpOnly: true, secure: true });

    res.redirect(`http://localhost:8080`);
};

module.exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};
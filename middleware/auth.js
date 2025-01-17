const jwt = require('jsonwebtoken');

function auth(req, res, next){
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).send('Token bulunamadı.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, () => { 
            if(err) return res.status(400).send('Geçersiz token.');
            const refreshedToken = generateToken(user);
            res.setHeader("x-auth-token", `Bearer ${refreshedToken}`);
            req.user = decoded;
            next();
        });
    }catch (ex){
        res.status(500).send(ex.message);
    }
}

module.exports = auth;
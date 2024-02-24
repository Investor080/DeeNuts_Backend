const isLoggedin = async(req, res, next)=>{
    if(req.isAuthenticated()) return next()
    return res.json({error: "Login sesion expired"})
}


const isAdmin = async(req, res, next)=>{
    if(req.isAuthenticated() && req.user.userType === "admin") return next()
    return res.json({error: "You are not authorized"})
}


module.exports = {
    isLoggedin,
    isAdmin
}
const hash = require("crypto-js/sha256")
const userService = require("../services/user.services")
const jwt = require("jsonwebtoken")
const env = require("dotenv").config()

let handleLogin = async(req, res)=>{
    try {
        let username = req.body.username
        let password = req.body.password
        const hashPassword = hash(password).toString();
        let userData = await userService.userLogin(username, hashPassword)
        if(userData.status === 'success'){
            const token = jwt.sign({
                idUser: userData.user.id
            }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES
            });
            res.cookie("token", token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                maxage: process.env.JWT_MAXAGE
            });
        }
        return res.status(200).json({
            status: userData.status,
            user: userData.user ? userData.user : {}
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: "error from server",
        })
    }
    
}

let handleRegister = async(req,res)=>{
    try {
        req.body.password = hash(req.body.password).toString();
        let data = await userService.userRegister(req.body)
        return res.status(200).json({
            status: data.status
        })
    } catch (error) {
        return res.status(400).json({
            status: "error from server",
        })
    }
}

let getVerifyEmail = async(req, res)=>{
    try {
        let userToken = req.params.token
        let data = await userService.userVerify(userToken)
        return res.status(200).json({
            status: data.status
        })
    } catch (error) {
        return res.status(400).json({
            status: "error from server",
        })
    }
}

let handleGetAllUsers = async(req,res)=>{
    try {
        let id = req.body.id; //all, id
        let user = await userService.getAllUsers(id)
        return res.status(200).json({
            errCode: 0,
            status: 'success',
            user: user
        })
    } catch (error) {
        return res.status(400).json({
            status: "error from server",
        })
    }
}

let handleGetProfile = async(req, res)=>{
    try {
        let user = await userService.getProfile(req.params.id)
        return res.status(200).json({
            errCode: 0,
            status: 'success',
            like: user.like,
            star: user.star,
            numOfImage: user.numOfImage,
            image: user.image
        })
    } catch (error) {
        return res.status(400).json({
            status: "error from server",
        })
    }
}

const changeName = async(req, res)=>{
    try {
        let user = await userService.changeName(req.idUser, req.body.newName)
        if(user){
        return res.status(200).json({
            status: 'success'
        })}
        else{
            return res.status(200).json({
                status: 'name is already exist'
            })
        }
    } catch (error) {
        return res.status(400).json({
            status: "error from server",
        })
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleRegister: handleRegister,
    getVerifyEmail: getVerifyEmail,
    handleGetAllUsers: handleGetAllUsers,
    handleGetProfile: handleGetProfile,
    changeName: changeName
}
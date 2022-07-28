let db = require("../models/index")
const sendEmail = require("./email.services")
const jwt = require("jsonwebtoken")
const { resolve } = require("path")
const env = require("dotenv").config()

function userLogin(username, hashPassword) {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUsername(username)
            if (isExist){
                let user = await db.User.findOne({
                    attributes: ['id', 'username', 'role', 'password', 'isVerified'],
                    where: {username: username},
                    raw: true
                })
                if(user){
                    let check = (hashPassword === user.password) ? true : false
                    if(check && user.isVerified){
                        userData.status = "success"
                        delete user.password
                        delete user.isVerified
                        userData.user = user
                    }else{
                        userData.status = "error"
                    }
                }else{
                    userData.status = "error"
                }
            }else{
                userData.status = "error"
            }
            resolve(userData)
            
        } catch (error) {
            reject(error)
        }
    })
}

function checkUsername(username) {
    return new Promise(async (resolve, reject)=>{
        try {
            let user = await db.User.findOne({
                where: {username: username}
            })
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

function userRegister(data) {
    return new Promise(async (resolve, reject)=>{
        try {
            let userData = {}
            let isExist = await checkUsername(data.username)
            if (!isExist){
                await db.User.create({
                    username: data.username,
                    email: data.email,
                    isVerified: false,
                    password: data.password, 
                    fullname: data.fullname, 
                    dateofbirth : data.dateofbirth,
                    gender: data.gender,
                })
                const token = jwt.sign({
                    username: data.username
                }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES
                });
                sendEmail.sendEmail(data.email, data.fullname, token)
                userData.status = "success"

            }else{
                userData.status = "error"
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}


function userVerify(token) {
    return new Promise(async(resolve, reject)=>{
        try {
            let data = {}
            const username = await jwt.verify(token, process.env.JWT_SECRET);
            let user = await db.User.findOne({
                where: {username: username.username}
            })
            if(user){
                user.isVerified = true
                user.save()
                data.status = "success"
            }else{
                data.status = "error"
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

function getAllUsers(userId) {
    return new Promise(async(resolve, reject)=>{
        try {
            let user = '';
            if(userId === 'all'){
                user = await db.User.findAll({
                    attributes:{
                        exclude: ['password']
                    }
                })
            }
            if(userId && userId !== 'all'){
                user = await db.User.findOne({
                    where: {id: userId},
                    attributes:{
                        exclude: ['password']
                    }
                })
            }
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    userLogin: userLogin,
    userRegister: userRegister,
    userVerify: userVerify,
    getAllUsers: getAllUsers,

}
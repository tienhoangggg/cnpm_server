let db = require("../models/index")
const jwt = require("jsonwebtoken")
const { resolve } = require("path")
const env = require("dotenv").config()

function checkRoleUser(idUser) {
    return new Promise(async (resolve, reject)=>{
        try {
            let isExist = await db.User.findOne({
                where: {id: idUser, role: true}
            })
            if(isExist){
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

function createCategory (category, idUser){
    return new Promise(async(resolve, reject)=>{
        try {
            let isExist = await checkRoleUser(idUser)
            if(isExist){
            await db.Category.create({
                name: category
            })
            resolve('success')
        }
        else{
            resolve('error')
        }
        } catch (error) {
            reject(error)
        }
    })
}

function deleteCategory (category, idUser){
    return new Promise(async(resolve, reject)=>{
        try {
            let isAdmin = await checkRoleUser(idUser)
            if(isAdmin){
            let data = {}
            let Category = await db.Category.findOne({
                where: {name: category}
            })

            if(Category){
                await Category.destroy();
                let CateOfImages = await db.CateOfImages.findAll({
                    where: {nameCate: category}
                })
                if(CateOfImages){
                    for(let i = 0; i < CateOfImages.length; i++){
                        await CateOfImages[i].destroy();
                    }
                }
                data.status = 'success'
                data.message = 'Deleting Category success.'
                resolve(data)
            }
            else{
                data.status = 'error'
                data.message = 'Deleting Category failed.'
                resolve(data)
            }}
            else{
                resolve('error')
            }
        } catch (error) {
            reject(error)
        }
    })
}

function readCategory(){
    return new Promise(async(resolve, reject)=>{
        try {
            data = {}
            category = await db.Category.findAll({
                raw: true
            })
            data.id = [];
            data.name = [];
            for(let i = 0; i < category.length; i++){
                data.id.push(category[i].id)
                data.name.push(category[i].name)
            }
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createCategory: createCategory,
    deleteCategory: deleteCategory,
    readCategory: readCategory
}
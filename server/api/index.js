'use strict'

const router = require('express').Router()
const {Student, Campus} = require('../db')

// Your routes go here!
// NOTE: Any routes that you put here are ALREADY mounted on `/api`
// You can put all routes in this file HOWEVER,
// this file should almost be like a table of contents for the routers you create!
// For example:
//
// For your `/api/puppies` routes:
// router.use('/puppies', require('./puppies'))
//
// And for your `/api/kittens` routes:
// router.use('/kittens', require('./kittens'))

// If someone makes a request that starts with `/api`,
// but you DON'T have a corresponding router, this piece of
// middleware will generate a 404, and send it to your
// error-handling endware!

router.get('/students', async (req, res, next) => {
  try {
    const allStudents = await Student.findAll()
    res.json(allStudents)
  } catch (error) {
      next(error)
  }
})

router.get('/students/:id', async (req, res, next) => {
  try {
    const studentById = await Student.findById(req.params.id)
    if (studentById){
      res.json(studentById)
    }
    else {
      res.status(404)
    }
  } catch (error) {
      next(error)
  }
})

router.get('/campuses', async (req, res, next) => {
  try {
    const allCampuses = await Campus.findAll()
    res.json(allCampuses)
  } catch (error) {
      next(error)
  }
})

router.get('/campuses/:id/students', async (req, res, next) => {
  try {
    const campusId = req.params.id
    const students = await Student.findAll({ where: {campusId} })
    res.json(students)
  } catch (error) {
    next(error)
  }
})

router.get('/campuses/:id', async (req, res, next) => {
  try {
    const campusById = await Campus.findById(req.params.id)
    if (campusById){
      res.json(campusById)
    }
    else {
      res.status(404)
    }
  } catch (error) {
      next(error)
  }
})

router.use((req, res, next) => {
  const err = new Error('API route not found!')
  err.status = 404
  next(err)
})

module.exports = router

//SAMPLE SYNTAX!!!!!!

// router.post('/articles',  async (req,res,next) =>{
//     try {
//         let newBody = req.body
//         if(newBody !== undefined){
//             const newArticle = await Article.create(newBody)
//             res.json({message:'Created successfully', article: newArticle})
//             //didnt construct the below object. missed this step: 
//             //{
//             //  message: 'Created successfully',
//             // article: <the created article instance>
//             //  }
//         }
//         else{
//             res.status(500)
//         }
//     } catch (error) {
//         next(error)
//     }
// })
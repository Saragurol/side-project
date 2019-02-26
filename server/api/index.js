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
    const allStudents = await Student.findAll({
      include: [Campus]
    })
    res.json(allStudents)
  } catch (error) {
      next(error)
  }
})

router.get('/students/:id', async (req, res, next) => {
  try {
    const studentById = await Student.findById(req.params.id, {include: [Campus]})
    if (studentById){
      res.json(studentById)
    }
    else {
      res.status(404).json({})
    }
  } catch (error) {
      next(error)
  }
})

router.post('/students',  async (req, res, next) => {
  try {
      let newBody = req.body
      if (newBody !== undefined){
          const newStudent = await Student.create(newBody)
          res.json(newStudent)
      }
      else {
          res.status(500)
      }
    } catch (error) {
        next(error)
    }
})
//the res.status (500) isint necessary here bc in the middleware they are already saying that if there is an error send the 500 status. as long as we place everything in a try catch. this will be enough for this project. 
router.delete('/students/:id', async (req, res, next) => {
  try {
    await Student.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(204).json({})
  } catch (error) {
    next(error)
  }
})

router.put('/students/:id', async (req, res, next) => {
  try {
    const findStudent = await Student.findById(req.params.id)
    if (findStudent){
      const updatedStudent = await Student.update(req.body, {
        where: {id: req.params.id},
        returning: true,
        plain: true
      })
      res.json(updatedStudent)
    }
    else {
      res.status(500)
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

router.post('/campuses',  async (req, res, next) => {
  try {
      let newBody = req.body
      if (newBody !== undefined){
          const newCampus = await Campus.create(newBody)
          res.json(newCampus)
      }
      else {
          res.status(500)
      }
    } catch (error) {
        next(error)
    }
})

router.delete('/campuses/:id', async (req, res, next) => {
  try {
    await Campus.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(204).json({})
  } catch (error) {
    next(error)
  }
})

router.put('/campuses/:id', async (req, res, next) => {
  try {
    const findCampus = await Campus.findById(req.params.id)
    if (findCampus){
      const updatedCampus = await Campus.update(req.body, {
        where: {id: req.params.id},
        returning: true,
        plain: true
      })
      res.json(updatedCampus)
    }
    else {
      res.status(500)
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

const express = require("express")
const router = express.Router()

const { 
    login, 
    signup, 
    taskAssigned } = require("../controllers/Auth")

router.post("/login", login)
router.post("/signup", signup)
router.get("/tasksasigned", taskAssigned)

module.exports = router;
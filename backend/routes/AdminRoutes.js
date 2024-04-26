const express = require("express")
const router = express.Router()

const { 
    getAllUser, 
    createnormaluser, 
    getAllTask, 
    assignedTask,
    getSingleTask } = require("../controllers/AdminController")


router.get("/users", getAllUser)
router.post("/user/add", createnormaluser)
router.get("/tasks", getAllTask)
router.post("/assigntasks", assignedTask )
router.get("/getusertask/:id", getSingleTask )


module.exports = router;
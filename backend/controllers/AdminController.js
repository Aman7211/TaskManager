const User = require("../models/UserSchema");
const Task = require("../models/TaskSchema");
const bcrypt = require("bcrypt");
exports.getAllUser = async (req, res) => {
	try {
		const userDetails = await User.find();
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};


exports.createnormaluser = async (req, res) =>{
    try {
        const { name, email, password } = req.body;

        // Check if all required fields are present
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "normal", 
        });

        return res.status(201).json({
            success: true,
            user,
            message: "admin successfully created the normal user",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "normal user can t be created",
        });
    }
}

exports.getAllTask = async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo');

        res.status(200).json({
            success: true,
            message: "All tasks successfully loaded",
            tasks: tasks,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch tasks",
        });
    }
};

exports.assignedTask = async (req, res) => {
    try {
        const { title, description, assignedTo } = req.body;
       
        // Check if all required fields are present
        if (!title || !description || !assignedTo) {
            return res.status(400).json({
                success: false,
                message: "Please provide title, description, and assigned/user ID",
            });
        }

        // Check if the user exists
        const user = await User.findById(assignedTo);
        console.log(user);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Create a new task and assign it to the user
        const task = await Task.create({
            title,
            description,
            assignedTo,
        });

        return res.status(201).json({
            success: true,
            message: "Task assigned to user successfully",
            task,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to assign task to user",
        });
    }
};

exports.getSingleTask = async (req, res) => {
    try {
        const taskId = req.params.id; // Directly access req.params.id
        const task = await Task.findOne({ assignedTo: taskId });
        if (!task) {
            return res.status(404).json({ 
                success: false, 
                message: 'Task not found or not assigned to the user' 
            });
        }
        res.status(200).json({ 
            success: true, 
            task 
        });
    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal Server Error' 
        });
    }
};

const bcrypt = require("bcrypt");
const User = require("../models/UserSchema");
const Task = require("../models/TaskSchema")
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Signup Controller for Registering USers

exports.signup = async (req, res) => {
	try {
		// Destructure fields from the request body
		const {
			name,
			email,
			password,
            role
		} = req.body;
		// Check if All Details are there or not
		if (
			!name ||
			!email ||
			!password ||
            !role
		) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exists. Please sign in to continue.",
			});
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			name,
			email,
            role,
			password: hashedPassword,
			});

		return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
	}
};

// Login controller

exports.login = async (req, res) => {
	try {
	
		const { email, password } = req.body;

		// Check if email or password is missing
		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: `Please Fill up All the Required Fields`,
			});
		}

		// Find user with provided email
		const user = await User.findOne({ email });


		if (!user) {
			return res.status(401).json({
				success: false,
				message: `User is not Registered with Us Please SignUp to Continue`,
			});
		}

		// Generate JWT token and Compare Password
		if (await bcrypt.compare(password, user.password)) {
			const token = jwt.sign(
				{ email: user.email, id:user._id, name: user.name, role: user.role },
				process.env.JWT_SECRET,
				{
					expiresIn: "24h",
				}
			);

			user.token = token;
			user.password = undefined;

			return res.status(200).json({
				success: true,
				token,
				user,
				message: `User Login Success`,
			});
		} else {
			return res.status(401).json({
				success: false,
				message: `Password is incorrect`,
			});
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
		});
	}
};

exports.taskAssigned = async (req, res) => {
    try {
        // Extract userId from the authenticated user's information
        const userId = req.user.id;

        // Fetch tasks assigned to the user
        const tasks = await Task.find({ assignedTo: userId });

        // Send tasks as response
        res.status(200).json({
            success: true,
            message: "Assigned tasks retrieved successfully",
            tasks: tasks,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch assigned tasks. Please try again.",
        });
    }
}
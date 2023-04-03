//building routes for user 
import express from 'express';
import { getAllUser, login, signup } from '../controllers/userController.js';

//using router from express
const router = express.Router();

//requests
router.get("/", getAllUser); 
router.post("/signup", signup); //creating a user
router.post("/login", login); //logging the user in 

//exporting router
export default router;
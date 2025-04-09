import express from 'express';
import { UserController } from '../controllers/user.controller';
const router = express.Router();

router.get('/top', UserController.getTopUsers);
router.get('/', UserController.getUser);
router.post('/', UserController.createUser);
router.put('/', UserController.updateUser);
router.delete('/', UserController.deleteUser);

export default router;

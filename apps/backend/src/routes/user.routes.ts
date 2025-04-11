import express from 'express';
import { UserController } from '../controllers/user.controller';
import { upload } from '../middleware/upload';
const router = express.Router();

router.get('/top', UserController.getUsers);
router.get('/:id', UserController.getUser);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.post(
  '/:id/avatar',
  upload.single('avatar'),
  UserController.uploadAvatar
);
router.delete('/:id', UserController.deleteUser);

export default router;

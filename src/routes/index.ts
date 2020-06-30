import {Router} from 'express';
import studentRouter from './student.router';

const router: Router = Router();
router.use('/students', studentRouter);

export default router;

import {Router} from 'express';
import studentsRouter from './students.routes';
import sessionsRouter from './sessions.routes';

const router: Router = Router();
router.use('/students', studentsRouter);
router.use('/sessions', sessionsRouter);

export default router;

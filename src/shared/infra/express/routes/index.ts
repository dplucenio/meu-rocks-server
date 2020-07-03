import {Router} from 'express';
import studentsRouter from '@modules/users/infra/http/express/students.routes';
import sessionsRouter from '@modules/users/infra/http/express/sessions.routes';

const router: Router = Router();
router.use('/students', studentsRouter);
router.use('/sessions', sessionsRouter);

export default router;

import { Router } from 'express';
import studentsRouter from '@modules/users/infra/express/routes/students.routes';
import sessionsRouter from '@modules/users/infra/express/routes/sessions.routes';

const router: Router = Router();
router.use('/students', studentsRouter);
router.use('/sessions', sessionsRouter);

export default router;

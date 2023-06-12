import { Router } from 'express';
import userRoutes from './user.routes';
import gameRoutes from './game.routes';
import reviewRouter from './review.routes';

const router = Router();

router.use('/users', userRoutes)
router.use('/games', gameRoutes)
router.use('/reviews', reviewRouter)

export default router;
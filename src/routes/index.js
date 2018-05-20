import { Router } from 'express';
import { version } from '../../package.json';
import { create, getBalance, transaction } from '../controllers/wallet';

const router = Router();

router.get('/createWallet', create);

router.get('/getBalance/:ethAddress', getBalance);

router.post('/transaction', transaction);

router.get('/health', (req, res) => res.send({ version }));

router.get('*', (req, res) => res.send('use one of the valid endpoints'));

export default router;

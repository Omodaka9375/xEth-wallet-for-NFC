import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import { port, bodyLimit } from './config.json';
import logger from './utils/logger';
import routes from './routes';

const PORT = process.env.PORT || port;
const app = express();

app.use(helmet({ noCache: true }));

app.use(morgan('dev'));

app.use(bodyParser.json({ limit: bodyLimit }));

app.use('/', routes);

app.listen(PORT, () => logger.info(`Started on port ${PORT}`));

export default app;

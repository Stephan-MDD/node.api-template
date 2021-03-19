/// libraries
import 'reflect-metadata';
import * as express from 'express';
import * as dotenv from 'dotenv';

/// modules
import * as Controllers from './Controllers';

/// content
dotenv.config();
const app: express.Application = express();
const port: number = Number(process.env.SERVER_PORT);

// middleware
app.use(express.json());

Object.values(Controllers).forEach((controller) => {
	app.use(controller.route, controller.router);
});

// initialize server
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));

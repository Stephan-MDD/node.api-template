/// libraries
import { Router, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/// modules
import { HttpCodes } from '../enums';
import { UserService } from '../Services';
import { ForbiddenError, BadRequestError } from '../Errors/ClientErrors';
import { InternalServerError } from '../Errors/ServerErrors';
import { UserDTO } from '../DTOs/User';
import { Exception } from '../Middleware';

/// content
const route: string = '/auth';
const router: Router = Router();

const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	if (!email) throw new BadRequestError('No email received');
	if (!password) throw new BadRequestError('No password received');

	const userDTO: UserDTO = await UserService.getSingle(email);
	const passwordHash: string = userDTO.password;

	const passwordMatch: boolean = await bcrypt.compare(password, passwordHash);

	if (!passwordMatch) {
		throw new ForbiddenError('Invalid login credentials');
	}

	const accessTokenSecret: string | undefined = process.env.JWT_SECRET;

	if (!accessTokenSecret) {
		throw new InternalServerError('No JWT resource found');
	}

	const token: string = jwt.sign({ email: req.body.email }, accessTokenSecret);
	res.locals.response = { token };
	res.locals.status = HttpCodes.Accepted;
};

router.post('/login', Exception.catcher(login));

export default { router, route };

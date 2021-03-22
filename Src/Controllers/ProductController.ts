/// libraries
import { Router, Request, Response, NextFunction } from 'express';

/// modules
import { ProductService } from '../Products';
import { Product } from '../Models';

/// content
const route: string = '/product';
const router: Router = Router();

// get all product
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	res.locals.serviceResponse = await ProductService.getAll();
	next();
});

// get single product
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
	const id: number = Number(req.params.id);
	res.locals.serviceResponse = await ProductService.getSingle(id);
	next();
});

// create single product
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	const product: Product = req.body;
	res.locals.serviceResponse = await ProductService.addSingle(product);
	next();
});

// update single product
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
	const id: number = Number(req.params.id);
	const product: Product = req.body;
	res.locals.serviceResponse = await ProductService.updateSingle(id, product);
	next();
});

// delete single product
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
	const id: number = Number(req.params.id);
	res.locals.serviceResponse = await ProductService.deleteSingle(id);
	next();
});

export default { router, route };

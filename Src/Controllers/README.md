# Node API Template

## Controller

About controller patterns

```typescript
// typescript
router.post('/:id', authenticate(), async (req: Request, res: Response, next: NextFunction) => {
	// get request date
	const bodyData = res.body;
	const paramData = res.params;
	const queryData = res.query;

	// apply service response to response object
	res.locals.serviceResponse = await MyService.function('Add data args here');
	next();
});
```

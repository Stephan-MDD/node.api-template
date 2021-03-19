// reference: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes

enum HttpCodes {
	// success codes
	Accepted = 200,
	Created = 201,
	NoContent = 204,

	// redirection codes

	// client error codes
	BadRequest = 400,
	Unauthorized = 401,
	Forbidden = 403,
	NotFound = 404,
	Conflict = 409,

	// server error codes
	InternalServerError = 500,
}

export default HttpCodes;

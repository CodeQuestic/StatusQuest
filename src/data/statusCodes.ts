export type StatusCode = {
  code: number;
  message: string;
  description: string;
};

export const statusCodes: StatusCode[] = [
  {
    code: 200,
    message: "OK",
    description: "The request has succeeded.",
  },
  {
    code: 201,
    message: "Created",
    description:
      "The request has succeeded and a new resource has been created as a result.",
  },
  {
    code: 204,
    message: "No Content",
    description:
      "The server successfully processed the request but is not returning any content.",
  },
  {
    code: 400,
    message: "Bad Request",
    description:
      "The server could not understand the request due to invalid syntax.",
  },
  {
    code: 401,
    message: "Unauthorized",
    description: "Authentication is required to access the resource.",
  },
  {
    code: 403,
    message: "Forbidden",
    description: "You do not have permission to access this resource.",
  },
  {
    code: 404,
    message: "Not Found",
    description: "The requested resource could not be found on this server.",
  },
  {
    code: 500,
    message: "Internal Server Error",
    description: "The server encountered an unexpected condition.",
  },
  {
    code: 502,
    message: "Bad Gateway",
    description:
      "The server received an invalid response from the upstream server.",
  },
  {
    code: 503,
    message: "Service Unavailable",
    description: "The server is currently unavailable (overloaded or down).",
  },
];

export type StatusCodeCategory =
  | "Informational"
  | "Success"
  | "Redirection"
  | "Client Error"
  | "Server Error";

export interface StatusCodeEntry {
  code: number;
  title: string;
  description: string;
  category: StatusCodeCategory;
  color: string;
  emoji: string;
  example: string;
  mock: {
    method: "GET" | "POST" | "PUT" | "DELETE";
    url: string;
    response: Record<string, any>;
    status: number;
  };
  tip: string;
}

export interface StatusCodeGroup {
  series: string;
  title: string;
  description: string;
  codes: StatusCodeEntry[];
}

export const statusCodeGroups: StatusCodeGroup[] = [
  {
    series: "2xx",
    title: "Success",
    description:
      "Indicates that the request was successfully received, understood, and accepted.",
    codes: [
      {
        code: 200,
        title: "OK",
        description:
          "The request has succeeded. The information returned with the response depends on the method used in the request.",
        category: "Success",
        color: "#22c55e",
        emoji: "✅",
        example: "GET /users returns a list of users.",
        mock: {
          method: "GET",
          url: "/api/users",
          response: {
            status: 200,
            data: [
              { id: 1, name: "Alice" },
              { id: 2, name: "Bob" },
            ],
          },
          status: 200,
        },
        tip: "Most common response. If you see this, everything worked as expected.",
      },
      {
        code: 201,
        title: "Created",
        description:
          "The request has been fulfilled and resulted in a new resource being created.",
        category: "Success",
        color: "#22c55e",
        emoji: "🆕",
        example: "POST /users creates a new user.",
        mock: {
          method: "POST",
          url: "/api/users",
          response: {
            status: 201,
            message: "User created successfully",
            user: { id: 3, name: "Charlie" },
          },
          status: 201,
        },
        tip: "Returned when a new resource is created successfully, like when registering a user.",
      },
    ],
  },
  {
    series: "4xx",
    title: "Client Error",
    description:
      "Indicates that the request contains bad syntax or cannot be fulfilled.",
    codes: [
      {
        code: 400,
        title: "Bad Request",
        description:
          "The server cannot or will not process the request due to something that is perceived to be a client error.",
        category: "Client Error",
        color: "#facc15",
        emoji: "⚠️",
        example: "POST /login with missing fields results in 400.",
        mock: {
          method: "POST",
          url: "/api/login",
          response: {
            status: 400,
            error: "Username or password missing.",
          },
          status: 400,
        },
        tip: "Check your request payload. This usually means you sent invalid or incomplete data.",
      },
      {
        code: 401,
        title: "Unauthorized",
        description:
          "The request requires user authentication. The response must include a WWW-Authenticate header field.",
        category: "Client Error",
        color: "#facc15",
        emoji: "🔐",
        example: "GET /dashboard without token returns 401.",
        mock: {
          method: "GET",
          url: "/api/dashboard",
          response: {
            status: 401,
            error: "Unauthorized access. Please login.",
          },
          status: 401,
        },
        tip: "Authentication failed. Did you forget to include the token or session?",
      },
      {
        code: 404,
        title: "Not Found",
        description:
          "The server has not found anything matching the Request-URI.",
        category: "Client Error",
        color: "#facc15",
        emoji: "🔍",
        example: "GET /profile/1234 when the user doesn’t exist.",
        mock: {
          method: "GET",
          url: "/api/profile/1234",
          response: {
            status: 404,
            error: "User not found.",
          },
          status: 404,
        },
        tip: "Resource not found. Check your URL or ID values.",
      },
    ],
  },
  {
    series: "5xx",
    title: "Server Error",
    description: "Indicates that the server failed to fulfill a valid request.",
    codes: [
      {
        code: 500,
        title: "Internal Server Error",
        description:
          "The server encountered an unexpected condition which prevented it from fulfilling the request.",
        category: "Server Error",
        color: "#ef4444",
        emoji: "💥",
        example: "GET /users when the DB connection is down.",
        mock: {
          method: "GET",
          url: "/api/users",
          response: {
            status: 500,
            error: "Internal server error. Please try again later.",
          },
          status: 500,
        },
        tip: "Something went wrong on the server. This isn’t your fault.",
      },
      {
        code: 503,
        title: "Service Unavailable",
        description:
          "The server is currently unable to handle the request due to a temporary overloading or maintenance.",
        category: "Server Error",
        color: "#ef4444",
        emoji: "⏳",
        example: "GET /status during server maintenance.",
        mock: {
          method: "GET",
          url: "/api/status",
          response: {
            status: 503,
            error: "Service is down for maintenance. Try again soon.",
          },
          status: 503,
        },
        tip: "Try again later. Useful to show maintenance pages or fallback UIs.",
      },
    ],
  },
];

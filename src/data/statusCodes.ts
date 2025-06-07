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
    headers?: Record<string, string>;
    body?: Record<string, any>;
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
    series: "1xx",
    title: "Informational",
    description:
      "Indicates that the request has been received and the process is continuing.",
    codes: [
      {
        code: 100,
        title: "Continue",
        description:
          "This interim response indicates that the client should continue the request or ignore the response if the request is already finished.",
        category: "Informational",
        color: "#38bdf8",
        emoji: "🔄",
        example:
          "Client sends headers, server replies with 100 Continue to allow sending body.",
        mock: {
          method: "POST",
          url: "/api/upload",
          body: {
            fileMetadata: {
              name: "report.pdf",
              size: "2MB",
            },
          },
          response: {
            status: 100,
            message: "Continue with the request body",
          },
          status: 100,
        },
        tip: "Used when a request is large and the client is waiting for confirmation to continue.",
      },
      {
        code: 101,
        title: "Switching Protocols",
        description:
          "This code is sent in response to an Upgrade request header from the client and indicates the protocol the server is switching to.",
        category: "Informational",
        color: "#38bdf8",
        emoji: "🔀",
        example: "Client requests to upgrade from HTTP/1.1 to WebSocket.",
        mock: {
          method: "GET",
          url: "/api/socket",
          response: {
            status: 101,
            upgrade: "websocket",
            message: "Switching protocols to WebSocket",
          },
          status: 101,
        },
        tip: "Used to switch protocols like HTTP to WebSocket when requested by the client.",
      },
      {
        code: 102,
        title: "Processing (Deprecated)",
        description:
          "This code was used in WebDAV contexts to indicate that a request has been received by the server, but no status was available at the time of the response.",
        category: "Informational",
        color: "#38bdf8",
        emoji: "🌀",
        example: "PROPFIND request in WebDAV returns 102 while processing.",
        mock: {
          method: "GET",
          url: "/api/webdav/process",
          response: {
            status: 102,
            message: "Processing request, no final status yet.",
          },
          status: 102,
        },
        tip: "Rarely used. Indicates that processing is ongoing, especially for WebDAV operations.",
      },
      {
        code: 103,
        title: "Early Hints",
        description:
          "This status code is primarily intended to be used with the Link header, letting the user agent start preloading resources while the server prepares a response.",
        category: "Informational",
        color: "#38bdf8",
        emoji: "⏩",
        example:
          "Server sends 103 with Link headers before full HTML response.",
        mock: {
          method: "GET",
          url: "/api/home",
          response: {
            status: 103,
            links: [
              "</styles.css>; rel=preload; as=style",
              "</app.js>; rel=preload; as=script",
            ],
            message: "Early hints provided.",
          },
          status: 103,
        },
        tip: "Helps browsers preload resources before full response is ready.",
      },
    ],
  },
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
          "The request succeeded. The result depends on the HTTP method (GET, POST, PUT, etc.).",
        category: "Success",
        color: "#22c55e",
        emoji: "✅",
        example: "GET /api/users returns a list of users.",
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
        tip: "The most common status. Everything worked as expected.",
      },
      {
        code: 201,
        title: "Created",
        description:
          "The request succeeded, and a new resource was created as a result.",
        category: "Success",
        color: "#22c55e",
        emoji: "🆕",
        example: "POST /api/users creates a new user.",
        mock: {
          method: "POST",
          url: "/api/users",
          body: { name: "Charlie" },
          response: {
            status: 201,
            message: "User created successfully",
            user: { id: 3, name: "Charlie" },
          },
          status: 201,
        },
        tip: "Indicates successful creation. Usually follows a POST request.",
      },
      {
        code: 202,
        title: "Accepted",
        description:
          "The request has been received but not yet acted upon. It may be processed asynchronously.",
        category: "Success",
        color: "#22c55e",
        emoji: "📬",
        example: "POST /api/process starts a batch job and returns 202.",
        mock: {
          method: "POST",
          url: "/api/process",
          body: { jobType: "report" },
          response: {
            status: 202,
            message: "Request accepted and is being processed.",
          },
          status: 202,
        },
        tip: "Used when processing happens asynchronously or by another service.",
      },
      {
        code: 203,
        title: "Non-Authoritative Information",
        description:
          "Returned metadata may not be from the origin server but a local or third-party copy.",
        category: "Success",
        color: "#22c55e",
        emoji: "ℹ️",
        example: "GET /api/backup fetches data from a mirrored server.",
        mock: {
          method: "GET",
          url: "/api/backup",
          response: {
            status: 203,
            data: { message: "Data from mirror server" },
          },
          status: 203,
        },
        tip: "Content is returned from a third-party cache or mirror.",
      },
      {
        code: 204,
        title: "No Content",
        description:
          "The server successfully processed the request, but there is no content to send in the response.",
        category: "Success",
        color: "#22c55e",
        emoji: "📭",
        example:
          "DELETE /api/user/5 successfully deletes a user with no response body.",
        mock: {
          method: "DELETE",
          url: "/api/user/5",
          response: {},
          status: 204,
        },
        tip: "Useful for DELETE requests. No body returned but operation succeeded.",
      },
      {
        code: 205,
        title: "Reset Content",
        description:
          "Tells the user agent to reset the document which sent this request.",
        category: "Success",
        color: "#22c55e",
        emoji: "🔄",
        example: "POST /api/clear-form returns 205 to reset a form UI.",
        mock: {
          method: "POST",
          url: "/api/clear-form",
          body: {},
          response: {},
          status: 205,
        },
        tip: "Used in UIs to signal the client to reset the form or page state.",
      },
      {
        code: 206,
        title: "Partial Content",
        description:
          "Used when the server is delivering only part of the resource due to a range header sent by the client.",
        category: "Success",
        color: "#22c55e",
        emoji: "📦",
        example:
          "GET /api/video.mp4 with range header returns a part of the video.",
        mock: {
          method: "GET",
          url: "/api/video.mp4",
          response: {
            status: 206,
            content: "<partial binary content>",
          },
          status: 206,
        },
        tip: "Common in video streaming and range-based downloads.",
      },
      {
        code: 207,
        title: "Multi-Status",
        description:
          "Used in WebDAV to convey status for multiple independent operations.",
        category: "Success",
        color: "#22c55e",
        emoji: "📚",
        example: "PROPFIND /webdav/documents returns multiple file statuses.",
        mock: {
          method: "GET",
          url: "/webdav/documents",
          response: {
            status: 207,
            responses: [
              { href: "/file1.txt", status: 200 },
              { href: "/file2.txt", status: 404 },
            ],
          },
          status: 207,
        },
        tip: "Provides status for multiple related operations, used in WebDAV.",
      },
      {
        code: 208,
        title: "Already Reported",
        description:
          "Used inside WebDAV <propstat> elements to avoid repeating information about internal bindings.",
        category: "Success",
        color: "#22c55e",
        emoji: "🔁",
        example: "PROPFIND /webdav/shared returns 208 to avoid duplication.",
        mock: {
          method: "GET",
          url: "/webdav/shared",
          response: {
            status: 208,
            message: "Already reported in previous response block",
          },
          status: 208,
        },
        tip: "Avoids duplication in WebDAV multi-binding responses.",
      },
      {
        code: 226,
        title: "IM Used",
        description:
          "Server fulfilled a GET request with a response that represents the result of instance manipulations.",
        category: "Success",
        color: "#22c55e",
        emoji: "🧪",
        example: "GET /api/data with delta encoding returns transformed data.",
        mock: {
          method: "GET",
          url: "/api/data",
          response: {
            status: 226,
            transformed: true,
            data: { id: 1, name: "Updated Alice" },
          },
          status: 226,
        },
        tip: "Used when the response contains transformed content (e.g., delta encoding).",
      },
    ],
  },
  {
    series: "3xx",
    title: "Redirection",
    description:
      "Indicates that further action needs to be taken by the user agent to fulfill the request.",
    codes: [
      {
        code: 300,
        title: "Multiple Choices",
        description:
          "The request has more than one possible response. User or user agent should select one of them.",
        category: "Redirection",
        color: "#f97316",
        emoji: "🔀",
        example: "GET /video returns multiple video format options.",
        mock: {
          method: "GET",
          url: "/api/video",
          response: {
            status: 300,
            choices: [
              { format: "mp4", url: "/video.mp4" },
              { format: "webm", url: "/video.webm" },
            ],
          },
          status: 300,
        },
        tip: "The client should choose one of the available options. Rarely used in practice.",
      },
      {
        code: 301,
        title: "Moved Permanently",
        description:
          "The URL of the requested resource has been permanently changed.",
        category: "Redirection",
        color: "#f97316",
        emoji: "📌",
        example: "GET /old-page redirects to /new-page permanently.",
        mock: {
          method: "GET",
          url: "/api/old-page",
          response: {
            status: 301,
            location: "/api/new-page",
          },
          status: 301,
        },
        tip: "Use the new URL in future requests. Search engines update their links to the new one.",
      },
      {
        code: 302,
        title: "Found",
        description:
          "The requested resource resides temporarily under a different URI.",
        category: "Redirection",
        color: "#f97316",
        emoji: "🚚",
        example: "GET /temporary-redirect redirects to a temporary page.",
        mock: {
          method: "GET",
          url: "/api/temporary-redirect",
          response: {
            status: 302,
            location: "/api/temp-page",
          },
          status: 302,
        },
        tip: "Temporary redirect. Use original URI for future requests.",
      },
      {
        code: 303,
        title: "See Other",
        description:
          "The response to the request can be found under another URI using a GET method.",
        category: "Redirection",
        color: "#f97316",
        emoji: "🔁",
        example: "POST /submit returns a redirect to /status using 303.",
        mock: {
          method: "POST",
          url: "/api/submit",
          body: { task: "upload" },
          response: {
            status: 303,
            location: "/api/status",
          },
          status: 303,
        },
        tip: "Redirect using GET. Common after form submission or actions.",
      },
      {
        code: 304,
        title: "Not Modified",
        description:
          "Indicates that the resource has not been modified since the last request.",
        category: "Redirection",
        color: "#f97316",
        emoji: "🗂️",
        example: "GET /profile with If-Modified-Since header returns 304.",
        mock: {
          method: "GET",
          url: "/api/profile",
          response: {
            status: 304,
          },
          status: 304,
        },
        tip: "Used for caching. Saves bandwidth by reusing local cache.",
      },
      {
        code: 305,
        title: "Use Proxy",
        description:
          "Defined in a previous specification to indicate that a requested response must be accessed by a proxy. Deprecated due to security concerns.",
        category: "Redirection",
        color: "#f97316",
        emoji: "🛡️",
        example: "GET /secure-area requires access via proxy.",
        mock: {
          method: "GET",
          url: "/api/secure-area",
          response: {
            status: 305,
            proxy: "http://proxy.example.com",
          },
          status: 305,
        },
        tip: "Deprecated. Avoid using this code in new applications.",
      },
      {
        code: 306,
        title: "Unused",
        description: "This response code is no longer used, but is reserved.",
        category: "Redirection",
        color: "#f97316",
        emoji: "🚫",
        example: "GET /legacy-feature returns 306.",
        mock: {
          method: "GET",
          url: "/api/legacy-feature",
          response: {
            status: 306,
            message: "This status code is reserved and not used.",
          },
          status: 306,
        },
        tip: "Reserved for future use. Not actively used today.",
      },
      {
        code: 307,
        title: "Temporary Redirect",
        description:
          "Redirects to a different URI, but must use the same HTTP method as the original request.",
        category: "Redirection",
        color: "#f97316",
        emoji: "🔄",
        example: "POST /submit temporarily redirects to /review.",
        mock: {
          method: "POST",
          url: "/api/submit",
          body: { name: "Sam" },
          response: {
            status: 307,
            location: "/api/review",
          },
          status: 307,
        },
        tip: "Same method is retained (e.g., POST stays POST) in redirection.",
      },
      {
        code: 308,
        title: "Permanent Redirect",
        description:
          "Similar to 301, but the method and body are preserved across the redirect.",
        category: "Redirection",
        color: "#f97316",
        emoji: "📍",
        example: "POST /upload permanently redirects to /upload-new.",
        mock: {
          method: "POST",
          url: "/api/upload",
          body: { file: "image.jpg" },
          response: {
            status: 308,
            location: "/api/upload-new",
          },
          status: 308,
        },
        tip: "Use when both the URL and method should be preserved permanently.",
      },
    ],
  },
  {
    series: "4xx",
    title: "Client Error",
    description:
      "The client seems to have erred. The request contains bad syntax or cannot be fulfilled.",
    codes: [
      {
        code: 400,
        title: "Bad Request",
        description:
          "The server cannot or will not process the request due to client error.",
        category: "Client Error",
        color: "#eab308",
        emoji: "❌",
        example: "POST /api/data with invalid data.",
        mock: {
          method: "POST",
          url: "/api/data",
          body: { user: "" },
          response: {
            status: 400,
            message: "Bad Request: User data is required",
          },
          status: 400,
        },
        tip: "Check request syntax and parameters. Ensure all required fields are provided.",
      },
      {
        code: 401,
        title: "Unauthorized",
        description:
          'Client must authenticate to get the requested response. "Unauthorized" means unauthenticated.',
        category: "Client Error",
        color: "#eab308",
        emoji: "🔐",
        example: "GET /api/profile without valid token.",
        mock: {
          method: "GET",
          url: "/api/profile",
          response: {
            status: 401,
            message: "Unauthorized: authentication required",
          },
          status: 401,
        },
        tip: "Provide valid authentication credentials.",
      },
      {
        code: 402,
        title: "Payment Required",
        description: "Reserved for digital payment systems; rarely used.",
        category: "Client Error",
        color: "#eab308",
        emoji: "💰",
        example: "Access to premium feature requires payment.",
        mock: {
          method: "GET",
          url: "/api/premium",
          response: {
            status: 402,
            message: "Payment Required",
          },
          status: 402,
        },
        tip: "Implement payment workflow if needed.",
      },
      {
        code: 403,
        title: "Forbidden",
        description:
          "Client authenticated but does not have access rights to the content.",
        category: "Client Error",
        color: "#eab308",
        emoji: "🚫",
        example: "GET /admin by non-admin user.",
        mock: {
          method: "GET",
          url: "/api/admin",
          response: {
            status: 403,
            message: "Forbidden: access denied",
          },
          status: 403,
        },
        tip: "Check user permissions and roles.",
      },
      {
        code: 404,
        title: "Not Found",
        description: "Requested resource could not be found on the server.",
        category: "Client Error",
        color: "#eab308",
        emoji: "❓",
        example: "GET /api/unknown-endpoint.",
        mock: {
          method: "GET",
          url: "/api/unknown-endpoint",
          response: {
            status: 404,
            message: "Not Found",
          },
          status: 404,
        },
        tip: "Verify the URL or resource existence.",
      },
      {
        code: 405,
        title: "Method Not Allowed",
        description: "Request method is not supported by the target resource.",
        category: "Client Error",
        color: "#eab308",
        emoji: "🚫",
        example: "DELETE /api/users when DELETE not supported.",
        mock: {
          method: "DELETE",
          url: "/api/users",
          response: {
            status: 405,
            message: "Method Not Allowed",
          },
          status: 405,
        },
        tip: "Use allowed HTTP methods only.",
      },
      {
        code: 406,
        title: "Not Acceptable",
        description:
          "Server cannot produce a response matching the list of acceptable values sent by the client.",
        category: "Client Error",
        color: "#eab308",
        emoji: "⚠️",
        example: "Client requests unsupported content-type.",
        mock: {
          method: "GET",
          url: "/api/data",
          headers: { Accept: "application/xml" },
          response: {
            status: 406,
            message: "Not Acceptable",
          },
          status: 406,
        },
        tip: "Check Accept headers for supported content types.",
      },
      {
        code: 407,
        title: "Proxy Authentication Required",
        description: "Client must authenticate itself with the proxy.",
        category: "Client Error",
        color: "#eab308",
        emoji: "🛡️",
        example: "Access via proxy requires authentication.",
        mock: {
          method: "GET",
          url: "/api/proxy-resource",
          response: {
            status: 407,
            message: "Proxy Authentication Required",
          },
          status: 407,
        },
        tip: "Authenticate with proxy server.",
      },
      {
        code: 408,
        title: "Request Timeout",
        description: "Server timed out waiting for the request.",
        category: "Client Error",
        color: "#eab308",
        emoji: "⌛",
        example: "Idle connection timed out by server.",
        mock: {
          method: "GET",
          url: "/api/slow-endpoint",
          response: {
            status: 408,
            message: "Request Timeout",
          },
          status: 408,
        },
        tip: "Retry the request after ensuring connectivity.",
      },
      {
        code: 409,
        title: "Conflict",
        description: "Request conflicts with the current state of the server.",
        category: "Client Error",
        color: "#eab308",
        emoji: "⚔️",
        example: "PUT /api/resource when resource has changed.",
        mock: {
          method: "PUT",
          url: "/api/resource",
          response: {
            status: 409,
            message: "Conflict: resource state mismatch",
          },
          status: 409,
        },
        tip: "Resolve conflicts before retrying.",
      },
      {
        code: 410,
        title: "Gone",
        description:
          "Requested resource is permanently deleted and no forwarding address is known.",
        category: "Client Error",
        color: "#eab308",
        emoji: "🗑️",
        example: "GET /api/deprecated-resource.",
        mock: {
          method: "GET",
          url: "/api/deprecated-resource",
          response: {
            status: 410,
            message: "Gone: resource no longer available",
          },
          status: 410,
        },
        tip: "Remove cached links to the resource.",
      },
      {
        code: 411,
        title: "Length Required",
        description:
          "Request rejected because Content-Length header is missing.",
        category: "Client Error",
        color: "#eab308",
        emoji: "📏",
        example: "POST /api/upload without Content-Length header.",
        mock: {
          method: "POST",
          url: "/api/upload",
          response: {
            status: 411,
            message: "Length Required",
          },
          status: 411,
        },
        tip: "Include Content-Length header in request.",
      },
      {
        code: 412,
        title: "Precondition Failed",
        description:
          "Precondition given in request headers evaluated to false by server.",
        category: "Client Error",
        color: "#eab308",
        emoji: "⚠️",
        example: "PUT with If-Match header failed.",
        mock: {
          method: "PUT",
          url: "/api/resource",
          response: {
            status: 412,
            message: "Precondition Failed",
          },
          status: 412,
        },
        tip: "Verify preconditions before sending request.",
      },
      {
        code: 413,
        title: "Content Too Large",
        description: "Request entity is larger than limits defined by server.",
        category: "Client Error",
        color: "#eab308",
        emoji: "📦",
        example: "POST /api/upload with a large file.",
        mock: {
          method: "POST",
          url: "/api/upload",
          response: {
            status: 413,
            message: "Payload Too Large",
          },
          status: 413,
        },
        tip: "Reduce the size of the request payload.",
      },
      {
        code: 414,
        title: "URI Too Long",
        description:
          "The URI requested is longer than the server is willing to interpret.",
        category: "Client Error",
        color: "#eab308",
        emoji: "🔗",
        example: "GET /api/search?query=<very-long-string>",
        mock: {
          method: "GET",
          url: "/api/search?query=verylongstring...",
          response: {
            status: 414,
            message: "URI Too Long",
          },
          status: 414,
        },
        tip: "Use shorter URIs or POST data for large queries.",
      },
      {
        code: 415,
        title: "Unsupported Media Type",
        description:
          "The media format of the requested data is not supported by the server.",
        category: "Client Error",
        color: "#eab308",
        emoji: "📁",
        example: "POST /api/upload with unsupported media type.",
        mock: {
          method: "POST",
          url: "/api/upload",
          response: {
            status: 415,
            message: "Unsupported Media Type",
          },
          status: 415,
        },
        tip: "Check Content-Type header and use supported media types.",
      },
      {
        code: 416,
        title: "Range Not Satisfiable",
        description: "The range specified in the request cannot be fulfilled.",
        category: "Client Error",
        color: "#eab308",
        emoji: "📏",
        example: "GET /api/file with invalid Range header.",
        mock: {
          method: "GET",
          url: "/api/file",
          headers: { Range: "bytes=1000-2000" },
          response: {
            status: 416,
            message: "Range Not Satisfiable",
          },
          status: 416,
        },
        tip: "Verify Range headers are valid.",
      },
      {
        code: 417,
        title: "Expectation Failed",
        description:
          "The expectation given in the Expect request header could not be met by the server.",
        category: "Client Error",
        color: "#eab308",
        emoji: "🤔",
        example: "Expect: 100-continue header in request failed.",
        mock: {
          method: "POST",
          url: "/api/expect",
          headers: { Expect: "100-continue" },
          response: {
            status: 417,
            message: "Expectation Failed",
          },
          status: 417,
        },
        tip: "Adjust or remove Expect header.",
      },
      {
        code: 418,
        title: "I'm a teapot",
        description: "The server refuses to brew coffee with a teapot.",
        category: "Client Error",
        color: "#eab308",
        emoji: "☕",
        example: "GET /coffee attempted on teapot.",
        mock: {
          method: "GET",
          url: "/api/coffee",
          response: {
            status: 418,
            message: "I'm a teapot",
          },
          status: 418,
        },
        tip: "Easter egg status code.",
      },
      {
        code: 421,
        title: "Misdirected Request",
        description:
          "Request directed at a server that is not able to produce a response.",
        category: "Client Error",
        color: "#eab308",
        emoji: "🔀",
        example: "Request sent to wrong server in multi-server environment.",
        mock: {
          method: "GET",
          url: "/api/misdirected",
          response: {
            status: 421,
            message: "Misdirected Request",
          },
          status: 421,
        },
        tip: "Verify target server.",
      },
      {
        code: 422,
        title: "Unprocessable Content",
        description:
          "Request well-formed but semantic errors prevent processing (WebDAV).",
        category: "Client Error",
        color: "#eab308",
        emoji: "🚫",
        example: "PUT /api/resource with semantic errors.",
        mock: {
          method: "PUT",
          url: "/api/resource",
          response: {
            status: 422,
            message: "Unprocessable Entity",
          },
          status: 422,
        },
        tip: "Fix semantic errors in request payload.",
      },
      {
        code: 423,
        title: "Locked",
        description: "Resource is locked (WebDAV).",
        category: "Client Error",
        color: "#eab308",
        emoji: "🔒",
        example: "PUT /api/resource currently locked by another process.",
        mock: {
          method: "PUT",
          url: "/api/resource",
          response: {
            status: 423,
            message: "Locked",
          },
          status: 423,
        },
        tip: "Retry after lock is released.",
      },
      {
        code: 424,
        title: "Failed Dependency",
        description:
          "Request failed due to failure of a previous request (WebDAV).",
        category: "Client Error",
        color: "#eab308",
        emoji: "❗",
        example: "PUT /api/resource failed due to prior error.",
        mock: {
          method: "PUT",
          url: "/api/resource",
          response: {
            status: 424,
            message: "Failed Dependency",
          },
          status: 424,
        },
        tip: "Resolve previous errors first.",
      },
      {
        code: 425,
        title: "Too Early",
        description:
          "Server is unwilling to risk processing a request that might be replayed.",
        category: "Client Error",
        color: "#eab308",
        emoji: "⏳",
        example: "Early request before previous processing complete.",
        mock: {
          method: "POST",
          url: "/api/resource",
          response: {
            status: 425,
            message: "Too Early",
          },
          status: 425,
        },
        tip: "Retry later to avoid replay issues.",
      },
      {
        code: 426,
        title: "Upgrade Required",
        description:
          "Client should switch to a different protocol as requested by server.",
        category: "Client Error",
        color: "#eab308",
        emoji: "⬆️",
        example: "Server requires HTTPS instead of HTTP.",
        mock: {
          method: "GET",
          url: "/api/secure",
          response: {
            status: 426,
            message: "Upgrade Required",
            upgrade: "TLS/1.3",
          },
          status: 426,
        },
        tip: "Upgrade client protocol as indicated.",
      },
      {
        code: 428,
        title: "Precondition Required",
        description:
          "Origin server requires request to be conditional to prevent lost updates.",
        category: "Client Error",
        color: "#eab308",
        emoji: "⚠️",
        example: "PUT requires If-Match header.",
        mock: {
          method: "PUT",
          url: "/api/resource",
          response: {
            status: 428,
            message: "Precondition Required",
          },
          status: 428,
        },
        tip: "Add required precondition headers.",
      },
      {
        code: 429,
        title: "Too Many Requests",
        description:
          "User sent too many requests in a given time (rate limiting).",
        category: "Client Error",
        color: "#eab308",
        emoji: "🚦",
        example: "Client exceeds API rate limit.",
        mock: {
          method: "GET",
          url: "/api/limited",
          response: {
            status: 429,
            message: "Too Many Requests",
          },
          status: 429,
        },
        tip: "Slow down request rate or wait to retry.",
      },
      {
        code: 431,
        title: "Request Header Fields Too Large",
        description:
          "Server refuses to process request because headers are too large.",
        category: "Client Error",
        color: "#eab308",
        emoji: "📬",
        example: "Request with very large cookies or headers.",
        mock: {
          method: "GET",
          url: "/api/resource",
          response: {
            status: 431,
            message: "Request Header Fields Too Large",
          },
          status: 431,
        },
        tip: "Reduce header size and retry.",
      },
      {
        code: 451,
        title: "Unavailable For Legal Reasons",
        description:
          "Resource is unavailable due to legal reasons like censorship.",
        category: "Client Error",
        color: "#eab308",
        emoji: "⚖️",
        example: "Access blocked by government regulation.",
        mock: {
          method: "GET",
          url: "/api/censored",
          response: {
            status: 451,
            message: "Unavailable For Legal Reasons",
          },
          status: 451,
        },
        tip: "Check legal access restrictions.",
      },
    ],
  },
  {
    series: "5xx",
    title: "Server Error",
    description:
      "Indicates that the server failed to fulfill a valid request due to an error on the server side.",
    codes: [
      {
        code: 500,
        title: "Internal Server Error",
        description:
          "The server has encountered a situation it does not know how to handle. This error is generic, indicating that the server cannot find a more appropriate 5XX status code to respond with.",
        category: "Server Error",
        color: "#d9534f",
        emoji: "💥",
        example:
          "A server-side runtime error occurred that prevents fulfilling the request.",
        mock: {
          method: "GET",
          url: "/api/data",
          response: {
            status: 500,
            message: "Internal Server Error",
          },
          status: 500,
        },
        tip: "Generic server error. Often indicates a bug or unexpected condition on the server.",
      },
      {
        code: 501,
        title: "Not Implemented",
        description:
          "The request method is not supported by the server and cannot be handled. The only methods that servers are required to support (and therefore that must not return this code) are GET and HEAD.",
        category: "Server Error",
        color: "#d9534f",
        emoji: "🛠️",
        example:
          "Using a PATCH method on a server that only supports GET and POST.",
        mock: {
          method: "POST",
          url: "/api/feature",
          response: {
            status: 501,
            message: "Not Implemented",
          },
          status: 501,
        },
        tip: "Indicates the server does not support the functionality required to fulfill the request.",
      },
      {
        code: 502,
        title: "Bad Gateway",
        description:
          "This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response.",
        category: "Server Error",
        color: "#d9534f",
        emoji: "🚧",
        example:
          "A reverse proxy server received an invalid response from an upstream server.",
        mock: {
          method: "GET",
          url: "/api/proxy",
          response: {
            status: 502,
            message: "Bad Gateway",
          },
          status: 502,
        },
        tip: "Common in setups where a proxy or gateway fails to receive a valid response from an upstream server.",
      },
      {
        code: 503,
        title: "Service Unavailable",
        description:
          "The server is temporarily unavailable, often due to maintenance or overload. A user-friendly message should accompany this response. The Retry-After header indicates when the service will be available again. Caching should generally be disabled for this response.",
        category: "Server Error",
        color: "#dc2626",
        emoji: "🛠️",
        example:
          "Server down for maintenance, clients should retry after some time.",
        mock: {
          method: "GET",
          url: "/api/maintenance",
          headers: {
            "Retry-After": "120", // seconds until retry
            "Cache-Control": "no-cache",
          },
          response: {
            status: 503,
            message: "Service Unavailable. Please try again later.",
          },
          status: 503,
        },
        tip: "Use Retry-After header to tell clients when to try again.",
      },
      {
        code: 504,
        title: "Gateway Timeout",
        description:
          "This error response is given when the server is acting as a gateway and cannot get a response in time.",
        category: "Server Error",
        color: "#d9534f",
        emoji: "⏱️",
        example:
          "A gateway or proxy server timed out waiting for a response from an upstream server.",
        mock: {
          method: "GET",
          url: "/api/proxy",
          response: {
            status: 504,
            message: "Gateway Timeout",
          },
          status: 504,
        },
        tip: "Timeout between a proxy or gateway and an upstream server.",
      },
      {
        code: 505,
        title: "HTTP Version Not Supported",
        description:
          "The HTTP version used in the request is not supported by the server.",
        category: "Server Error",
        color: "#d9534f",
        emoji: "📡",
        example:
          "Client sends a request with HTTP/1.0 but server only supports HTTP/1.1 or above.",
        mock: {
          method: "GET",
          url: "/api/version",
          response: {
            status: 505,
            message: "HTTP Version Not Supported",
          },
          status: 505,
        },
        tip: "Server refuses to support the HTTP protocol version used in the request.",
      },
      {
        code: 506,
        title: "Variant Also Negotiates",
        description:
          "The server has an internal configuration error: during content negotiation, the chosen variant is configured to engage in content negotiation itself, causing circular references.",
        category: "Server Error",
        color: "#d9534f",
        emoji: "🔄",
        example:
          "Misconfigured server content negotiation causing infinite loops.",
        mock: {
          method: "GET",
          url: "/api/content",
          response: {
            status: 506,
            message: "Variant Also Negotiates",
          },
          status: 506,
        },
        tip: "Rare error caused by server misconfiguration during content negotiation.",
      },
      {
        code: 507,
        title: "Insufficient Storage (WebDAV)",
        description:
          "The method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request.",
        category: "Server Error",
        color: "#d9534f",
        emoji: "📦",
        example: "Server disk space exhausted during a file upload.",
        mock: {
          method: "PUT",
          url: "/api/upload",
          response: {
            status: 507,
            message: "Insufficient Storage",
          },
          status: 507,
        },
        tip: "Occurs when server storage limits are exceeded.",
      },
      {
        code: 508,
        title: "Loop Detected (WebDAV)",
        description:
          "The server detected an infinite loop while processing the request.",
        category: "Server Error",
        color: "#d9534f",
        emoji: "🔁",
        example:
          "A server-side loop in resource handling, causing request failure.",
        mock: {
          method: "GET",
          url: "/api/loop",
          response: {
            status: 508,
            message: "Loop Detected",
          },
          status: 508,
        },
        tip: "Indicates infinite processing loops detected by the server.",
      },
      {
        code: 510,
        title: "Not Extended",
        description:
          "The client request declares an HTTP Extension that should be used to process the request, but the extension is not supported by the server.",
        category: "Server Error",
        color: "#d9534f",
        emoji: "🚫",
        example:
          "Client requests features through an unsupported HTTP extension header.",
        mock: {
          method: "GET",
          url: "/api/extension",
          response: {
            status: 510,
            message: "Not Extended",
          },
          status: 510,
        },
        tip: "Used when the server refuses unsupported HTTP extensions.",
      },
      {
        code: 511,
        title: "Network Authentication Required",
        description:
          "Indicates that the client needs to authenticate to gain network access.",
        category: "Server Error",
        color: "#d9534f",
        emoji: "🔐",
        example:
          "A captive portal requires login before granting network access.",
        mock: {
          method: "GET",
          url: "/api/network-auth",
          response: {
            status: 511,
            message: "Network Authentication Required",
          },
          status: 511,
        },
        tip: "Requires network-level authentication before accessing resources.",
      },
    ],
  },
];

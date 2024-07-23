// API route to lock the site behind basic auth
export async function GET() {
  return new Response("Auth required", {
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
    status: 401,
  });
}

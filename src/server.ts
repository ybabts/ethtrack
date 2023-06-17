import { getEthereumPrice } from "./ethereum.ts";

const server = Deno.listen({ port: 8080 });

for await (const requestEvent of server) {
  serveHTTP(requestEvent);
}

async function serveHTTP(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);
  for await (const requestEvent of httpConn) {
    const url = new URL(requestEvent.request.url);
    if (url.pathname === "/") {
      const ethereumPrice = await getEthereumPrice();

      requestEvent.respondWith(
        new Response(JSON.stringify(ethereumPrice), {
          headers: { "content-type": "text/html" },
        }),
      );
    } else {
      requestEvent.respondWith(
        new Response(JSON.stringify({ error: "Not found" }), {
          status: 404,
          headers: { "content-type": "application/json" },
        }),
      );
    }
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const headers = {
      "Access-Control-Allow-Origin": "*", // Allow all origins
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    // Handle CORS preflight requests
    if (request.method === "OPTIONS") { return new Response(null, { headers }); }

    // Store config (POST request)
    if (request.method === "POST") {
      const data = await request.text();
      const encodedData = btoa(encodeURIComponent(data));
      const id = Math.random().toString(36).substring(2, 10);
      await env.CONFIG_STORE.put(id, encodedData, { expirationTtl: 604800 }); // Store for 1 week
      return new Response(id, { status: 200, headers });
    }

    // Retrieve config (GET request)
    if (url.pathname.startsWith("/get/")) {
      const { 1: code } = url.pathname.split("/get/");
      const storedData = await env.CONFIG_STORE.get(code);
      if (!storedData) return new Response("Not found", { status: 404, headers });
      const decodedData = decodeURIComponent(atob(storedData));
      return new Response(decodedData, {
        status: 200,
        headers: { ...headers, "Content-Type": "text/plain" }
      });
    }

    return new Response("Invalid request", { status: 400, headers });
  }
};

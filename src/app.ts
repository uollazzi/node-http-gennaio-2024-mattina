import { createServer, IncomingMessage, ServerResponse } from "node:http";
import url from "node:url";
import { readFileSync } from "node:fs";

const port = 3000;
const host = "localhost";

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
    const u = url.parse(req.url!, true);
    console.log("Richiesta:", req.method, req.url, new Date().toLocaleString());

    const nome = u.query.nome as string;

    switch (u.pathname) {
        case "/":
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write("<html><head><title>Ciao!</title></head><body><h1>Ciao [[nome]]!</h1></body></html>".replace("[[nome]]", nome ?? "a tutti"));
            res.end();
            break;
        case "/welcome":
            res.writeHead(200, { "Content-Type": "text/html" });
            let html = readFileSync("./templates/welcome.html", "utf8");
            res.write(html.replace("{{name}}", nome ?? "a tutti"));
            res.end();
            break;
        default:
            break;
    }
}

// creazione e avvio del server
const server = createServer(requestListener);
server.listen(port, host, () => console.log(`Server in ascolto su http://${host}:${port}`));
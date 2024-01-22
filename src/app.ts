import { createServer, IncomingMessage, ServerResponse } from "node:http";
import url from "node:url";
import { readFileSync } from "node:fs";

const port = 3000;
const host = "localhost";

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
    console.log("Richiesta:", req.method, req.url, new Date().toLocaleString());

    try {
        const u = url.parse(req.url!, true);
        const nome = u.query.nome as string;

        switch (u.pathname) {
            case "/":
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write("<html><head><title>Ciao!</title></head><body><h1>Ciao [[nome]]!</h1></body></html>".replace("[[nome]]", nome ?? "a tutti"));
                res.end();
                break;
            case "/welcome":
                let html = readFileSync("./templates/welcome.html", "utf8");
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write(html.replace("{{name}}", nome ?? "a tutti"));
                res.end();
                break;
            case "/api/v2/mario":
                const mario = {
                    nome: "Mario",
                    cognome: "Rossi"
                }

                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(mario));
                break;
            default:
                res.writeHead(404);
                res.end("Pagina non trovata");
                break;
        }
    }
    catch (error) {
        console.error(error);
        res.writeHead(500);
        res.end("Errore del server. Contattare l'amministratore di sistema.");
    }
}

// creazione e avvio del server
const server = createServer(requestListener);
server.listen(port, host, () => console.log(`Server in ascolto su http://${host}:${port}`));
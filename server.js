const http = require('http');
const fs = require('fs');
const {pipeline} = require('stream')
const {promisify} = require('util')

const stat = promisify(fs.stat)

const mime = require('mime-types');
const urlToPath = require('file-uri-to-path')
const {extname} = require('path');

const hostname = '192.168.0.40';
const port = 25565;

const Kuro = require("./Kuro.js")
const kuroAPI = require("./kuroAPI.js");

const server = http.createServer(async (req, res) => {
    try {
    let url = `./www${req.url}`;
    const extension = extname(req.url);
    console.log(`[${req.socket.remoteAddress}] ${req.method} request for ${url}`);

    if (req.url.startsWith("/Kuro")) return await Kuro.run(req, res).catch(e => {res.statusCode = 500; return res.end();})

    // Enable to block other IPs that aren't mine
    // if (req.socket.remoteAddress != "86.21.100.252" && extension != ".css") {
    //     res.setHeader("Content-Type", "text/html")
    //     res.statusCode = 403;
    //     return fs.createReadStream("./www/403.html").pipe(res);
    // }

    if (!fs.existsSync(url)) {
        // If CSS file isn't found just use default
        if (extension == ".css") url = `./www/style.css`

        // Check for video requests and attempt to fulfil by looking on server
        // else if (extension == ".mp4") url = urlToPath(`file://X:${req.url}`).slice(2)
        else {
            res.setHeader("Content-Type", "text/html")
            res.statusCode = 404;
            return fs.createReadStream("./www/404.html").pipe(res);
        }
    }

    // deny requests that aren't GET and check for index.html when no file extension specified
    if (req.method != 'GET' || !extension) {
        let index = `./www${req.url}index.html`
        if (fs.existsSync(index)) url = index
        else {
            res.setHeader("Content-Type", "text/html")
            res.statusCode = 403;
            fs.createReadStream(`./www/403.html`).pipe(res)
            return;
        }
    }

    if (extension == ".mp4") {
        // Video Stream Handler
        const {size} = await stat(url)

        if (req.headers.range) { // If range exists in the request..
            // Extract start and end value from range header using regex:
            let [start, end] = req.headers.range.replace(/bytes=/, "").split("-");
            start = parseInt(start)  // parseInt() converts a string to integer
            end = end ? parseInt(end) : size - 1; // If no end, assume it is the end of the file
        
            console.log(`${start}-${end} ->>>> range: ${req.headers.range} ->>>>>> size: ${size}`)

            if (!isNaN(start) && isNaN(end)) {
                start = start;
                end = size - 1;
            }
            if (isNaN(start) && !isNaN(end)) {
                start = size - end;
                end = size - 1;
            }

            if (start >= size || end >= size) {
                // If range is not satisfiable, then return error code 416
                res.writeHead(416, {"Content-Range": `bytes */${size}`});
                return res.end()
            }

            // Otherwise, send the partial video content with HTTP code 206!
            res.writeHead(206, {
                "Content-Range": `bytes ${start}-${end}/${size}`,
                "Accept-Ranges": "bytes",
                "Content-Length": end - start + 1,
                "Content-Type": mime.lookup(url)
            })

            let readable = fs.createReadStream(url, {start: start, end: end});

            pipeline(readable, res, err => { console.log(err) })
        }
        else {
            // Write up HTML file to play video in
            let html = `<html><head></head><body><video controls autoplay name="media"><source src="Website/www/Videos/Shorts/${url.split("/").pop()}" type="video/mp4"></video></body></html>`
            res.writeHead(200, {"Content-Type": "text/html"})
            res.end(html)
        }
    }
    else {
        res.setHeader("Content-Type", mime.lookup(url))
        res.statusCode = 200;
        fs.createReadStream(url).pipe(res)
    }
    }
    catch (e) {
        console.log(e)
        res.statusCode = 500;
        res.end("uh, something went very wrong.\n"+e)
    }
});

server.listen(port, hostname, async () => {
    console.log(`Server running at http://${hostname}:${port}/`);

    console.log(await kuroAPI.transfer("97238312355364864", 150));
});
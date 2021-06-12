const fs = require("fs")
const JSONpath = "F:/Discord Bots (V12)/Kuro/JSON";

let userinfo = require(`${JSONpath}/userinfo.json`)


module.exports.run = async (req, res) => {
    if (req.method == "POST") {
        let body = "";
        console.log(req.headers)
        req.on('data', (chunk) => {
            body += chunk;
            // Terminate connection if more than 1MB of data is posted
            if (body.length > 1e6) req.connection.destroy();
        })

        req.on('end', () => {
            if (body) console.log(body)
            if (req.headers.request == "transfer") {
                userinfo = require(`${JSONpath}/userinfo.json`)
                let user = userinfo[req.headers.id],
                Exchi = userinfo["834152608058572861"],
                amount = req.headers.amount;
    
                // Check if user exists
                if (!user) {
                    res.statusCode = 404
                    return res.end()
                }
                // Check for incorrect password, bot user or Exchi not having enough to transfer
                else if (req.headers.token != "password that I'm not including in my CV for obvious reasons" || user.bot || Exchi.money < amount) {
                    res.statusCode = 403
                    return res.end()
                }

                if (typeof amount != "number") amount = parseInt(amount);
                // Make the transfer

                Exchi.money -= amount;
                user.money += amount;
                
                fs.writeFileSync(`${JSONpath}/userinfo.json`, JSON.stringify(userinfo, null, 4))
                res.statusCode = 200
                res.end()
                console.log(`Exchi transferred $${amount} to ${req.headers.id}`)
            }
        })
        return;
    }

    args = req.url.slice(1).split("/")

    if (!args[1]) return404(res);
    else if (args[1] == "users") {
        if (userinfo[args[2]]) {
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify(userinfo[args[2]]));
        }
        else return404(res);
    }
}

return404 = (res) => {
    res.setHeader("Content-Type", "text/html")
    res.statusCode = 404;
    return fs.createReadStream("./www/404.html").pipe(res);
}
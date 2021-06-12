const http = require(`http`)

// You'll want to change these if I ever change how the website is structured for whatever reason, most likely the port
const options = {
    hostname: `canis.dynu.com`,
    port: 25565,
    path: `/Kuro`
}

// Unique password that allows you to make your bot transfer to others - don't share with others unless you want them doing it too
const token = "password that I'm not including in my CV for obvious reasons"

module.exports = {
    /**
     * Fetch the userinfo for a Kuro user.
     * @param {string} id Discord User ID
     * 
     * @returns {Promise<object>} User data
     * @author Rubíx
     */
    getUser: async (id) => {
        return new Promise((resolve, reject) => {
            http.get(`http://${options.hostname}:${options.port}${options.path}/users/${id}`, (res) => {
                let body = '';
    
                res.on('data', (chunk) => {
                    body += chunk;
                })
    
                res.on('end', () => {
                    resolve(JSON.parse(body));
                })
            }).on("error", (err) => {
                reject(err)
            })
        })
    },

    /**
     * Transfer money to a user. Returns 403 if money is sent to a bot or your bot does not have enough money to fulfil the request.
     * @param {string} id ID of Discord User to transfer money to
     * @param {number} amount Amount to transfer
     * 
     * @returns {Promise<number>} Status code (200: OK, 403: Forbidden, 404: Not Found)
     * @author Rubíx
     */
    transfer: async (id, amount) => {
        if (!id || typeof id != "string") throw Error("Enter a string for the ID of the user you want to transfer to.")
        else if (!amount || typeof amount != "number") throw Error("Typeerror: amount transferred must be a number.")
    
        options.headers = {
            request: "transfer",
            token: token,
            id: id,
            amount: amount
        }
        options.method = "POST"

        return new Promise((resolve, reject) => {
            const req = http.request(options, res => {
                resolve(res.statusCode)
            })

            req.on('error', err => { reject(err) });
            req.end();
        })
    }
}
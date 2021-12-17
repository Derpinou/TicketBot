const { Client } = require('discord.js') ,
    { TicketManager } = require('discord-tickets') ;

module.exports = class TicketBot extends Client {
    constructor(options) {
        super(options) ;
        this.config = require('../../config.js') ;
        this.ticketmanager = new TicketManager(this, this.config.ticketConfig) ; 
    }

    init () {
        this.login(this.options.token)
    }

    eventLoader() {
        readdir("./src/events", (err, files) => {
            if (!files) return ;
            if (err) this.emit("error", err) ;
            for (const dir of files) {
                readdir(`./src/events/${dir}`, (err, file) => {
                    if (!file) return ;
                    if (err) this.emit("error", err) ;
                    for (const evt of file) {
                        try {
                            if (!evt) return ;
                            const event = new (require(`../events/${dir}/${evt}`))(this) ;
                            this.logger.log(`${evt} chargé`) ;
                            super.on(evt.split(".")[0], (...args) => event.run(...args)) ;
                        } catch (e) {
                            this.emit("error", `${evt} n'a pas chargé ${e.stack}`) ;
                        }
                    }
                })
            }
        }) ;
        return this ;
    }
}
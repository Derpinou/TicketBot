new (require('./Structures/Client'))({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "DIRECT_MESSAGES"
    ]
}).init() ;
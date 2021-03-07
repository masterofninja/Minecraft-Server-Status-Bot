// Bot Required Modules
const Discord = require('discord.js');
const client = new Discord.Client();
const predb = require('quick.db')
const fetch = require('node-fetch')
const bconfig = require("./config.json");

// Bot Prefix
const prefix = bconfig.prefix;

// Bot Activity , Login Text and Website Post Stats API's
client.on('ready', () => {

    const ontext = ` 
    ______________________________
    Logged in as: ${client.user.tag}
    Servers: ${client.guilds.cache.size}
    Users: ${client.guilds.cache.reduce((total, guild) => total + guild.memberCount, 0)}
    ______________________________
    `
    console.log(ontext);

    setInterval(() => {

        let a = `${client.guilds.cache.reduce((total, guild) => total + guild.memberCount, 0)}`
        let b = 1000

        let c = Math.round(a / b)

        let statuses = [
            `${prefix}help | ${prefix}setup`,
            `${c}k Users on ${client.guilds.cache.size} Servers`
        ]

        let status = statuses[Math.floor(Math.random() * statuses.length)]

        client.user.setActivity(status, { type: "WATCHING" })

    }, 5000)

    // Top.gg API
    setInterval(() => {
        fetch("https://top.gg/api/bots/802868654957789204/stats", {
            method: 'post',
            data: {
                "server_count": `${client.guilds.cache.size}`
            },
            headers: {
                "Content-Type": "application/json",
                "Authorization": bconfig.topggtoken
            },
            body: JSON.stringify({ "server_count": client.guilds.cache.size }),
        }).then(() => {
            let webembed = new Discord.MessageEmbed()
            webembed.setTitle("Top.gg")
            webembed.setURL("https://top.gg/bot/802868654957789204")
            webembed.setDescription("Bot Stats - Updated")
            webembed.setColor('GREEN')
            webembed.setTimestamp()
            client.channels.cache.get("807298871486709803").send(webembed)
        }).catch((err) => {
            console.error(err);
        })
    }, 300000)

    // Topcord.xyz API
    setInterval(() => {
        fetch("https://api.topcord.xyz/bot/802868654957789204/stats", {
            method: 'post',
            data: {
                "guilds": `${client.guilds.cache.size}`
            },
            headers: {
                "Content-Type": "application/json",
                "Authorization": bconfig.tctoken
            },
            body: JSON.stringify({ "guilds": client.guilds.cache.size }),
        }).then(() => {
            let webembed = new Discord.MessageEmbed()
            webembed.setTitle("Topcord.xyz")
            webembed.setURL("https://topcord.xyz/bot/802868654957789204")
            webembed.setDescription("Bot Stats - Updated")
            webembed.setColor('GREEN')
            webembed.setTimestamp()
            client.channels.cache.get("807298871486709803").send(webembed)
        }).catch((err) => {
            console.error(err);
        })
    }, 300000)

    // BotsForDiscord.com API
    setInterval(() => {
        fetch("https://botsfordiscord.com/api/bot/802868654957789204", {
            method: 'post',
            data: {
                "server_count": `${client.guilds.cache.size}`
            },
            headers: {
                "Content-Type": "application/json",
                "Authorization": bconfig.bfdtoken
            },
            body: JSON.stringify({ "server_count": client.guilds.cache.size }),
        }).then(() => {
            let webembed = new Discord.MessageEmbed()
            webembed.setTitle("Botsfordiscord.com")
            webembed.setURL("https://botsfordiscord.com/bot/802868654957789204")
            webembed.setDescription("Bot Stats - Updated")
            webembed.setColor('GREEN')
            webembed.setTimestamp()
            client.channels.cache.get("807298871486709803").send(webembed)
        }).catch((err) => {
            console.error(err);
        })
    }, 300000)

    // Discord.Bots.gg API
    setInterval(() => {
        fetch("https://discord.bots.gg/api/v1/bots/802868654957789204/stats", {
            method: 'post',
            data: {
                "guildCount": `${client.guilds.cache.size}`
            },
            headers: {
                "Content-Type": "application/json",
                "Authorization": bconfig.dbggtoken
            },
            body: JSON.stringify({ "guildCount": client.guilds.cache.size }),
        }).then(() => {
            let webembed = new Discord.MessageEmbed()
            webembed.setTitle("Discord.bots.gg")
            webembed.setURL("https://discord.bots.gg/bots/802868654957789204")
            webembed.setDescription("Bot Stats - Updated")
            webembed.setColor('GREEN')
            webembed.setTimestamp()
            client.channels.cache.get("807298871486709803").send(webembed)
        }).catch((err) => {
            console.error(err);
        })
    }, 300000)

    // Discord.Boats API
    setInterval(() => {
        fetch("https://discord.boats/api/bot/802868654957789204", {
            method: 'post',
            data: {
                "server_count": `${client.guilds.cache.size}`
            },
            headers: {
                "Content-Type": "application/json",
                "Authorization": bconfig.dbtoken
            },
            body: JSON.stringify({ "server_count": client.guilds.cache.size }),
        }).then(() => {
            let webembed = new Discord.MessageEmbed()
            webembed.setTitle("Discord.boats")
            webembed.setURL("https://discord.boats/bot/802868654957789204")
            webembed.setDescription("Bot Stats - Updated")
            webembed.setColor('GREEN')
            webembed.setTimestamp()
            client.channels.cache.get("807298871486709803").send(webembed)
        }).catch((err) => {
            console.error(err);
        })
    }, 300000)

    // Discordbotlist.com API
    setInterval(() => {
        fetch("https://discordbotlist.com/api/v1/bots/802868654957789204/stats", {
            method: 'post',
            data: {
                "guilds": `${client.guilds.cache.size}`,
                "users": `${client.guilds.cache.reduce((total, guild) => total + guild.memberCount, 0)}`
            },
            headers: {
                "Content-Type": "application/json",
                "Authorization": bconfig.dblcomtoken
            },
            body: JSON.stringify({ "guilds": client.guilds.cache.size, "users": client.guilds.cache.reduce((total, guild) => total + guild.memberCount, 0) }),
        }).then(() => {
            let webembed = new Discord.MessageEmbed()
            webembed.setTitle("Discordbotlist.com")
            webembed.setURL("https://discordbotlist.com/bots/minecraft-server-status-5845")
            webembed.setDescription("Bot Stats - Updated")
            webembed.setColor('GREEN')
            webembed.setTimestamp()
            client.channels.cache.get("807298871486709803").send(webembed)
        }).catch((err) => {
            console.error(err);
        })
    }, 300000)

    // Botlist.space API
    setInterval(() => {
        fetch("https://api.botlist.space/v1/bots/802868654957789204", {
            method: 'post',
            data: {
                "server_count": `${client.guilds.cache.size}`
            },
            headers: {
                "Content-Type": "application/json",
                "Authorization": bconfig.blspacetoken
            },
            body: JSON.stringify({ "server_count": client.guilds.cache.size }),
        }).then(() => {
            let webembed = new Discord.MessageEmbed()
            webembed.setTitle("Botlist.space")
            webembed.setURL("https://botlist.space/bot/802868654957789204")
            webembed.setDescription("Bot Stats - Updated")
            webembed.setColor('GREEN')
            webembed.setTimestamp()
            client.channels.cache.get("807298871486709803").send(webembed)
        }).catch((err) => {
            console.error(err);
        })
    }, 300000)

    // Discordextremelist.xyz API
    setInterval(() => {
        fetch("https://api.discordextremelist.xyz/v2/bot/802868654957789204/stats", {
            method: 'post',
            data: {
                "guildCount": `${client.guilds.cache.size}`
            },
            headers: {
                "Content-Type": "application/json",
                "Authorization": bconfig.detoken
            },
            body: JSON.stringify({ "guildCount": client.guilds.cache.size }),
        }).then(() => {
            let webembed = new Discord.MessageEmbed()
            webembed.setTitle("Discordextremelist.xyz")
            webembed.setURL("https://discordextremelist.xyz/en-US/bots/802868654957789204")
            webembed.setDescription("Bot Stats - Updated")
            webembed.setColor('GREEN')
            webembed.setTimestamp()
            client.channels.cache.get("807298871486709803").send(webembed)
        }).catch((err) => {
            console.error(err);
        })
    }, 300000)

    // Sentcord.com API
    setInterval(() => {
        fetch("https://sentcord.com/api/bot/802868654957789204", {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "Authorization": bconfig.sctoken
            },
            body: JSON.stringify({ "serverCount": client.guilds.cache.size }),
        }).then(() => {
            let webembed = new Discord.MessageEmbed()
            webembed.setTitle("Sentcord.com")
            webembed.setURL("https://sentcord.com/bot/802868654957789204")
            webembed.setDescription("Bot Stats - Updated")
            webembed.setColor('GREEN')
            webembed.setTimestamp()
            client.channels.cache.get("807298871486709803").send(webembed)
        }).catch((err) => {
            console.error(err);
        })
    }, 300000)

})

// Bot Commands Setup Begins
client.on('message', async message => {

    // Required Credentials
    let mcIP = predb.get(`guild_${message.guild.id}_ip`) || "Not Setup"

    let botlogo = 'https://cdn.discordapp.com/attachments/771781595220017193/816696687170420797/Minecraft_Server_Status.png'

    let mcPort = predb.get(`guild_${message.guild.id}_port`) || "Not Setup"

    const args = message.content.slice(prefix.length).trim().split(/ +/);

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Setup Command
    if (message.content.startsWith(`${prefix}setup`)) {

        // user-perm
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('Make Sure You Have **MANAGE_GUILD** permission to use this command .')

        // bot-perm
        if (!message.guild.me.hasPermission('EMBED_LINKS')) return message.channel.send('Please Give Me **EMBED_LINKS** permission in this channel .')

        let embedargs = new Discord.MessageEmbed()
        embedargs.setDescription(`Please Use **${prefix}setup** command like : **${prefix}setup serverip serverport**`)
        embedargs.setColor('RED')
        embedargs.setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
        embedargs.setTimestamp()

        if (!args[1]) return message.channel.send(embedargs)
        if (!args[2]) return message.channel.send(embedargs)

        let embedportnum = new Discord.MessageEmbed()
        embedportnum.setDescription(`Make Sure That The **PORT** you are entering is numeric`)
        embedportnum.setColor('RED')
        embedportnum.setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
        embedportnum.setTimestamp()

        if (isNaN(parseInt(args[2]))) return message.channel.send(embedportnum)

        let embedportlength = new Discord.MessageEmbed()
        embedportlength.setDescription(`Make Sure That The **PORT** you are entering is not more than 5 numbers`)
        embedportlength.setColor('RED')
        embedportlength.setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
        embedportlength.setTimestamp()

        if (args[2].length > 5) return message.channel.send(embedportlength)

        let embedsameip = new Discord.MessageEmbed()
        embedsameip.setDescription(`This One Is Already Your IP , For Reset Use **${prefix}reset**`)
        embedsameip.setColor('YELLOW')
        embedsameip.setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
        embedsameip.setTimestamp()

        if (args[1] === predb.has(`guild_${message.guild.id}_ip`)) return message.channel.send(embedsameip)

        let embedsameport = new Discord.MessageEmbed()
        embedsameport.setDescription(`This One Is Already Your PORT , For Reset Use **${prefix}reset**`)
        embedsameport.setColor('YELLOW')
        embedsameport.setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
        embedsameport.setTimestamp()

        if (args[2] === predb.has(`guild_${message.guild.id}_port`)) return message.channel.send(embedsameport)

        predb.set(`guild_${message.guild.id}_ip`, args[1])
        predb.set(`guild_${message.guild.id}_port`, args[2])

        let embedSetup = new Discord.MessageEmbed();
        embedSetup.setTitle("Minecraft Server Status")
        embedSetup.setDescription("Setup Panel Here :-")
        embedSetup.addFields([{
            "name": "IP",
            "value": `${args[1]}`,
            "inline": true
        },
        {
            "name": "PORT",
            "value": `${args[2]}`
        }
        ])
        embedSetup.setColor("BLUE");
        embedSetup.setThumbnail(botlogo)
        embedSetup.setFooter(`${message.author.tag}`, message.author.displayAvatarURL());
        embedSetup.setTimestamp();
        return message.channel.send(embedSetup);
    }

    // Reset Command
    if (message.content.startsWith(`${prefix}reset`)) {

        // user-perm
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('Make Sure You Have **MANAGE_GUILD** permission to use this command .')

        // bot-perm
        if (!message.guild.me.hasPermission('EMBED_LINKS')) return message.channel.send('Please Give Me **EMBED_LINKS** permission in this channel .')

        let embednoip = new Discord.MessageEmbed()
        embednoip.setDescription(`No IP has been setuped , For Setup Use **${prefix}setup**`)
        embednoip.setColor('YELLOW')
        embednoip.setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
        embednoip.setTimestamp()

        if (!message.guild.id === predb.has(`guild_${message.guild.id}_ip`)) return message.channel.send(embednoip)

        let embednoport = new Discord.MessageEmbed()
        embednoport.setDescription(`No PORT has been setuped , For Setup Use **${prefix}setup**`)
        embednoport.setColor('YELLOW')
        embednoport.setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
        embednoport.setTimestamp()

        if (!message.guild.id === predb.has(`guild_${message.guild.id}_port`)) return message.channel.send(embednoport)

        predb.delete(`guild_${message.guild.id}_ip`)
        predb.delete(`guild_${message.guild.id}_port`)

        let embedReset = new Discord.MessageEmbed();
        embedReset.setTitle("Minecraft Server Status")
        embedReset.setDescription("Reset Panel Here :-")
        embedReset.addFields([{
            "name": "IP",
            "value": "Successfully Reset",
            "inline": true
        },
        {
            "name": "PORT",
            "value": "Successfully Reset"
        }
        ])
        embedReset.setColor("BLUE");
        embedReset.setThumbnail(botlogo)
        embedReset.setFooter(`${message.author.tag}`, message.author.displayAvatarURL());
        embedReset.setTimestamp();
        message.channel.send(embedReset);
    }

    // Status Command
    if (message.content.startsWith(`${prefix}status`)) {

        // bot-perm
        if (!message.guild.me.hasPermission('EMBED_LINKS')) return message.channel.send('Please Give Me **EMBED_LINKS** permission in this channel .')

        let embedstatuserr = new Discord.MessageEmbed()
        embedstatuserr.setDescription(`Maybe, IP and PORT Has Been Not Setuped For This Server or if you thought that bot is giving wrong reply then use **${prefix}reset** for reset and then **${prefix}setup** command for setup your server ip and port again`)
        embedstatuserr.setColor('RED')
        embedstatuserr.setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
        embedstatuserr.setTimestamp()

        if (!message.guild.id === predb.has(`guild_${message.guild.id}_ip`)) return message.channel.send(embedstatuserr)
        if (!message.guild.id === predb.has(`guild_${message.guild.id}_port`)) return message.channel.send(embedstatuserr)

        let serverURL = `https://api.mcsrvstat.us/2/${mcIP}:${mcPort}`;

        await fetch(serverURL)
            .then(response => response.json())
            .then(data => {

                let status = "Offline"
                let color = 16711680
                let people = "Currently Players are Hidden For This Server"

                if (data.online === true) {

                    status = "Online"
                    color = 65280

                    if (data.players.list) {

                        people = data.players.list.join('   ,   ')

                    }
                    else if (data.players.online === 0) {

                        people = "Currently No One Is Playing In Server"
                    }
                }

                let embedStatus = new Discord.MessageEmbed();
                embedStatus.setTitle("Minecraft Server Status")
                embedStatus.setDescription("Your Minecraft Server Panel Here :-")
                embedStatus.addFields(
                    [
                        {
                            "name": "Ip",
                            "value": `${data.hostname}`,
                            "inline": true
                        },
                        {
                            "name": "Port",
                            "value": `${data.port}`,
                            "inline": true
                        },
                        {
                            "name": "Status",
                            "value": status,
                            "inline": true
                        },
                        {
                            "name": "Player Count",
                            "value": data.players.online + "/" + data.players.max,
                            "inline": true
                        },
                        {
                            "name": "Version",
                            "value": `${data.version} -v${data.protocol}`,
                            "inline": true
                        },
                        {
                            "name": "Players",
                            "value": people
                        }
                    ]
                )
                embedStatus.setColor(color);
                embedStatus.setThumbnail(botlogo)
                embedStatus.setFooter(`${message.author.tag}`, message.author.displayAvatarURL());
                embedStatus.setTimestamp();
                message.channel.send(embedStatus);
            })
    }

    // IP & PORT Command
    if (message.content.startsWith(`${prefix}ip`)) {

        // bot-perm
        if (!message.guild.me.hasPermission('EMBED_LINKS')) return message.channel.send('Please Give Me **EMBED_LINKS** permission in this channel .')

        let embedIP = new Discord.MessageEmbed();
        embedIP.setTitle("Minecraft Server Status")
        embedIP.setDescription("Your Minecraft Server IP & PORT Panel Here :-")
        embedIP.addFields([{
            "name": "IP",
            "value": `**${mcIP}**`,
            "inline": true
        },
        {
            "name": "PORT",
            "value": `${mcPort}`
        }
        ])
        embedIP.setColor("BLUE");
        embedIP.setThumbnail(botlogo)
        embedIP.setFooter(`${message.author.tag}`, message.author.displayAvatarURL());
        embedIP.setTimestamp();
        message.channel.send(embedIP);
    }

    // Invite Command
    if (message.content.startsWith(`${prefix}invite`)) {

        // bot-perm
        if (!message.guild.me.hasPermission('EMBED_LINKS')) return message.channel.send('Please Give Me **EMBED_LINKS** permission in this channel .')

        let invlink = "[Here](https://discord.com/api/oauth2/authorize?client_id=802868654957789204&permissions=84992&scope=bot)"

        let embedInvite = new Discord.MessageEmbed();
        embedInvite.setTitle("Minecraft Server Status")
        embedInvite.setDescription("Invite Link Panel Here :-")
        embedInvite.addField("Invite", invlink)
        embedInvite.setColor("BLUE");
        embedInvite.setThumbnail(botlogo)
        embedInvite.setFooter(`${message.author.tag}`, message.author.displayAvatarURL());
        embedInvite.setTimestamp();
        message.channel.send(embedInvite);
    }

    // Vote Command
    if (message.content.startsWith(`${prefix}vote`)) {

        // bot-perm
        if (!message.guild.me.hasPermission('EMBED_LINKS')) return message.channel.send('Please Give Me **EMBED_LINKS** permission in this channel .')

        let embedVote = new Discord.MessageEmbed();
        embedVote.setTitle("Minecraft Server Status")
        embedVote.setDescription("Voting Link Panel Here :-")
        embedVote.addFields([{
            "name": "top.gg",
            "value": "[Here](https://top.gg/bot/802868654957789204)",
            "inline": true
        },
        {
            "name": "topcord.xyz",
            "value": "[Here](https://topcord.xyz/bot/802868654957789204)",
            "inline": true
        },
        {
            "name": "botsfordiscord.com",
            "value": "[Here](https://botsfordiscord.com/bot/802868654957789204)",
            "inline": true
        },
        {
            "name": "discordbotlist.com",
            "value": "[Here](https://discordbotlist.com/bots/minecraft-server-status-5845)",
            "inline": true
        },
        {
            "name": "botlist.space",
            "value": "[Here](https://botlist.space/bot/802868654957789204)",
            "inline": true
        },
        {
            "name": "discord.boats",
            "value": "[Here](https://discord.boats/bot/802868654957789204)",
            "inline": true
        },
        {
            "name": "discordextremelist.xyz",
            "value": "[Here](https://discordextremelist.xyz/en-US/bots/802868654957789204)"
        }
        ])
        embedVote.setColor("BLUE");
        embedVote.setThumbnail(botlogo)
        embedVote.setFooter(`${message.author.tag}`, message.author.displayAvatarURL());
        embedVote.setTimestamp();
        message.channel.send(embedVote);
    }

    // Stats Command
    if (message.content.startsWith(`${prefix}stats`)) {

        // bot-perm
        if (!message.guild.me.hasPermission('EMBED_LINKS')) return message.channel.send('Please Give Me **EMBED_LINKS** permission in this channel .')

        let botservers = client.guilds.cache.size;
        let botusers = client.guilds.cache.reduce((total, guild) => total + guild.memberCount, 0);
        let botchannels = client.channels.cache.size;
        let botping = client.ws.ping;
        let botcreate = client.user.createdAt;

        let embedBotstats = new Discord.MessageEmbed();
        embedBotstats.setTitle("Minecraft Server Status")
        embedBotstats.setDescription("My Stats Panel Here :-")
        embedBotstats.addFields([{
            "name": "Name",
            "value": `${client.user.tag}`,
            "inline": true
        },
        {
            "name": "Id",
            "value": `${client.user.id}`,
            "inline": true
        },
        {
            "name": "Prefix",
            "value": `${prefix}`,
            "inline": true
        },
        {
            "name": "Servers",
            "value": `${botservers}`,
            "inline": true
        },
        {
            "name": "Users",
            "value": `${botusers}`,
            "inline": true
        },
        {
            "name": "Channels",
            "value": `${botchannels}`,
            "inline": true
        },
        {
            "name": "Ping",
            "value": `${Math.round(botping)}ms`,
            "inline": true
        },
        {
            "name": "Creation",
            "value": `${botcreate}`
        }
        ])
        embedBotstats.setColor("BLUE");
        embedBotstats.setThumbnail(botlogo)
        embedBotstats.setFooter(`${message.author.tag}`, message.author.displayAvatarURL());
        embedBotstats.setTimestamp();
        message.channel.send(embedBotstats);
    }

    // Info Command
    if (message.content.startsWith(`${prefix}info`)) {

        // bot-perm
        if (!message.guild.me.hasPermission('EMBED_LINKS')) return message.channel.send('Please Give Me **EMBED_LINKS** permission in this channel .')

        let embedInfo = new Discord.MessageEmbed();
        embedInfo.setTitle("Minecraft Server Status")
        embedInfo.setDescription("Info Panel Here :-")
        embedInfo.addFields([{
            "name": "Language",
            "value": "**[JavaScript](https://www.javascript.com)**",
            "inline": true
        },
        {
            "name": "Platform",
            "value": "**[NodeJS](https://nodejs.org/en)**",
            "inline": true
        },
        {
            "name": "Library",
            "value": "**[Discord.js](https://discordjs.guide)**",
            "inline": true
        },
        {
            "name": "Packages",
            "value": "**[NPM](https://www.npmjs.com)**",
            "inline": true
        },
        {
            "name": "Api",
            "value": "**[Mcsrvstat](https://api.mcsrvstat.us)**",
            "inline": true
        },
        {
            "name": "Database",
            "value": "**[Quick.db](https://quickdb.js.org)**",
            "inline": true
        },
        {
            "name": "Github",
            "value": "**[Here](https://github.com/LOG-LEGENDX/Minecraft-Server-Status-Bot)**",
            "inline": true
        },
        {
            "name": "Privacy",
            "value": "**[Here](https://github.com/LOG-LEGENDX/Minecraft-Server-Status-Bot/blob/master/PRIVACY.md)**"
        }
        ])
        embedInfo.setColor("BLUE");
        embedInfo.setThumbnail(botlogo)
        embedInfo.setFooter(`${message.author.tag}`, message.author.displayAvatarURL());
        embedInfo.setTimestamp();
        message.channel.send(embedInfo);
    }

    // Uptime Command
    if (message.content.startsWith(`${prefix}uptime`)) {

        // bot-perm
        if (!message.guild.me.hasPermission('EMBED_LINKS')) return message.channel.send('Please Give Me **EMBED_LINKS** permission in this channel .')

        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);

        let embedUptime = new Discord.MessageEmbed();
        embedUptime.setTitle("Minecraft Server Status")
        embedUptime.setDescription("Uptime Panel Here :-")
        embedUptime.addFields([{
            "name": "Days",
            "value": `***${days}***`,
            "inline": true
        },
        {
            "name": "Hours",
            "value": `***${hours}***`,
            "inline": true
        },
        {
            "name": "Minutes",
            "value": `***${minutes}***`,
            "inline": true
        }
        ])
        embedUptime.setColor("BLUE");
        embedUptime.setThumbnail(botlogo)
        embedUptime.setFooter(`${message.author.tag}`, message.author.displayAvatarURL());
        embedUptime.setTimestamp();
        message.channel.send(embedUptime);
    }

    // Report Command
    if (message.content.startsWith(`${prefix}report`)) {

        // bot-perm
        if (!message.guild.me.hasPermission('EMBED_LINKS')) return message.channel.send('Please Give Me **EMBED_LINKS** permission in this channel .')

        const ReportInvLink = args[1];

        let embednoinv = new Discord.MessageEmbed()
        embednoinv.setDescription(`Please Use **${prefix}report** command like : **${prefix}report your-server-invite-link your-issue**`)
        embednoinv.setColor('RED')
        embednoinv.setFooter(`${message.author.tag}`, message.author.displayAvatarURL());
        embednoinv.setTimestamp()

        if (!args[1]) return message.channel.send(embednoinv)

        const embednoinvlink = new Discord.MessageEmbed()
        embednoinvlink.setDescription("Your Server Invite Link Must Be Like - **https://discord.gg/EtCsyts**")
        embednoinvlink.setColor('RED')
        embednoinvlink.setFooter(`${message.author.tag}`, message.author.displayAvatarURL());
        embednoinvlink.setTimestamp()

        if (!ReportInvLink.includes('https://discord.gg')) return message.channel.send(embednoinvlink)

        const ReportMessage = args.slice(2).join(" ")

        if (!ReportMessage) return message.channel.send(embednoinv)

        let embedmemreport = new Discord.MessageEmbed()
        embedmemreport.setDescription(`You're issue have been succesfully sent to the developers!`)
        embedmemreport.setThumbnail(botlogo)
        embedmemreport.setColor('GREEN')
        embedmemreport.setFooter(`${message.author.tag}`, message.author.displayAvatarURL());
        embedmemreport.setTimestamp()

        message.channel.send(embedmemreport)

        let embedmemtodevreport = new Discord.MessageEmbed()
        embedmemtodevreport.setTitle("Minecraft Server Status")
        embedmemtodevreport.setDescription("Report Panel Here :-")
        embedmemtodevreport.addFields([{
            "name": "Reporter Name",
            "value": `${message.author.tag}`,
            "inline": true
        },
        {
            "name": "Reporter ID",
            "value": `${message.author.id}`,
            "inline": true
        },
        {
            "name": "Reported Guild Name",
            "value": `${message.guild.name}`,
            "inline": true
        },
        {
            "name": "Reported Guild ID",
            "value": `${message.guild.id}`,
            "inline": true
        },
        {
            "name": "Reported Guild Invite Link",
            "value": `[Here](${ReportInvLink})`,
            "inline": true
        },
        {
            "name": "Reported Issue",
            "value": `${ReportMessage}`
        }
        ])
        embedmemtodevreport.setColor('YELLOW');
        embedmemtodevreport.setThumbnail(botlogo)
        embedmemtodevreport.setFooter(`${message.author.tag}`, message.author.displayAvatarURL());
        embedmemtodevreport.setTimestamp();

        client.channels.cache.get("806564358686507008").send(embedmemtodevreport)
    }

    // Help Command
    if (message.content.startsWith(`${prefix}help`)) {

        // bot-perm
        if (!message.guild.me.hasPermission('EMBED_LINKS')) return message.channel.send('Please Give Me **EMBED_LINKS** permission in this channel .')

        let helpingcommands = [
            "help", "setup", "reset", "status", "ip", "invite", "stats", "info", "uptime", "vote", "report"
        ]
        let helpingcommandsdescription = [
            "Shows This Panel", "Sets Your IP and PORT", "Resets Your IP and PORT", "Shows Your Server Status", "Gives Your IP and PORT", "Gives My Invite Link", "Gives My Stats", "Gives My Info", "Gives My Uptime", "Gives My Voting Sites Link", "Report Your Issue To My Dev"
        ]
        let helpingcommandsusage = [
            `${prefix}help`, `${prefix}setup <ip> <port>`, `${prefix}reset`, `${prefix}status`, `${prefix}ip`, `${prefix}invite`, `${prefix}stats`, `${prefix}info`, `${prefix}uptime`, `${prefix}vote`, `${prefix}report`
        ]
        let embedHelp = new Discord.MessageEmbed();
        embedHelp.setTitle("Minecraft Server Status")
        embedHelp.setDescription("Helping Panel Here :-")
        embedHelp.addFields([{
            "name": "Commands",
            "value": helpingcommands,
            "inline": true
        },
        {
            "name": "Description",
            "value": helpingcommandsdescription,
            "inline": true
        },
        {
            "name": "Usage",
            "value": helpingcommandsusage,
            "inline": true
        }
        ])
        embedHelp.addField("Help & Updates", "For Any Help & Updates [Join My Discord Server](https://discord.gg/EtCsyts)")
        embedHelp.setColor("BLUE");
        embedHelp.setThumbnail(botlogo)
        embedHelp.setFooter(`${message.author.tag}`, message.author.displayAvatarURL());
        embedHelp.setTimestamp();
        message.channel.send(embedHelp);
    }
});

// Bot Login
client.login(bconfig.bottoken);
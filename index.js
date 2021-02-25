// Required Modules
const Discord = require('discord.js');
const client = new Discord.Client();
const predb = require('quick.db')
const fetch = require('node-fetch')
const bconfig = require("./config.json");
let request = require('request');

// Bot Prefix
const prefix = bconfig.prefix;

// Top.gg API
client.on('ready', () => {

    const topggtext = ` 
    ______________________________
    Website: top.gg
    Stats: Posted
    ______________________________
    `

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
            console.log(topggtext);
        }).catch((err) => {
            console.error(err);
        })
    }, 300000)
})

// Topcord.xyz API
client.on('ready', () => {

    const topcordxyztext = ` 
    ______________________________
    Website: topcord.xyz
    Stats: Posted
    ______________________________
    `

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
            console.log(topcordxyztext);
        }).catch((err) => {
            console.error(err);
        })
    }, 300000)
})

// BotsForDiscord.com API
client.on('ready', () => {

    const botsfordiscordcomtext = ` 
    ______________________________
    Website: botsfordiscord.com
    Stats: Posted
    Guilds: ${client.guilds.cache.size}
    ______________________________
    `

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
            console.log(botsfordiscordcomtext);
        }).catch((err) => {
            console.error(err);
        })
    }, 300000)
})

// Discord.Bots.gg API
client.on('ready', () => {

    const discordbotsggtext = ` 
    ______________________________
    Website: discord.bots.gg
    Stats: Posted
    Guilds: ${client.guilds.cache.size}
    ______________________________
    `

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
            console.log(discordbotsggtext);
        }).catch((err) => {
            console.error(err);
        })
    }, 300000)
})

// Discordbotlist.com API
client.on('ready', () => {

    const discordbotlisttext = ` 
    ______________________________
    Website: discordbotlist.com
    Stats: Posted
    Guilds: ${client.guilds.cache.size}
    ______________________________
    `

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
            console.log(discordbotlisttext);
        }).catch((err) => {
            console.error(err);
        })
    }, 300000)
})

// Commands Setup Begins
client.on('message', message => {

    // Required Credentials
    let mcIP = predb.get(`guild_${message.guild.id}_ip`) || "Not Setup"

    let botlogo = 'https://cdn.discordapp.com/attachments/715672683207196803/803324498992169099/Minecraft_Status_Bot.jpg'

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
        embedargs.setFooter('Requested By' + message.author.tag)
        embedargs.setTimestamp()

        if (!args[1]) return message.channel.send(embedargs)
        if (!args[2]) return message.channel.send(embedargs)

        let embedportlength = new Discord.MessageEmbed()
        embedportlength.setDescription(`Make Sure That The **PORT** you are entering is not more than 5 numbers`)
        embedportlength.setColor('RED')
        embedportlength.setFooter('Requested By' + message.author.tag)
        embedportlength.setTimestamp()

        if (args[2].length > 5) return message.channel.send(embedportlength)

        let embedsameip = new Discord.MessageEmbed()
        embedsameip.setDescription(`This One Is Already Your IP , For Reset Use **${prefix}reset**`)
        embedsameip.setColor('YELLOW')
        embedsameip.setFooter('Requested By' + message.author.tag)
        embedsameip.setTimestamp()

        if (args[1] === predb.get(`guild_${message.guild.id}_ip`)) return message.channel.send(embedsameip)

        let embedsameport = new Discord.MessageEmbed()
        embedsameport.setDescription(`This One Is Already Your PORT , For Reset Use **${prefix}reset**`)
        embedsameport.setColor('YELLOW')
        embedsameport.setFooter('Requested By' + message.author.tag)
        embedsameport.setTimestamp()

        if (args[2] === predb.get(`guild_${message.guild.id}_port`)) return message.channel.send(embedsameport)

        predb.set(`guild_${message.guild.id}_ip`, args[1])
        predb.set(`guild_${message.guild.id}_port`, args[2])

        let before = [
            "IP", "PORT"
        ]
        let after = [
            `***${args[1]}***`, `***${args[2]}***`
        ]
        let embedSetup = new Discord.MessageEmbed();
        embedSetup.setTitle("Minecraft Server Status")
        embedSetup.setDescription("Setup Panel Here :-")
        embedSetup.addFields([{
            "name": "Server",
            "value": before,
            "inline": true
        },
        {
            "name": "New",
            "value": after,
            "inline": true
        }
        ])
        embedSetup.setColor("BLUE");
        embedSetup.setThumbnail(botlogo)
        embedSetup.setFooter('Requested By' + message.author.tag);
        embedSetup.setTimestamp();
        return message.channel.send(embedSetup);
    }

    // Reset Command
    if (message.content.startsWith(`${prefix}reset`)) {

        // user-perm
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('Make Sure You Have **MANAGE_GUILD** permission to use this command .')

        // bot-perm
        if (!message.guild.me.hasPermission('EMBED_LINKS')) return message.channel.send('Please Give Me **EMBED_LINKS** permission in this channel .')

        let before = [
            "IP", "PORT"
        ]
        let after = [
            "**Successfully Reset**", "**Successfully Reset**"
        ]

        predb.delete(`guild_${message.guild.id}_ip`)
        predb.delete(`guild_${message.guild.id}_port`)

        let embedReset = new Discord.MessageEmbed();
        embedReset.setTitle("Minecraft Server Status")
        embedReset.setDescription("Reset Panel Here :-")
        embedReset.addFields([{
            "name": "IP & PORT",
            "value": before,
            "inline": true
        },
        {
            "name": "IP & PORT",
            "value": after,
            "inline": true
        }
        ])
        embedReset.setColor("BLUE");
        embedReset.setThumbnail(botlogo)
        embedReset.setFooter('Requested By' + message.author.tag);
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
        embedstatuserr.setFooter('Requested By' + message.author.tag)
        embedstatuserr.setTimestamp()

        if (!message.guild.id === predb.has(`guild_${message.guild.id}_ip`)) return message.channel.send(embedstatuserr)
        if (!message.guild.id === predb.has(`guild_${message.guild.id}_port`)) return message.channel.send(embedstatuserr)

        let url = 'http://mcapi.us/server/status?ip=' + mcIP + '&port=' + mcPort;
        request(url, function (err, _response, body) {
            if (err) {
                console.log(err)
                let issues = [
                    "Query-Port on SERVER.PROPERTIES"
                ]
                let fixes = [
                    "Must Be Set To TRUE"
                ]
                let embedError = new Discord.MessageEmbed();
                embedError.setTitle("Minecraft Server Status")
                embedError.setDescription("Possible Issues & Fixes Panel Here :-")
                embedError.addFields([{
                    "name": "Issues",
                    "value": issues,
                    "inline": true
                },
                {
                    "name": "Fixes",
                    "value": fixes,
                    "inline": true
                }
                ])
                embedError.setColor("BLUE");
                embedError.setThumbnail(botlogo)
                embedError.setFooter('Requested By' + message.author.tag);
                embedError.setTimestamp();
                return message.channel.send(embedError);
            }

            body = JSON.parse(body);
            let status = "Offline"
            let color = 16711680
            if (body.online) {
                status = "Online";
                color = 65280
            }
            if (body.players.now) { } else { }

            let embedStatus = new Discord.MessageEmbed();
            embedStatus.setTitle("Minecraft Server Status")
            embedStatus.setDescription("Your Minecraft Server Panel Here :-")
            embedStatus.addFields(
                [
                    {
                        "name": "Status",
                        "value": status,
                        "inline": true
                    },
                    {
                        "name": "Player Count",
                        "value": body.players.now + "/" + body.players.max,
                        "inline": true
                    },
                    {
                        "name": "Version",
                        "value": body.server.name
                    }
                ]
            )
            embedStatus.setColor(color);
            embedStatus.setThumbnail(botlogo)
            embedStatus.setFooter('Requested By' + message.author.tag);
            embedStatus.setTimestamp();
            message.channel.send(embedStatus);
        });
    };

    // IP & PORT Command
    if (message.content.startsWith(`${prefix}ip`)) {

        // bot-perm
        if (!message.guild.me.hasPermission('EMBED_LINKS')) return message.channel.send('Please Give Me **EMBED_LINKS** permission in this channel .')

        let ipportnotsaved = [
            "IP", "PORT"
        ]
        let ipportsaved = [
            `**${mcIP}**`, `**${mcPort}**`
        ]
        let embedIP = new Discord.MessageEmbed();
        embedIP.setTitle("Minecraft Server Status")
        embedIP.setDescription("Your Minecraft Server IP & PORT Panel Here :-")
        embedIP.addFields([{
            "name": "IP & PORT",
            "value": ipportnotsaved,
            "inline": true
        },
        {
            "name": "IP & PORT",
            "value": ipportsaved,
            "inline": true
        }
        ])
        embedIP.setColor("BLUE");
        embedIP.setThumbnail(botlogo)
        embedIP.setFooter('Requested By' + message.author.tag);
        embedIP.setTimestamp();
        message.channel.send(embedIP);
    }

    // Invite Command
    if (message.content.startsWith(`${prefix}invite`)) {

        // bot-perm
        if (!message.guild.me.hasPermission('EMBED_LINKS')) return message.channel.send('Please Give Me **EMBED_LINKS** permission in this channel .')

        let invite = [
            "Invitation"
        ]
        let myinvitelink = [
            "[Here](https://discord.com/api/oauth2/authorize?client_id=802868654957789204&permissions=84992&scope=bot)"
        ]
        let embedInvite = new Discord.MessageEmbed();
        embedInvite.setTitle("Minecraft Server Status")
        embedInvite.setDescription("Invite Link Panel Here :-")
        embedInvite.addFields([{
            "name": "Invite",
            "value": invite,
            "inline": true
        },
        {
            "name": "Link",
            "value": myinvitelink,
            "inline": true
        }
        ])
        embedInvite.setColor("BLUE");
        embedInvite.setThumbnail(botlogo)
        embedInvite.setFooter('Requested By' + message.author.tag);
        embedInvite.setTimestamp();
        message.channel.send(embedInvite);
    }

    // Vote Command
    if (message.content.startsWith(`${prefix}vote`)) {

        // bot-perm
        if (!message.guild.me.hasPermission('EMBED_LINKS')) return message.channel.send('Please Give Me **EMBED_LINKS** permission in this channel .')

        let vote = [
            "top.gg", "topcord.xyz", "botsfordiscord.com", "discord.bots.gg", "discordbotlist.com"
        ]
        let votelink = [
            "[Here](https://top.gg/bot/802868654957789204)", "[Here](https://topcord.xyz/bot/802868654957789204)", "[Here](https://botsfordiscord.com/bot/802868654957789204)", "[Here](https://discord.bots.gg/bots/802868654957789204)", "[Here](https://discordbotlist.com/bots/minecraft-server-status-5845)"
        ]
        let embedVote = new Discord.MessageEmbed();
        embedVote.setTitle("Minecraft Server Status")
        embedVote.setDescription("Voting Link Panel Here :-")
        embedVote.addFields([{
            "name": "Voting Sites",
            "value": vote,
            "inline": true
        },
        {
            "name": "Link",
            "value": votelink,
            "inline": true
        }
        ])
        embedVote.setColor("BLUE");
        embedVote.setThumbnail(botlogo)
        embedVote.setFooter('Requested By' + message.author.tag);
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
        let statname = [
            "Name", "Id", "Prefix", "Servers", "Users", "Channels"
        ]
        let statvalue = [
            `${client.user.tag}`, `${client.user.id}`, `***${prefix}***`, `***${botservers}***`, `***${botusers}***`, `***${botchannels}***`
        ]
        let embedBotstats = new Discord.MessageEmbed();
        embedBotstats.setTitle("Minecraft Server Status")
        embedBotstats.setDescription("My Stats Panel Here :-")
        embedBotstats.addFields([{
            "name": "Name",
            "value": statname,
            "inline": true
        },
        {
            "name": "Stats",
            "value": statvalue,
            "inline": true
        }
        ])
        embedBotstats.setColor("BLUE");
        embedBotstats.setThumbnail(botlogo)
        embedBotstats.setFooter('Requested By' + message.author.tag);
        embedBotstats.setTimestamp();
        message.channel.send(embedBotstats);
    }

    // Info Command
    if (message.content.startsWith(`${prefix}info`)) {

        // bot-perm
        if (!message.guild.me.hasPermission('EMBED_LINKS')) return message.channel.send('Please Give Me **EMBED_LINKS** permission in this channel .')

        let ifname = [
            "Language", "Platform", "Library", "Packages", "Api", "Database", "Github"
        ]
        let ifvalue = [
            "**[JavaScript](https://www.javascript.com)**", "**[NodeJS](https://nodejs.org/en)**", "**[Discord.js](https://discordjs.guide)**", "**[NPM](https://www.npmjs.com)**", "**[McApi](http://mcapi.us)**", "**[Quick.db](https://quickdb.js.org)**", "**[Here](https://github.com/LOG-LEGENDX/Minecraft-Server-Status-Bot)**"
        ]
        let embedInfo = new Discord.MessageEmbed();
        embedInfo.setTitle("Minecraft Server Status")
        embedInfo.setDescription("Info Panel Here :-")
        embedInfo.addFields([{
            "name": "Name",
            "value": ifname,
            "inline": true
        },
        {
            "name": "Info",
            "value": ifvalue,
            "inline": true
        }
        ])
        embedInfo.setColor("BLUE");
        embedInfo.setThumbnail(botlogo)
        embedInfo.setFooter('Requested By' + message.author.tag);
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

        let up = [
            "Days", "Hours", "Minutes"
        ]
        let time = [
            `***${days}***`, `***${hours}***`, `***${minutes}***`
        ]
        let embedUptime = new Discord.MessageEmbed();
        embedUptime.setTitle("Minecraft Server Status")
        embedUptime.setDescription("Uptime Panel Here :-")
        embedUptime.addFields([{
            "name": "Units",
            "value": up,
            "inline": true
        },
        {
            "name": "Time",
            "value": time,
            "inline": true
        }
        ])
        embedUptime.setColor("BLUE");
        embedUptime.setThumbnail(botlogo)
        embedUptime.setFooter('Requested By' + message.author.tag);
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
        embednoinv.setFooter('Requested By' + message.author.tag);
        embednoinv.setTimestamp()

        if (!args[1]) return message.channel.send(embednoinv)

        const embednoinvlink = new Discord.MessageEmbed()
        embednoinvlink.setDescription("Your Server Invite Link Must Be Like - **https://discord.gg/EtCsyts**")
        embednoinvlink.setColor('RED')
        embednoinvlink.setFooter('Requested By' + message.author.tag);
        embednoinvlink.setTimestamp()

        if (!ReportInvLink.includes('https://discord.gg')) return message.channel.send(embednoinvlink)

        const ReportMessage = args.slice(2).join(" ")

        if (!ReportMessage) return message.channel.send(embednoinv)

        let embedmemreport = new Discord.MessageEmbed()
        embedmemreport.setDescription(`You're issue have been succesfully sent to the developers!`)
        embedmemreport.setThumbnail(botlogo)
        embedmemreport.setColor('GREEN')
        embedmemreport.setFooter('Requested By' + message.author.tag);
        embedmemreport.setTimestamp()

        message.channel.send(embedmemreport)

        let creds = [
            "Reporter Name", "Reporter ID", "Reported Guild Name", "Reported Guild ID", "Reported Guild Invite Link", "Reported Issue"
        ]

        let credsans = [
            `${message.author.tag}`, `${message.author.id}`, `${message.guild.name}`, `${message.guild.id}`, `[Here](${ReportInvLink})`, `${ReportMessage}`
        ]

        let embedmemtodevreport = new Discord.MessageEmbed()
        embedmemtodevreport.setTitle("Minecraft Server Status")
        embedmemtodevreport.setDescription("Report Panel Here :-")
        embedmemtodevreport.addFields([{
            "name": "Credentials",
            "value": creds,
            "inline": true
        },
        {
            "name": "Description",
            "value": credsans,
            "inline": true
        }
        ])
        embedmemtodevreport.setColor('YELLOW');
        embedmemtodevreport.setThumbnail(botlogo)
        embedmemtodevreport.setFooter('Requested By' + message.author.tag);
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
        embedHelp.addField("Updates", "For Updates [Join My Discord Server](https://discord.gg/EtCsyts)")
        embedHelp.setColor("BLUE");
        embedHelp.setThumbnail(botlogo)
        embedHelp.setFooter('Requested By' + message.author.tag);
        embedHelp.setTimestamp();
        message.channel.send(embedHelp);
    }
});

// Bot Activity
client.on('ready', () => {
    let status = `${prefix}help | ${prefix}setup`
    client.user.setActivity(status, { type: "WATCHING" })
});

// Bot Starting Console Logs
client.on('ready', () => {

    const ontext = ` 
  ______________________________
  Logged in as: ${client.user.tag}
  Servers: ${client.guilds.cache.size}
  Users: ${client.guilds.cache.reduce((total, guild) => total + guild.memberCount, 0)}
  ______________________________
  `
    console.log(ontext);
})

// Bot Login
client.login(bconfig.token);
import { EmbedBuilder } from "discord.js";

export default (client, message) => {

    const mentionRegex = RegExp(`^<@!?${client.user.id}>$`); 
    const prefix = client.config.bot.prefix;

    if (message.content.match(mentionRegex)) {
      const embed = new EmbedBuilder()
        .setColor(5763719)
        .setDescription(`**› My prefix is \`${prefix}\`**\n**› You can see my all commands type \`${prefix}\`help**`);
      message.channel.send({embeds: [embed]})
    };


    if (message.author.bot || message.channel.type === 'dm') return;



    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if (cmd) cmd.execute(client, message, args);
};
export default {
  name: "ping",
  description: "Ping command",

  execute(client, message, args) {
    message.channel.send({ content: `**${client.ws.ping}ms**` });
  },
};

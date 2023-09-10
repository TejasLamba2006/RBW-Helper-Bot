import { PermissionFlagsBits, MessageActionRow, MessageButton, MessageEmbed, MessageColor } from "discord.js";

export default {
  name: "ticket",
  description: "Ticket command",

  async execute(client, message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
      const errorMessage = await message.channel.send({
        content: "You need to have the **send message** permission to use this command ❌",
      });

      setTimeout(() => {
        errorMessage.delete();
        message.delete();
      }, 5000);
      return;
    }

    const setupEmbed = new MessageEmbed()
      .setColor(MessageColor.GREEN)
      .setDescription("Please select the required options for getting help");

    const inquiriesButton = new MessageButton()
      .setCustomId("ban_appeal")
      .setLabel("Ban Appeal")
      .setStyle(MessageButton.STYLES.DANGER);

    const hostingSupport = new MessageButton()
      .setCustomId("report")
      .setLabel("Hosting Support")
      .setStyle(MessageButton.STYLES.PRIMARY);

    const otherSupport = new MessageButton()
      .setCustomId("support")
      .setLabel("Other Support")
      .setStyle(MessageButton.STYLES.PRIMARY);

    const btnSupport = new MessageActionRow()
      .addComponents(inquiriesButton, hostingSupport, otherSupport);

    await message.channel.send({ embeds: [setupEmbed], components: [btnSupport] });
  },
};

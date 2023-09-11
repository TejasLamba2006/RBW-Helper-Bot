import { PermissionFlagsBits, ButtonBuilder, EmbedBuilder, Colors, ActionRowBuilder, ButtonStyle } from "discord.js";

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

    const setupEmbed = new EmbedBuilder()
      .setColor(Colors.Green)
      .setDescription("Please select the required options for getting help");

    const inquiriesButton = new ButtonBuilder()
      .setCustomId("ban_appeal")
      .setLabel("Ban Appeal")
      .setStyle(ButtonStyle.Danger);

    const hostingSupport = new ButtonBuilder()
      .setCustomId("report")
      .setLabel("Hosting Support")
      .setStyle(ButtonStyle.Primary);

    const otherSupport = new ButtonBuilder()
      .setCustomId("support")
      .setLabel("Other Support")
      .setStyle(ButtonStyle.Secondary);

    const btnSupport = new ActionRowBuilder()
      .addComponents(inquiriesButton, hostingSupport, otherSupport);

    await message.channel.send({ embeds: [setupEmbed], components: [btnSupport] });
  },
};

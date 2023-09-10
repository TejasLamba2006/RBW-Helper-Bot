import {
  EmbedBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  PermissionFlagsBits,
  InteractionType,
} from "discord.js";

import { AttachmentBuilder } from "discord.js";
import { quickExport } from "visa2discord";

export default async (client, interaction) => {
  let req;
  if (interaction.isButton()) {
    req = interaction.customId;
  } else if (interaction.isStringSelectMenu()) {
    req = req = interaction.values[0].split("_")[1];
  } else {
    return;
  }
  let reason;
  if (
    !interaction.member.permissions.has(PermissionFlagsBits.SendMessages) &&
    req !== "createTicket" &&
    req !== "newTicket"
  ) {
    return interaction.reply({
      content: "You don't have permission to do this ❌",
      ephemeral: true,
    });
  }
  switch (req) {
    case "inviteReward": {
      reason = interaction.values[0].split("_")[1].toLowerCase();
      const ticketChannels = interaction.guild.channels.cache.filter(
        (channel) =>
          channel.name.startsWith(`${reason}_${interaction.member.id}`)
      );

      if (ticketChannels.size !== 0) {
        return interaction.reply({
          content: `You already have multiple tickets open ❌`,
          components: [],
          ephemeral: true,
        });
      }

      interaction.guild.channels
        .create({
          name: `${reason}_${interaction.member.id}`,
          type: ChannelType.GuildText,
          parent: client.config.ticket.category,
          permissionOverwrites: [
            {
              id: interaction.member.id,
              allow: [
                PermissionFlagsBits.ViewChannel,
                PermissionFlagsBits.SendMessages,
              ],
            },
            {
              id: client.user.id,
              allow: [
                PermissionFlagsBits.ViewChannel,
                PermissionFlagsBits.SendMessages,
                PermissionFlagsBits.ManageChannels,
              ],
            },
            {
              id: interaction.guild.id,
              deny: [
                PermissionFlagsBits.ViewChannel,
                PermissionFlagsBits.SendMessages,
              ],
            },
          ],

          topic: `${reason} | ${interaction.member.user.username}`,
        })
        .then(async (channel) => {
          interaction.reply({
            content: `Your ticket has been created in ${channel} ✅`,
            ephemeral: true,
          });
          return channel.send({
            content: `${interaction.member.user}, Staff will be here shortly no need to ping them! @here`,
            embeds: [
              new EmbedBuilder()
                .setColor(16705372)
                .setAuthor({
                  name: `${interaction.member.user.username} has opened a ticket`,
                  iconURL: interaction.member.user.displayAvatarURL({
                    dynamic: true,
                  }),
                })
                .setDescription(client.config.embeds_description.invite)
                .setFooter({
                  text: `Ticket ID: ${channel.id}`,
                  iconURL: interaction.member.user.displayAvatarURL({
                    dynamic: true,
                  }),
                }),
            ],
            components: [
              new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                  .setStyle(ButtonStyle.Danger)
                  .setLabel("Close this ticket")
                  .setCustomId(`closeTicket`),
                new ButtonBuilder()
                  .setStyle(ButtonStyle.Primary)
                  .setLabel("Reopen this ticket")
                  .setCustomId(`reopenTicket`)
              ),
            ],
          });
        });

      break;
    }

    case "payReward": {
      reason = interaction.values[0].split("_")[1].toLowerCase();
      const ticketChannels = interaction.guild.channels.cache.filter(
        (channel) =>
          channel.name.startsWith(`${reason}_${interaction.member.id}`)
      );

      if (ticketChannels.size !== 0) {
        return interaction.reply({
          content: `You already have multiple tickets open ❌`,
          components: [],
          ephemeral: true,
        });
      }

      interaction.guild.channels
        .create({
          name: `${reason}_${interaction.member.id}`,
          type: ChannelType.GuildText,
          parent: client.config.ticket.category,
          permissionOverwrites: [
            {
              id: interaction.member.id,
              allow: [
                PermissionFlagsBits.ViewChannel,
                PermissionFlagsBits.SendMessages,
              ],
            },
            {
              id: client.user.id,
              allow: [
                PermissionFlagsBits.ViewChannel,
                PermissionFlagsBits.SendMessages,
                PermissionFlagsBits.ManageChannels,
              ],
            },
            {
              id: interaction.guild.id,
              deny: [
                PermissionFlagsBits.ViewChannel,
                PermissionFlagsBits.SendMessages,
              ],
            },
          ],

          topic: `${reason} | ${interaction.member.user.username}`,
        })
        .then(async (channel) => {
          interaction.reply({
            content: `Your ticket has been created in ${channel} ✅`,
            ephemeral: true,
          });
          return channel.send({
            content: `${interaction.member.user}, Staff will be here shortly no need to ping them! @here`,
            embeds: [
              new EmbedBuilder()
                .setColor(16705372)
                .setAuthor({
                  name: `${interaction.member.user.username} has opened a ticket`,
                  iconURL: interaction.member.user.displayAvatarURL({
                    dynamic: true,
                  }),
                })
                .setDescription(client.config.embeds_description.pay)
                .setFooter({
                  text: `Ticket ID: ${channel.id}`,
                  iconURL: interaction.member.user.displayAvatarURL({
                    dynamic: true,
                  }),
                }),
            ],
            components: [
              new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                  .setStyle(ButtonStyle.Danger)
                  .setLabel("Close this ticket")
                  .setCustomId(`closeTicket`),
                new ButtonBuilder()
                  .setStyle(ButtonStyle.Primary)
                  .setLabel("Reopen this ticket")
                  .setCustomId(`reopenTicket`)
              ),
            ],
          });
        });
      break;
    }
    case "inquiries": {
      reason = "inquiries";
      const ticketChannels = interaction.guild.channels.cache.filter(
        (channel) =>
          channel.name.startsWith(`${reason}_${interaction.member.id}`)
      );

      if (ticketChannels.size !== 0) {
        return interaction.reply({
          content: `You already have multiple tickets open ❌`,
          components: [],
          ephemeral: true,
        });
      }

      interaction.guild.channels
        .create({
          name: `${reason}_${interaction.member.id}`,
          type: ChannelType.GuildText,
          parent: client.config.ticket.category,
          permissionOverwrites: [
            {
              id: interaction.member.id,
              allow: [
                PermissionFlagsBits.ViewChannel,
                PermissionFlagsBits.SendMessages,
              ],
            },
            {
              id: client.user.id,
              allow: [
                PermissionFlagsBits.ViewChannel,
                PermissionFlagsBits.SendMessages,
                PermissionFlagsBits.ManageChannels,
              ],
            },
            {
              id: interaction.guild.id,
              deny: [
                PermissionFlagsBits.ViewChannel,
                PermissionFlagsBits.SendMessages,
              ],
            },
          ],

          topic: `${reason} | ${interaction.member.user.username}`,
        })
        .then(async (channel) => {
          interaction.reply({
            content: `Your ticket has been created in ${channel} ✅`,
            ephemeral: true,
          });
          return channel.send({
            content: `${interaction.member.user}, Staff will be here shortly no need to ping them! @here`,
            embeds: [
              new EmbedBuilder()
                .setColor(16705372)
                .setAuthor({
                  name: `${interaction.member.user.username} has opened a ticket`,
                  iconURL: interaction.member.user.displayAvatarURL({
                    dynamic: true,
                  }),
                })
                .setDescription(client.config.embeds_description.support)
                .setFooter({
                  text: `Ticket ID: ${channel.id}`,
                  iconURL: interaction.member.user.displayAvatarURL({
                    dynamic: true,
                  }),
                }),
            ],
            components: [
              new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                  .setStyle(ButtonStyle.Danger)
                  .setLabel("Close this ticket")
                  .setCustomId(`closeTicket`),
                new ButtonBuilder()
                  .setStyle(ButtonStyle.Primary)
                  .setLabel("Reopen this ticket")
                  .setCustomId(`reopenTicket`)
              ),
            ],
          });
        });
      break;
    }
    case "otherSupport": {
      console.log(1);
      reason = "other";
      const ticketChannels = interaction.guild.channels.cache.filter(
        (channel) =>
          channel.name.startsWith(`${reason}_${interaction.member.id}`)
      );

      if (ticketChannels.size !== 0) {
        return interaction.reply({
          content: `You already have multiple tickets open ❌`,
          components: [],
          ephemeral: true,
        });
      }

      interaction.guild.channels
        .create({
          name: `${reason}_${interaction.member.id}`,
          type: ChannelType.GuildText,
          parent: client.config.ticket.category,
          permissionOverwrites: [
            {
              id: interaction.member.id,
              allow: [
                PermissionFlagsBits.ViewChannel,
                PermissionFlagsBits.SendMessages,
              ],
            },
            {
              id: client.user.id,
              allow: [
                PermissionFlagsBits.ViewChannel,
                PermissionFlagsBits.SendMessages,
                PermissionFlagsBits.ManageChannels,
              ],
            },
            {
              id: interaction.guild.id,
              deny: [
                PermissionFlagsBits.ViewChannel,
                PermissionFlagsBits.SendMessages,
              ],
            },
          ],

          topic: `${reason} | ${interaction.member.user.username}`,
        })
        .then(async (channel) => {
          interaction.reply({
            content: `Your ticket has been created in ${channel} ✅`,
            ephemeral: true,
          });
          return channel.send({
            content: `${interaction.member.user}, Staff will be here shortly no need to ping them! @here`,
            embeds: [
              new EmbedBuilder()
                .setColor(16705372)
                .setAuthor({
                  name: `${interaction.member.user.username} has opened a ticket`,
                  iconURL: interaction.member.user.displayAvatarURL({
                    dynamic: true,
                  }),
                })
                .setDescription(client.config.embeds_description.support)
                .setFooter({
                  text: `Ticket ID: ${channel.id}`,
                  iconURL: interaction.member.user.displayAvatarURL({
                    dynamic: true,
                  }),
                }),
            ],
            components: [
              new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                  .setStyle(ButtonStyle.Danger)
                  .setLabel("Close this ticket")
                  .setCustomId(`closeTicket`),
                new ButtonBuilder()
                  .setStyle(ButtonStyle.Primary)
                  .setLabel("Reopen this ticket")
                  .setCustomId(`reopenTicket`)
              ),
            ],
          });
        });
      break;
    }
    case "hostingSupport": {
      reason = "hosting";
      const ticketChannels = interaction.guild.channels.cache.filter(
        (channel) =>
          channel.name.startsWith(`${reason}_${interaction.member.id}`)
      );

      if (ticketChannels.size !== 0) {
        return interaction.reply({
          content: `You already have multiple tickets open ❌`,
          components: [],
          ephemeral: true,
        });
      }

      interaction.guild.channels
        .create({
          name: `${reason}_${interaction.member.id}`,
          type: ChannelType.GuildText,
          parent: client.config.ticket.category,
          permissionOverwrites: [
            {
              id: interaction.member.id,
              allow: [
                PermissionFlagsBits.ViewChannel,
                PermissionFlagsBits.SendMessages,
              ],
            },
            {
              id: client.user.id,
              allow: [
                PermissionFlagsBits.ViewChannel,
                PermissionFlagsBits.SendMessages,
                PermissionFlagsBits.ManageChannels,
              ],
            },
            {
              id: interaction.guild.id,
              deny: [
                PermissionFlagsBits.ViewChannel,
                PermissionFlagsBits.SendMessages,
              ],
            },
          ],

          topic: `${reason} | ${interaction.member.user.username}`,
        })
        .then(async (channel) => {
          interaction.reply({
            content: `Your ticket has been created in ${channel} ✅`,
            ephemeral: true,
          });
          return channel.send({
            content: `${interaction.member.user}, Staff will be here shortly no need to ping them! @here`,
            embeds: [
              new EmbedBuilder()
                .setColor(16705372)
                .setAuthor({
                  name: `${interaction.member.user.username} has opened a ticket`,
                  iconURL: interaction.member.user.displayAvatarURL({
                    dynamic: true,
                  }),
                })
                .setDescription(client.config.embeds_description.support)
                .setFooter({
                  text: `Ticket ID: ${channel.id}`,
                  iconURL: interaction.member.user.displayAvatarURL({
                    dynamic: true,
                  }),
                }),
            ],
            components: [
              new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                  .setStyle(ButtonStyle.Danger)
                  .setLabel("Close this ticket")
                  .setCustomId(`closeTicket`),
                new ButtonBuilder()
                  .setStyle(ButtonStyle.Primary)
                  .setLabel("Reopen this ticket")
                  .setCustomId(`reopenTicket`)
              ),
            ],
          });
        });
      break;
    }
    case "closeTicket": {
      const channel = interaction.guild.channels.cache.get(
        interaction.channelId
      );
      await channel.edit({
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
            ],
          },
          {
            id: channel.name.split("_")[1].toString(),
            deny: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
            ],
          },
          {
            id: client.user.id,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
            ],
          },
        ],
      });

      const ticketEmbed = new EmbedBuilder();

      ticketEmbed.setColor(15548997);
      ticketEmbed.setAuthor({
        name: `${interaction.member.user.username} has decided to close this ticket ❌`,
        iconURL: interaction.member.user.displayAvatarURL({ dynamic: true }),
      });
      ticketEmbed.setDescription(
        "*To permanently delete the ticket or to reopen the ticket click on the button below.*"
      );

      const reopenButton = new ButtonBuilder();

      reopenButton.setStyle(ButtonStyle.Success);
      reopenButton.setLabel("Reopen this ticket");
      reopenButton.setCustomId(`reopenTicket`);

      const deleteButton = new ButtonBuilder();

      deleteButton.setStyle(ButtonStyle.Danger);
      deleteButton.setLabel("Delete this ticket");
      deleteButton.setCustomId("deleteTicket");

      const row = new ActionRowBuilder().addComponents(
        reopenButton,
        deleteButton
      );

      return interaction.reply({ embeds: [ticketEmbed], components: [row] });
      break;
    }

    case "reopenTicket": {
      const channel = interaction.guild.channels.cache.get(
        interaction.channelId
      );

      await channel.edit({
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
            ],
          },
          {
            id: channel.name.split("_")[1].toString(),
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
            ],
          },
          {
            id: client.user.id,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
            ],
          },
        ],
      });

      const ticketEmbed = new EmbedBuilder();

      ticketEmbed.setColor(5763719);
      ticketEmbed.setAuthor({
        name: `Your ticket has been successfully reopened ${interaction.member.user.username} ✅`,
        iconURL: interaction.member.user.displayAvatarURL({ dynamic: true }),
      });
      ticketEmbed.setDescription(
        "*To close the current ticket click on the reaction below, warning it is impossible to go back!*"
      );

      const closeButton = new ButtonBuilder();

      closeButton.setStyle(ButtonStyle.Danger);
      closeButton.setLabel("Close this ticket");
      closeButton.setCustomId(
        `closeTicket_${interaction.customId.split("_")[1]}`
      );

      const row = new ActionRowBuilder().addComponents(closeButton);

      return interaction.reply({ embeds: [ticketEmbed], components: [row] });
      break;
    }

    case "deleteTicket": {
      const channel = interaction.guild.channels.cache.get(
        interaction.channelId
      );
      const ticketOpener = channel.name.split("_")[1];
      const ticketOpenerUser =
        interaction.guild.members.cache.get(ticketOpener);
      const transcript = await quickExport(channel);
      const logChannel = interaction.guild.channels.cache.get(
        client.config.ticket.logs
      );
      const gone = await logChannel.send({
        files: [new AttachmentBuilder(transcript, { name: "transcript.html" })],
      });
      const logsEmbed = [
        new EmbedBuilder().setColor(16705372).addFields(
          {
            name: "Ticket Opened by",
            value: `${ticketOpener}`,
            inline: false,
          },
          {
            name: "Ticket Name",
            value: `${channel.name}`,
            inline: true,
          },
          {
            name: "Users in Ticket",
            value: `${channel.members.map((m) => m).join("\n")}`,
            inline: true,
          },
          {
            name: "Online Transcripts",
            value: `[Click Here](${client.config.ticket.viewURL}?file=${
              gone.attachments.first().url
            })`,
            inline: true,
          }
        ),
      ];
      if (logChannel) {
        await gone.edit({
          embeds: logsEmbed,
        });
      }
      ticketOpenerUser
        .send({
          content: `Your ticket has been deleted by ${interaction.member.user.username} ✅`,
          embeds: logsEmbed,
        })
        .then(() => {});
      await channel.delete();
      break;
    }
  }
};

import { Activity } from "discord.js";

export default async (client) => {
  client.logger.log(`${client.user.username} is online`, "ready");

  const statuses = ["Tickets", "YOU 👁👄👁"];
  setInterval(() => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(status, { type: Activity.WATCHING });
  }, 10000);
};

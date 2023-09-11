/**
 * Project: RBW Helper Bot
 * Author: Tejas Lamba
 * Copyright (c) 2023. All rights reserved.
 * This code is the property of Authors and may not be reproduced or
 * modified or distributed without permission. For more information,
 * dm the author on discord.
 */
import * as config from "./config.js";
import logger from "./src/logger.js";
import express from "express";
import { Client, GatewayIntentBits, Options } from "discord.js";
import "dotenv/config";

const app = express();
const port = 3000;

app.get("/", (req, res) =>
  res.send({ error: false, message: "Ticket Bot is online!" })
);
app.listen(port, () => console.log(`Web Server Listening on port ${port}!`));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  sweepers: {
    ...Options.DefaultSweeperSettings,
    messages: {
      interval: 3600, // Every hour...
      lifetime: 1800, // Remove messages older than 30 minutes.
    },
    users: {
      interval: 3600, // Every hour...
      filter: () => (user) => user.bot && user.id !== client.user.id, // Remove all bots.
    },
  },
});

client.config = config;
client.logger = logger;

process.on("unhandledRejection", (error) => console.log(error, "error"));
process.on("uncaughtException", (error) => console.log(error, "error"));

client.login(process.env.token);

import "./src/handler.js";
export { client };
import { readdirSync } from "fs";
import { Collection } from "discord.js";
import { client } from "../index.js";
import logger from "./logger.js";
const commands = new Collection();

const loadEvents = async () => {
  const events = readdirSync("./events/").filter((file) =>
    file.endsWith(".js")
  );
  logger.log(`Loading events...`, "event");

  for (const file of events) {
    try {
      const module = await import(`../events/${file}`);
      const event = module.default;
      logger.log(`-> Loaded event ${file.split(".")[0]}`, "event");
      client.on(file.split(".")[0], event.bind(null, client));
    } catch (error) {
      console.error(error);
    }
  }
};

const loadCommands = async () => {
  const commandFiles = readdirSync("./commands/").filter((file) =>
    file.endsWith(".js")
  );
  logger.log(`Loading commands...`, "command");

  for (const file of commandFiles) {
    try {
      const module = await import(`../commands/${file}`);
      const command = module.default;
      logger.log(
        `-> Loaded command ${command.name.toLowerCase()}`,
        "command"
      );
      commands.set(command.name.toLowerCase(), command);
    } catch (error) {
      console.error(error);
    }
  }
};

loadEvents();
loadCommands();

export { commands };

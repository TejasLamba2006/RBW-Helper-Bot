import chalk from 'chalk';
import moment from 'moment';

export default class Logger {
  static log(content, type = "log") {
    const date = `${moment().utcOffset('+05:30').format("DD-MM-YYYY hh:mm:ss")}`;
    const logTypes = {
      log: chalk.black.bgBlue,
      warn: chalk.black.bgYellow,
      error: chalk.black.bgRed,
      debug: chalk.black.bgGreen,
      command: chalk.black.bgWhite,
      event: chalk.black.bgWhite,
      ready: chalk.black.bgBlueBright,
      shard: chalk.black.bgMagenta
    };
    if (logTypes[type]) {
      return console.log(`[${chalk.gray(date)}]: [${logTypes[type](type.toUpperCase())}] ${content}`);
    } else {
      throw new TypeError("Logger type must be either warn, debug, log, ready, cmd, or error.");
    }
  }
}

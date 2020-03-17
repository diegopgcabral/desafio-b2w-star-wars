import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  format: format.combine(
    format.simple(),
    format.timestamp(),
    format.printf(info => `[${info.timestamp}] ${info.level} : ${info.message}`)
  ),
  transports: [
    new transports.File({
      maxsize: 51200000,
      maxFiles: 5,
      filename: `${__dirname}/../logs/api-starwars.log`,
    }),
    // new transports.Console({
    //   level: 'debug',
    // }),
  ],
});

export default logger;

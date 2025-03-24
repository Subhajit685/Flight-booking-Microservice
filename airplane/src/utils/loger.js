import { createLogger, format, transports } from "winston"
const { combine, timestamp, label, printf } = format


const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
        label({ label: 'right meow!' }),
        timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
        myFormat
    ),
    transports: [new transports.Console()],
    transports: [new transports.File({ filename: 'airplane.log' })]
});

export default logger
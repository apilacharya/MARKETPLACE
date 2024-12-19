import pino from 'pino'
import PinoHttp from 'pino-http'


export const logger = pino({ level: 'info' , 
    transport: {
        target: "pino-pretty"
    }
})
export const httpLogger = PinoHttp({logger})


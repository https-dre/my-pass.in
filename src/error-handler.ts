import { FastifyInstance } from "fastify";
import { BadRequest } from "./routes/_errors/bad-request";
import { ZodError } from "zod";

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
    if(error instanceof ZodError) {
        return reply.status(400).send({
            message: `Error during validating`,
            errors: error.flatten().fieldErrors
        })
    }
    
    if (error instanceof BadRequest) {
        return reply.status(error.statusNumber).send({ message: error.message})
    }

    console.log(`\t[ERROR]: erro não tratado ocorrido: ${error}`)
    return reply.status(500).send(error)
}
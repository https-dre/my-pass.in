import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "./_errors/bad-request";

export async function createAdmRoute(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .post('/administrators', {
            schema: {
                body: z.object({
                    login: z.string(),
                    password: z.string()
                }),
                response: {
                    201: z.object({
                        id: z.string().uuid(),
                        createdAt: z.string()
                    })
                }
            }
        }, async (request, reply) => {
            const { login, password } = request.body;

            const admWithLogin = await prisma.administrator.findUnique({
                where: {
                    login: login
                }
            })

            if (admWithLogin !== null) {
                throw new BadRequest('login already exists')
            }

            const newAdm = await prisma.administrator.create({
                data: {
                    login,
                    password
                }
            })

            return reply.status(201).send({
                id: newAdm.id,
                createdAt: newAdm.createdAt.toDateString()
            })
        })
}
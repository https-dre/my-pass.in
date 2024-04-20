import { prisma } from "../src/lib/prisma";
async function seed() {
    await prisma.event.create({
        data: {
            id: '6325d7d5-0bf3-40ac-94eb-a471a463e991',
            title: 'default event seed',
            slug: 'default seed',
            details: 'default seed ',
            maximumAttendes: 120
        }
    })
}

seed().then(() => {
    console.log('Database seeded')
})
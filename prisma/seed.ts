import { prisma } from "../src/lib/prisma";
async function seed() {
    await prisma.administrator.create({
        data: {
            id: "27ed5e08-ff62-11ee-af03-325096b39f47",
            login: "default-administrator-seed",
            password: "default-administrator-password"
        }
    })

    await prisma.event.create({
        data: {
            id: '6325d7d5-0bf3-40ac-94eb-a471a463e991',
            title: 'default event seed',
            slug: 'default seed',
            details: 'default seed ',
            maximumAttendes: 120,
            admId: "27ed5e08-ff62-11ee-af03-325096b39f47"
        }
    })
}

seed().then(() => {
    console.log('Database seeded')
})
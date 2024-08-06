import { PrismaClient } from '@prisma/client';

export const PrismaSeedInstance: PrismaClient = new PrismaClient()

async function main(): Promise<void> {
    console.log('Start seeding ...')

    //SEEDS HERE
    //await leadModalitiesSeed();
    //await leadInterestedInSeed();

    console.log('Seeding finished.')
}

main()
    .catch((e) => {
        console.error(e)

        process.exit(1)
    })
    .finally(async () => await PrismaSeedInstance.$disconnect())

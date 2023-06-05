import prisma from '../src/config/database.connection.js'
async function main() {
    await prisma.games.createMany({
        data: [
            {
                "id": 3890,
                "title": "Malicious Rebirth",
                "release_date": "2013-10-08",
            },
            {
                "id": 5000,
                "title": "Rocket Knight",
                "release_date": "2010-05-11",
            },
            {
                "id": 4500,
                "title": "Stick Man Rescue",
                "release_date": "2012-01-10",
            },
            {
                "id": 4505,
                "title": "Carnival Island",
                "release_date": "2011-11-15",
            }
        ]
    })
    await prisma.users.createMany({
        data: [
            {
                "name": "teste1",
                "email": "gabe@gmail.com",
                "password": "1122"
            }
        ]
    })
};

main()
    .then(() => {
        console.log("Registro feito com sucesso")
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
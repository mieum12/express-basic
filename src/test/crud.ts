import { PrismaClient } from "@prisma/client";

let client = new PrismaClient();

async function main() {
  //1. insert into "user"
  await client.user.create({
    data: {
      username: "jiwon3",
      password: "xxx",
    },
  });

  //select * from "user" where id = 1;
  let user1 = await client.user.findMany();
  console.log(user1);

  //2. update
  await client.user.update({
    data: {
      username: "new jiwon",
    },
    where: {
      id: 1,
    },
  });
  //select
  let user2 = await client.user.findMany();
  console.log(user2);

  //3. delete
  await client.user.delete({
    where: {
      id: 1,
    },
  });
  //select
  let user3 = await client.user.findMany();
  console.log(user3);
}

main();

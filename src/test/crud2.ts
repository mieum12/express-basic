import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

async function main() {
  //select id, username from "User" -select
  //inser into "User" (username) values ('dddd') - data
  //inser into "Phone" (phoneNumber) values ('010-0000-0000')
  // select * from "User" join "Phone" on "User".id="Phone"."userId" where id = 방금 만든 ㅏ용자 id
  //join - include
  const user = await client.user.create({
    data: {
      username: "hh",
      password: "hh",
      phone: {
        create: {
          phoneNumber: "555-5555-5555", //user에 자동으로 연결
        },
      },
    },
    include: {
      phone: true,
    },
  });

  console.log(user);

  const updateUser = await client.user.update({
    data: {
      username: "hh",
    },
    where: {
      id: user.id,
    },
    include: {
      phone: true,
    },
  });
  console.log(updateUser);

  const foundUser = await client.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      phone: true,
    },
  });

  console.log(foundUser);

  await client.user.delete({
    where: {
      id: user.id,
    },
  });
}

main();

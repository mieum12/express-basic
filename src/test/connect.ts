import { PrismaClient } from "@prisma/client";

let client = new PrismaClient();
async function main() {
  //사용자 생성
  //phone도 같이 생성

  //insert into "user" (username, password) values ('asd', 'fdsg')
  //insert into "phone" (phoneNumber, userId) values ("010-1234-5678", 12)
  // const user = await client.user.create({
  //   data: {
  //     username: "bddgb",
  //     password: "df",
  //     Phone: {
  //       create: {
  //         phoneNumber: "010-1234-5678",
  //       },
  //     },
  //   },
  // });
  // console.log(user);

  const user = await client.user.findUnique({
    where: {
      id: 19, //DB에 저장된 id값
    },
    include: {
      phone: {
        select: {
          phoneNumber: true,
          id: true,
        },
      },
    },
  });
  console.log(user);

  const phone = await client.phone.findUnique({
    where: { id: 10 },
    // join user as u on user.id = phone.user_id
    // include: {
    //   user: true
    // },

    //select u.id, name, password, from "user";
    select: {
      id: true,
      user: true,
      phoneNumber: true,
      userId: false,
    },
  });
}

main();

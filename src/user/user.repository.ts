// import { PrismaUser } from "../db.table";
// import { CreateUserDto } from "./dto/create-user.dto";

// const prismaUser = new PrismaUser();

// const;
// export class UserRepository {
//   //1.특정 id를 가진 사용자 정보 가져오기
//   findById(id: number) {
//     const user = prismaUser.findById(id);
//     return user;
//   }
//   //2. DB에서 특정 username를 가진 사용자 정보 가져오기
//   findByUsername(username: string) {
//     const user = prismaUser.findByUsername(username);
//     return user;
//   }
//   //3. 사용자 DB에서 만들기
//   create({ password, username }: CreateUserDto) {
//     const userId = prismaUser.create({ username, password });
//     return userId;
//   }
//   //4. 사용자 DB에서 삭제하기
//   remove(id: number) {
//     prismaUser.remove(id);
//   }
//   //5.DB에 저장된 모든 사용자 가져오기
//   findAll() {
//     const users = prismaUser.findAll();
//     return users;
//   }
// }

import { PrismaClient } from "@prisma/client";
import { PrismaUser } from "../db.table";
import { CreateUserDto } from "./dto/create-user.dto";

// const prismaUser = new PrismaUser();
const client = new PrismaClient();

//client는 비동기로 사용하기 때문에 async-await사용해야한다
//repo, service, controller다 바꿔야함

export class UserRepository {
  // 1. 사용자 생성
  async create({ password, username }: CreateUserDto) {
    // return prismaUser.create({ password, username });
    const user = await client.user.create({
      data: {
        username,
        password,
      },
      select: {
        id: true,
      },
    });

    return user.id;
  }

  // 2. 사용자 조회
  async findById(id: number) {
    // return prismaUser.findById(id);
    const user = await client.user.findUnique({
      where: { id },
    });
    return user;
  }

  // 2. 사용자 조회
  async findByUsername(username: string) {
    // return prismaUser.findByUsername(username);
    const user = await client.user.findUnique({
      where: { username },
    });
    return user;
  }

  // 3. 사용자 전체 조회
  //select * from "User" order by id asc
  async findAll() {
    // return prismaUser.findAll();
    const allUsers = await client.user.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return allUsers;
  }

  // 4. 사용자 삭제
  async delete(id: number) {
    // prismaUser.remove(id);
    await client.user.delete({
      where: { id },
    });
  }
}

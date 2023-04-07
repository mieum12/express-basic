// 회원 정보를 저장하는 DB(사실은 Map)

import { CreateUserDto } from "./user/dto/create-user.dto";
import { UserEntity } from "./user/entity/user.entity";

// key: id(number), value: UserEntity
const USER_TABLE = new Map<number, UserEntity>();

export class PrismaUser {
  create({ username, password }: CreateUserDto) {
    // 1. id를 만든다.(id는 DB에서 대체로 자동 생성)
    const id = USER_TABLE.size + 1;
    const userEntity = new UserEntity(id, username, password);
    USER_TABLE.set(id, userEntity);

    return id;
  }

  findById(id: number) {
    return USER_TABLE.get(id);
  }

  findAll() {
    const userEntities: UserEntity[] = [];
    for (const [id, userEntity] of USER_TABLE.entries()) {
      userEntities.push(
        new UserEntity(id, userEntity.username, userEntity.password)
      );
    }
    return userEntities;
  }
  update() {}
  remove(id: number) {
    USER_TABLE.delete(id);
  }

  findByUsername(username: string) {
    for (const [, userEntity] of USER_TABLE.entries()) {
      if (userEntity.username === username) {
        return userEntity;
      }
    }
    return undefined;
  }
}

// const prismaUser = {
//   create({ username, password }: CreateUserDto) {},
//   findFirst() {},
//   findAll() {},
//   update() {},
//   remove() {},
// };

// const pu = new PrismaUser();
// pu.findFirst();

// mongoose
// User.findOne({id})
// User.findById(id)

// prisma
// prisma.user.findFirst({where:{id}})
// prisma.user.findUnique({where: {id}});

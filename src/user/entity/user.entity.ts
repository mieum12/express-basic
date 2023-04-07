// entity -  DB에 들어가는 TABLE의 COLUMN과 일치하는 형태

export class UserEntity {
  id: number;
  username: string;
  password: string;

  constructor(id: number, username: string, password: string) {
    this.id = id;
    this.username = username;
    this.password = password;
  }
}

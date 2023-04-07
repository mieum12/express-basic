export class User {
  id: number;
  username: string;
  password: string;

  constructor(id: number, username: string, password: string) {
    // this = {}
    //this = {id:1, username:'j', password;'k'};
    this.id = id;
    this.username = username;
    this.password = password;

    //return this;
  }
}

//new User를 쓰면 class안에 constructor 호출
const user = new User(1, "j", "k");

import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { UserDto } from "./dto/user.dto";
import { UserEntity } from "./entity/user.entity";
import { UserRepository } from "./user.repository";

const userRepository = new UserRepository();

export class UserService {
  //service는 비즈니스 로직(회사 핵심 로직)이 들어가는 곳이기 떄문에
  //개발자가 아닌 사람들도 이름을 보고 기능을 파악할 수 있도록
  //Repository랑 조금 다르게 친사업적인 메소드명을 가지는듯

  //1. 특정 id를 가진 사용자 정보 가져오기
  async getUser(id: number) {
    const user = await userRepository.findById(id);

    //먼저 user가 undefined일 경우 거르기
    if (!user) {
      return undefined;
    }
    //DTO만들기(비번 제외)
    const userDto: UserDto = { username: user.username, id: user.id };

    return userDto; //entity가 아니라 가공된 DTO를 반환한다
  }

  //2. 모든 유저 가져오기
  // TODO: entity를 DTO로
  async getUsers() {
    return await userRepository.findAll();
  }

  //3. 회원가입
  async signup({ password, username }: CreateUserDto) {
    //(1)사용자가 DB에 존재하는지 확인, 이미 존재하는 회원인 경우 오류
    const foundUser = await userRepository.findByUsername(username);
    if (foundUser) {
      throw new Error("이미 존재하는 회원입니다");
    }
    //(2)(그게 아니라면) 회원 생성(회원 DB에 만들기) 및 user id 반환
    const userId = await userRepository.create({ password, username });
    return userId;
  }

  //4.로그인
  async login({ password, username }: LoginDto) {
    // (1)존재하지 않는 회원인 경우
    //사용자를 DB에서 가져옴
    const user = await userRepository.findByUsername(username);
    //사용자가 없는 경우 undefined -> 이 경우 무조건 오류 발생시킴
    if (!user) {
      // user
      throw new Error("존재하지 않는 회원입니다");
    } //user
    // (2)입력된 비번과 DB에 저장된 사용자의 비번이 다른 경우 오류 (유저가 undefined인거 걸러진 후)
    if (password !== user.password) {
      throw new Error("비밀번호가 다릅니다");
    }
    //TODO: 인증 과정 추가!
    return true;
  }
  //5. 회원탈퇴
  async withdraw(id: number) {
    // (1)DB에 해당 id인 회원이 존재하지 않는 경우
    const user = await userRepository.findById(id);
    if (!user) {
      // 오류를 발생시킴 thorow new Error("msg")
      throw new Error("회원이 존재하지 않음");
    }
    // (2)회원 DB에서 삭제(이제 무조건 회원인 경우)
    await userRepository.delete(id);
  }
}

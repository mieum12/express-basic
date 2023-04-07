import { Request, Response } from "express";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { UserService } from "./user.service";

const userService = new UserService();

export class UserController {
  //1.회원가입
  async signup(req: Request, res: Response) {
    // (1)request body에서 사용자가 브라우저에서 입력한 데이터 추출
    if (!req.body.username || !req.body.password) {
      res.status(400).json({
        //사용자가 입력한 값이 빠져있거나 이상한 경우 400을 줌
        err: "유효하지 않은 값입니다",
      });
      return; //여기서 한번 끊어줌
    }

    // (2)그걸 DTO로 만들어줌
    const { username, password } = req.body;
    const CreateUserDto: CreateUserDto = {
      password,
      username,
    };

    try {
      const userId = await userService.signup(CreateUserDto);
      res.json({
        userId,
      });
    } catch (e) {
      const err = e as Error;
      res.status(400).json({
        err: err.message,
      });
    }
    // (3)서비스 호출
    // (4)실패 시 응답코드 400반환
    // (5)성공시 userId 반환
  }

  //2.로그인
  async login(req: Request, res: Response) {
    // (1)request body에서 사용자가 브라우저에서 입력한 데이터 추출
    if (!req.body.username || !req.body.password) {
      res.status(400).json({
        //사용자가 입력한 값이 빠져있거나 이상한 경우 400을 줌
        err: "유효하지 않은 값입니다",
      });
      return; //여기서 한번 끊어줌
    }

    // (2)그걸 DTO로 만들어줌
    const { username, password } = req.body;
    const loginDto: LoginDto = {
      password,
      username,
    };

    try {
      //로그인 성공 시, {msg: '로그인 성공'}
      await userService.login(loginDto);
      res.json({
        msg: "로그인 성공",
      });
    } catch (e) {
      //실패 시 err에 오류 메세지 service에서 넣은걸로 반환하기
      const err = e as Error;
      res.status(400).json({
        err: err.message,
      });
    }
  }

  //3.사용자 정보
  async getUser(req: Request, res: Response) {
    //GET /users/:id
    const id = +req.params.id;

    //반환 성공 시 {user: UserDto | undefined}
    try {
      const user = await userService.getUser(id);
      res.json({ user });

      // 반환 오류 시 {err: e.message}
    } catch (e) {
      const err = e as Error;
      res.status(400).json({
        err: err.message,
      });
    }
  }

  //4.모든 사용자 정보
  async getAllUsers(req: Request, res: Response) {
    const users = await userService.getUsers();
    res.json({ users });
  }

  //5. 회원탈퇴
  async withdraw(req: Request, res: Response) {
    const id = +req.params.id;
    try {
      await userService.withdraw(id);
      res.json({
        msg: "회원 탈퇴 완료!",
      });
    } catch (e) {
      const err = e as Error;
      res.status(400).json({
        err: err.message,
      });
    }
  }
}

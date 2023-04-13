import { CreatPostDto } from "./dto/create-post.dto";
import { PostService } from "./posts.service";
import { Request, Response } from "express";

const postService: PostService = new PostService();

//컨트롤러는 (검증) 요청, 응답을 처리하는 역할을 한다

export class PostController {
  //1.글 작성하기
  //TODO: ID를 나중에 토큰에서 받기
  async write(req: Request, res: Response) {
    const { myId } = req.body;

    const { title, content } = req.body;

    if (!title || !content) {
      res.status(400).json({
        err: "제목과 내용을 모두 입력해주세요",
      });
      return;
    }

    const createPostDto: CreatPostDto = {
      title,
      content,
    };

    try {
      const postId = await postService.write(+myId, createPostDto);
      res.status(201).json({
        postId,
      });
    } catch (e) {
      const err = e as Error;
      res.status(400).json({
        err: err.message,
      });
    }
  }

  //2. 글 수정하기
  async edit(req: Request, res: Response) {}

  //3. 글 삭제하기
  async delete(req: Request, res: Response) {
    const { myId } = req.body;
    const { id } = req.params;
    try {
      await postService.delete(+myId, +id);
      res.json({
        msg: "ok",
      });
    } catch (e) {
      const err = e as Error;
      res.json({
        err: err.message,
      });
    }
  }

  //4. 블로그 글 가져오기
  async getById(req: Request, res: Response) {
    const { id } = req.params;
    console.log(id);
    try {
      const post = await postService.getById(+id);
      res.json({
        post,
      });
    } catch (e) {
      const err = e as Error;
      res.status(400).json({
        err: err.message,
      });
    }
  }

  //5.모든 블로그 글 가져오기
  async getAll(req: Request, res: Response) {
    //문자열을 숫자로
    // const MyId: number = parseInt(req.params.postId);
    const { myId } = req.body;

    try {
      const posts = await postService.getMine(+myId);
      res.json({
        posts,
      });
    } catch (e) {
      const err = e as Error;
      res.status(400).json({
        err: err.message,
      });
    }
  }
}

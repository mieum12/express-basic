import { PrismaClient } from "@prisma/client";
import { CreatPostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

const client = new PrismaClient();

export class PostRepository {
  //게시글 생성
  async create(myId: number, { title, content }: CreatPostDto) {
    //userId와 Post의 authorId의 연결이 필요함
    //그래서 post를 만들 때 로그인 된 사용자의 id를 myId로 받아서 연결하는데 사용할 것
    //return은 post의 id만 하도록 함
    const { id } = await client.post.create({
      data: {
        // title: title,
        title,
        content,
        authorId: myId,
      },
      //최적화.. select if from "User"
      select: { id: true },
    });
    return id;
  }

  //게시글 조회
  async findById(postId: number) {
    const post = await client.post.findUnique({
      where: { id: postId },
    });

    return post;
  }

  //내가 쓴 게시글 조회
  async findMyPosts(myId: number) {
    //myId는 항상 로그인 된 사용자 id
    const posts = await client.post.findMany({
      //그래서 post중에 authorId가 로그인 된 myId인 것들을 모두 찾아오면 될 것
      where: { authorId: myId },
      orderBy: {
        id: "asc",
      },
      //pagenation 10개씩 가져올거다
      skip: 10,
      take: 10,
    });
    return posts;
  }

  //포스트 삭제
  async delete(postId: number) {
    //작성자만 post지울 수 있기때문에
    //post를 먼저 찾은 뒤
    //작성자의 id가 myId랑 일치하는지 확인
    //일치하지 않는다면 오류 발생
    //일치하면 삭제
    await client.post.delete({
      where: {
        id: postId,
      },
    });
  }

  //포스트 업데이트
  async update({ content, postId, title }: UpdatePostDto) {
    //데이터를 빈 객체로 먼저 가져와서 아래 입력한대로 가져오기
    //입력한 것만 업데이트 할 수 있도록!
    const data = {} as any;
    if (title) {
      data.title = title;
    }
    if (content) {
      data.content = content;
    }

    await client.post.update({
      where: {
        id: postId,
      },
      //원래 이렇게 쓰는데
      //data: {
      //   title,
      //   content,
      //}
      //-> 이 중괄호 안에 데이터를 위에서 만든것
      // data: data,
      //-> 이제 키=밸류로 생략해서 작성
      data,
    });
  }
}

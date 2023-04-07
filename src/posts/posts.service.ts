import { CreatPostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostRepository } from "./posts.repository";

const postRepository = new PostRepository();

export class PostService {
  //특정 id 글 가져오기
  async getById(postId: number) {
    const post = await postRepository.findById(postId);
    return post;
  }

  //내 블로그 글 모두 가져오기
  async getMine(myId: number) {
    const myPosts = await postRepository.findMyPosts(myId);
    return myPosts;
  }

  //블로그 글 작성하기
  async write(myId: number, { title, content }: CreatPostDto) {
    const postId = await postRepository.create(myId, { title, content });
    return postId; //create의 리턴값은 넘버니까 postId로 리턴해서 만든 글에 id할당해준다
  }

  //블로그 글 수정
  async edit(myId: number, { title, content, postId }: UpdatePostDto) {
    //수정 전에 먼저 postId로 글을 찾아와서 내 id랑 일치하는지 검사
    //일치하지 않으면 오류(내 글이 아니라 수정 권한 없음)
    const editPost = await postRepository.findById(postId);
    if (editPost === null) {
      throw new Error("수정할 글이 없음");
    }
    if (editPost.authorId !== myId) {
      throw new Error("내 포스트가 아니라 수정 권한이 없음");
    }
    //일치하면 그대로 수정 진행
    await postRepository.update({ title, content, postId });
  }

  //블로그 글 삭제하기
  async delete(myId: number, postId: number) {
    //삭제 전에 postId로 글을 찾아와서 내 id와 일치하는지 검사
    //일치하지 않으면 오류(내 글이 아니라 삭제 권한 없음)
    //일치하면 그대로 삭제 진행
    const deletePost = await postRepository.findById(postId);
    if (deletePost === null) {
      throw new Error("삭제할 글이 없음");
    }
    if (deletePost.authorId !== myId) {
      throw new Error("내 포스트가 아니라 삭제 권한 없음");
    }
    await postRepository.delete(postId);
  }
}

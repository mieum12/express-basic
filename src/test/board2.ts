import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function main() {
  //사용자 포스트, 댓글 만들기
  const user = await client.user.create({
    data: {
      username: "lll",
      password: "lll",
      phone: {
        create: {
          phoneNumber: "666-6666-6666",
        },
      },
    },
    include: {
      phone: true,
      comments: true,
      posts: true,
    },
  });
  console.log(user);

  const post = await client.post.create({
    data: {
      title: "제목",
      content: "내용",
      // authorId: user.id,
      author: {
        connect: {
          id: user.id,
        },
      },
    },
  });
  //댓글만들기: 사용자, 포스트와 연결
  const comment = await client.comment.create({
    data: {
      content: "댓글 내용",
      authorId: user.id,
      postId: post.id,
    },
  });

  const foundUser = await client.user.findUnique({
    where: {
      id: user.id,
    },
    include: {
      comments: true,
      phone: true,
      posts: true,
    },
  });
  console.log(foundUser);

  // await client.user.delete({
  //   where: { id: user.id },
  // });
}

main();

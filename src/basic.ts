import express from "express";

const app = express();

app.use("/p", express.static("public")); //localhost:3000/p/a.txt경로
app.use("/a", express.static("asset"));

app.get("/", (req, res) => {
  const user = {
    id: 1,
    username: "asd",
  };

  res.send(user);
  //res.send, res.json은 내부적으로 header의 content-type을 설정하고, 객체를 넣으면 JSON문자열로 변환해줌!
  //그렇기에 전송이 가능 한 것
  //네트워크를 통한 전송은 반드시 문자열 형태여야 함
  // res.setHeader("Content-type", "application/json");
  const userStirng = JSON.stringify(user);
  res.end(userStirng);
});

app.listen(3000, () => {
  console.log(`server is runnung at port 3000`);
});

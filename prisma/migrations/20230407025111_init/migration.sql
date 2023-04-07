-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "password" VARCHAR(100) NOT NULL DEFAULT 'xxx',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phone" (
    "id" SERIAL NOT NULL,
    "phoneNumber" CHAR(13) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Phone_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Phone_phoneNumber_key" ON "Phone"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Phone_userId_key" ON "Phone"("userId");

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

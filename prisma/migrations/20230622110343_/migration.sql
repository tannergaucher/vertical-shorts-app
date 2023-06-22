/*
  Warnings:

  - Added the required column `planType` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('STARTER', 'GROWTH', 'PROFESSIONAL');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "planType" "PlanType" NOT NULL;

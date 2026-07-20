/*
  Warnings:

  - The values [BUSINESS_REGISTRATION] on the enum `ApplicationType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "ApplicationStatus" ADD VALUE 'DELETED';

-- AlterEnum
BEGIN;
CREATE TYPE "ApplicationType_new" AS ENUM ('EVENTS', 'PYROTECHNICS', 'COMMERCIAL', 'RESIDENCY');
ALTER TABLE "Application" ALTER COLUMN "applicationType" TYPE "ApplicationType_new" USING ("applicationType"::text::"ApplicationType_new");
ALTER TYPE "ApplicationType" RENAME TO "ApplicationType_old";
ALTER TYPE "ApplicationType_new" RENAME TO "ApplicationType";
DROP TYPE "ApplicationType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "status" SET DEFAULT 'SUBMITTED';

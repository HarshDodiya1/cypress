-- CreateEnum
CREATE TYPE "KeyStatus" AS ENUM ('expired', 'invalid', 'valid', 'default');

-- CreateEnum
CREATE TYPE "KeyType" AS ENUM ('stream_xchacha20', 'secretstream', 'secretbox', 'kdf', 'generichash', 'shorthash', 'auth', 'hmacsha256', 'hmacsha512', 'aead_det', 'aead_ietf');

-- CreateEnum
CREATE TYPE "FactorStatus" AS ENUM ('verified', 'unverified');

-- CreateEnum
CREATE TYPE "FactorType" AS ENUM ('webauthn', 'totp');

-- CreateEnum
CREATE TYPE "AalLevel" AS ENUM ('aal3', 'aal2', 'aal1');

-- CreateEnum
CREATE TYPE "CodeChallengeMethod" AS ENUM ('plain', 's256');

-- CreateEnum
CREATE TYPE "PricingType" AS ENUM ('recurring', 'one_time');

-- CreateEnum
CREATE TYPE "PricingPlanInterval" AS ENUM ('year', 'month', 'week', 'day');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('unpaid', 'past_due', 'incomplete_expired', 'incomplete', 'canceled', 'active', 'trialing');

-- CreateEnum
CREATE TYPE "EqualityOp" AS ENUM ('in', 'gte', 'gt', 'lte', 'lt', 'neq', 'eq');

-- CreateEnum
CREATE TYPE "Action" AS ENUM ('ERROR', 'TRUNCATE', 'DELETE', 'UPDATE', 'INSERT');

-- CreateTable
CREATE TABLE "Workspace" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "workspaceOwner" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "iconId" TEXT NOT NULL,
    "data" TEXT,
    "inTrash" TEXT,
    "logo" TEXT,
    "bannerUrl" TEXT,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Folder" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "iconId" TEXT NOT NULL,
    "data" TEXT,
    "inTrash" TEXT,
    "bannerUrl" TEXT,
    "workspaceId" UUID NOT NULL,

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "iconId" TEXT NOT NULL,
    "data" TEXT,
    "inTrash" TEXT,
    "bannerUrl" TEXT,
    "workspaceId" UUID NOT NULL,
    "folderId" UUID NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "fullName" TEXT,
    "avatarUrl" TEXT,
    "billingAddress" JSONB,
    "updatedAt" TIMESTAMP(3),
    "paymentMethod" JSONB,
    "email" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" UUID NOT NULL,
    "stripeCustomerId" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" UUID NOT NULL,
    "active" BOOLEAN,
    "name" TEXT,
    "description" TEXT,
    "image" TEXT,
    "metadata" JSONB,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price" (
    "id" UUID NOT NULL,
    "productId" UUID,
    "active" BOOLEAN,
    "description" TEXT,
    "unitAmount" BIGINT,
    "currency" TEXT,
    "type" "PricingType",
    "interval" "PricingPlanInterval",
    "intervalCount" INTEGER,
    "trialPeriodDays" INTEGER,
    "metadata" JSONB,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "status" "SubscriptionStatus",
    "metadata" JSONB,
    "priceId" UUID,
    "quantity" INTEGER,
    "cancelAtPeriodEnd" BOOLEAN,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "currentPeriodStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "currentPeriodEnd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "cancelAt" TIMESTAMP(3),
    "canceledAt" TIMESTAMP(3),
    "trialStart" TIMESTAMP(3),
    "trialEnd" TIMESTAMP(3),

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collaborator" (
    "id" UUID NOT NULL,
    "workspaceId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Collaborator_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "Price"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collaborator" ADD CONSTRAINT "Collaborator_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collaborator" ADD CONSTRAINT "Collaborator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

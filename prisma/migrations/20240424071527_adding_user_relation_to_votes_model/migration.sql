/*
  Warnings:

  - Added the required column `userId` to the `Votes` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Votes] ADD [userId] NVARCHAR(1000) NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[Votes] ADD CONSTRAINT [Votes_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[Users]([userId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

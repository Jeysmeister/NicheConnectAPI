BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Users] (
    [userId] NVARCHAR(1000) NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [avatar] NVARCHAR(1000) NOT NULL,
    [bio] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Users_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Users_pkey] PRIMARY KEY CLUSTERED ([userId]),
    CONSTRAINT [Users_username_key] UNIQUE NONCLUSTERED ([username]),
    CONSTRAINT [Users_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Posts] (
    [postId] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [content] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Posts_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Posts_pkey] PRIMARY KEY CLUSTERED ([postId])
);

-- CreateTable
CREATE TABLE [dbo].[Comments] (
    [commentId] NVARCHAR(1000) NOT NULL,
    [postId] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [content] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Comments_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Comments_pkey] PRIMARY KEY CLUSTERED ([commentId])
);

-- CreateTable
CREATE TABLE [dbo].[Likes] (
    [likeId] NVARCHAR(1000) NOT NULL,
    [postId] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Likes_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Likes_pkey] PRIMARY KEY CLUSTERED ([likeId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Posts] ADD CONSTRAINT [Posts_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[Users]([userId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Comments] ADD CONSTRAINT [Comments_postId_fkey] FOREIGN KEY ([postId]) REFERENCES [dbo].[Posts]([postId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Comments] ADD CONSTRAINT [Comments_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[Users]([userId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Likes] ADD CONSTRAINT [Likes_postId_fkey] FOREIGN KEY ([postId]) REFERENCES [dbo].[Posts]([postId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Likes] ADD CONSTRAINT [Likes_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[Users]([userId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

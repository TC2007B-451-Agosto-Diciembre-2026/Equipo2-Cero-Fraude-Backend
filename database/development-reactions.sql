USE cero_fraude;

START TRANSACTION;

-- First visible post: every user reacts, mostly with LIKE
SET @popular_post_id := (
    SELECT MIN(id)
    FROM fraud_post
    WHERE status_id IN (4, 5)
    AND deleted_at IS NULL
);

INSERT IGNORE INTO post_reaction (user_id, post_id, reaction_type_id)
SELECT
    u.id,
    fp.id,
    rt.id
FROM (
    SELECT id, ROW_NUMBER() OVER (ORDER BY username) AS rn
    FROM user
    WHERE role_id = 1
) u
INNER JOIN fraud_post fp
    ON fp.id = @popular_post_id
    AND fp.author_id <> u.id
INNER JOIN reaction_type rt
    ON rt.code = IF(MOD(u.rn, 5) = 0, 'DISLIKE', 'LIKE');

-- A few reactions on other visible posts, about a third of them DISLIKE
-- The newest visible posts are left without reactions
INSERT IGNORE INTO post_reaction (user_id, post_id, reaction_type_id)
SELECT
    u.id,
    fp.id,
    rt.id
FROM (
    SELECT id, ROW_NUMBER() OVER (ORDER BY username) AS rn
    FROM user
    WHERE role_id = 1
) u
INNER JOIN (
    SELECT id, author_id, ROW_NUMBER() OVER (ORDER BY id) AS rn
    FROM fraud_post
    WHERE status_id IN (4, 5)
    AND deleted_at IS NULL
    AND id <> @popular_post_id
) fp
    ON MOD(u.rn + fp.rn, 8) = 0
    AND fp.author_id <> u.id
INNER JOIN reaction_type rt
    ON rt.code = IF(MOD(FLOOR(u.rn / 8), 4) = 0, 'DISLIKE', 'LIKE')
WHERE fp.rn <= 200;

COMMIT;

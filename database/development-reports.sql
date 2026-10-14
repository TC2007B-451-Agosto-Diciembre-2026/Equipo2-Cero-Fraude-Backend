USE cero_fraude;

START TRANSACTION;

-- First visible post: it receives more than one page of reports
SET @reported_post_id := (
    SELECT MIN(id)
    FROM fraud_post
    WHERE status_id IN (4, 5)
    AND deleted_at IS NULL
);

INSERT IGNORE INTO post_report (details, created_at, report_reason_id, reporter_id, post_id)
SELECT
    IF(MOD(u.rn, 2) = 0, NULL, CONCAT('Reporte de prueba de ', u.username, '.')),
    TIMESTAMP('2026-10-01 09:00:00') + INTERVAL u.rn HOUR,
    rr.id,
    u.id,
    fp.id
FROM (
    SELECT id, username, ROW_NUMBER() OVER (ORDER BY username) AS rn
    FROM user
    WHERE role_id = 1
) u
INNER JOIN fraud_post fp
    ON fp.id = @reported_post_id
    AND fp.author_id <> u.id
INNER JOIN report_reason rr
    ON rr.code = ELT(1 + MOD(u.rn, 6), 'FALSE_INFO', 'DUPLICATE', 'PERS_INFO', 'INAPPROP', 'NOT_FRAUD', 'OTHER')
WHERE u.rn <= 26;

-- One report per user on a different visible post
INSERT IGNORE INTO post_report (details, created_at, report_reason_id, reporter_id, post_id)
SELECT
    IF(MOD(u.rn, 3) = 0, NULL, CONCAT('Reporte de prueba de ', u.username, '.')),
    TIMESTAMP('2026-10-03 09:00:00') + INTERVAL u.rn HOUR,
    rr.id,
    u.id,
    fp.id
FROM (
    SELECT id, username, ROW_NUMBER() OVER (ORDER BY username) AS rn
    FROM user
    WHERE role_id = 1
) u
INNER JOIN (
    SELECT id, author_id, ROW_NUMBER() OVER (ORDER BY id) AS rn
    FROM fraud_post
    WHERE status_id IN (4, 5)
    AND deleted_at IS NULL
    AND id <> @reported_post_id
) fp
    ON fp.rn = u.rn
    AND fp.author_id <> u.id
INNER JOIN report_reason rr
    ON rr.code = ELT(1 + MOD(u.rn, 6), 'FALSE_INFO', 'DUPLICATE', 'PERS_INFO', 'INAPPROP', 'NOT_FRAUD', 'OTHER')
WHERE u.rn <= 22;

COMMIT;

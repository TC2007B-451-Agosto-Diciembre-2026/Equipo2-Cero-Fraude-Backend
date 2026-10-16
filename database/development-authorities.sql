USE cero_fraude;

START TRANSACTION;

-- Assign authorities recommended for each post's fraud types.
-- An authority appears only once per post, even when several fraud
-- types recommend it. Priority starts at 1 for each publication.
-- Validated publications and a subset of published ones are included.
INSERT IGNORE INTO post_authority (priority, post_id, authority_id)
SELECT
    ROW_NUMBER() OVER (PARTITION BY candidates.post_id ORDER BY candidates.authority_id) AS priority,
    candidates.post_id,
    candidates.authority_id
FROM (
    SELECT DISTINCT fp.id AS post_id, fta.authority_id
    FROM fraud_post fp
    INNER JOIN post_fraud_type pft
        ON pft.post_id = fp.id
    INNER JOIN fraud_type_authority fta
        ON fta.fraud_type_id = pft.fraud_type_id
    WHERE fp.deleted_at IS NULL
      AND (fp.status_id = 5 OR (fp.status_id = 4 AND MOD(fp.id, 3) = 0))
) candidates;

COMMIT;

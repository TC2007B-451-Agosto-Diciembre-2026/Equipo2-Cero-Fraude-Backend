-- ===================================
--  DEVELOPMENT EVIDENCE PATCHES
-- ===================================

USE cero_fraude;

UPDATE post_evidence
SET post_id = (
    SELECT id
    FROM fraud_post
    WHERE title = "Oferta falsa de iPhone 17 Pro"
)
WHERE id IN (1, 2);

UPDATE post_evidence
SET post_id = (
    SELECT id
    FROM fraud_post
    WHERE title = "Correo sospechoso de supuesta institución bancaria"
)
WHERE id = 3;

UPDATE post_evidence
SET post_id = (
    SELECT id
    FROM fraud_post
    WHERE title = "Venta de consola con anticipo"
)
WHERE id IN (4, 5);

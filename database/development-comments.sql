USE cero_fraude;

START TRANSACTION;

-- A popular publication receives enough comments to test pagination.
SET @popular_post_id := (
    SELECT MIN(id)
    FROM fraud_post
    WHERE status_id IN (4, 5)
      AND deleted_at IS NULL
);

-- One comment from each regular user, except the post author.
INSERT INTO post_comment (is_visible, content, created_at, updated_at, author_id, post_id)
SELECT
    IF(MOD(u.rn, 13) = 0, FALSE, TRUE),
    ELT(1 + MOD(u.rn, 12),
        'Gracias por compartir esta información, me ayudó a identificar señales de alerta.',
        'Vi una oferta muy parecida y el vendedor también me pidió un depósito.',
        '¿Alguien sabe si este vendedor sigue publicando anuncios?',
        'Es importante guardar las capturas y los comprobantes de pago.',
        'Me contactaron por mensaje privado con una promoción similar.',
        'Qué bueno que lo reportaron para prevenir a otras personas.',
        'A mí también me pareció sospechoso que pidieran pagar fuera de la plataforma.',
        'El precio parecía demasiado bueno para ser cierto.',
        'Revisé el perfil y tenía muy pocas publicaciones anteriores.',
        'Conviene verificar la reputación del vendedor antes de comprar.',
        '¿Se llegó a recibir algún número de guía del envío?',
        'Ojalá más personas revisen estos avisos antes de transferir dinero.'
    ),
    TIMESTAMP('2026-10-01 09:00:00') + INTERVAL u.rn HOUR,
    IF(MOD(u.rn, 9) = 0, TIMESTAMP('2026-10-04 12:00:00') + INTERVAL u.rn HOUR, NULL),
    u.id,
    fp.id
FROM (
    SELECT id, ROW_NUMBER() OVER (ORDER BY username) AS rn
    FROM user
    WHERE role_id = 1
) u
INNER JOIN fraud_post fp
    ON fp.id = @popular_post_id
   AND fp.author_id <> u.id;

-- Other visible publications have a mix of comments, including some
-- hidden and edited ones. Recent publications are deliberately left out.
INSERT INTO post_comment (is_visible, content, created_at, updated_at, author_id, post_id)
SELECT
    IF(MOD(u.rn + fp.rn, 17) = 0, FALSE, TRUE),
    ELT(1 + MOD(u.rn + fp.rn, 14),
        '¿La publicación original todavía está disponible?',
        'Gracias por avisar, estaba considerando comprar el mismo producto.',
        'Me pasó algo parecido con un vendedor de esa plataforma.',
        'Recomiendo no enviar anticipos sin verificar antes al vendedor.',
        '¿El vendedor proporcionó algún comprobante del envío?',
        'Hay que tener cuidado con los enlaces que mandan por mensaje.',
        'El perfil parecía confiable, pero la forma de pago era sospechosa.',
        'Es útil comparar el precio con el de otras tiendas.',
        'Gracias por incluir los detalles de lo ocurrido.',
        '¿Pudiste contactar al soporte de la plataforma?',
        'También recibí mensajes con una oferta muy similar.',
        'Siempre es mejor utilizar los métodos de pago protegidos.',
        'El anuncio me recordó a otras promociones fraudulentas.',
        'Sería bueno conservar las conversaciones como evidencia.'
    ),
    fp.published_at + INTERVAL (1 + MOD(u.rn + fp.rn, 12)) DAY
                    + INTERVAL MOD(u.rn * 7 + fp.rn, 12) HOUR,
    IF(MOD(u.rn + fp.rn, 11) = 0,
       fp.published_at + INTERVAL (2 + MOD(u.rn + fp.rn, 12)) DAY
                       + INTERVAL MOD(u.rn * 7 + fp.rn, 12) HOUR,
       NULL),
    u.id,
    fp.id
FROM (
    SELECT id, ROW_NUMBER() OVER (ORDER BY username) AS rn
    FROM user
    WHERE role_id = 1
) u
INNER JOIN (
    SELECT id, author_id, published_at, ROW_NUMBER() OVER (ORDER BY id) AS rn
    FROM fraud_post
    WHERE status_id IN (4, 5)
      AND deleted_at IS NULL
      AND published_at IS NOT NULL
      AND id <> @popular_post_id
      AND published_at < '2026-09-25'
) fp
    ON MOD(u.rn + fp.rn, 13) = 0
   AND fp.author_id <> u.id
WHERE fp.rn <= 90;

COMMIT;

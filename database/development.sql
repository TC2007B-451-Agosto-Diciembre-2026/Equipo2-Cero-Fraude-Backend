-- DO NOT USE THESE CREDENTIALS IN PRODUCTION.

INSERT INTO user (id, username, email, password_hash, role_id)
VALUES
(
    UUID(),
    "Admin",
    "admin@example.com",
    "$2b$12$YhfVrTut7s2kKa7jzBZo/OsNlTXulKztYYO9cVgKQkq7vpcUDWO1u",
    (SELECT id FROM user_role WHERE code = "ADMIN")
),
(
    UUID(),
    "usuario1",
    "usuario1@example.com",
    "$2b$12$YhfVrTut7s2kKa7jzBZo/OsNlTXulKztYYO9cVgKQkq7vpcUDWO1u",
    (SELECT id FROM user_role WHERE code = "USER")
),
(
    UUID(),
    "usuario2",
    "usuario2@example.com",
    "$2b$12$YhfVrTut7s2kKa7jzBZo/OsNlTXulKztYYO9cVgKQkq7vpcUDWO1u",
    (SELECT id FROM user_role WHERE code = "USER")
),
(
    UUID(),
    "usuario3",
    "usuario3@example.com",
    "$2b$12$YhfVrTut7s2kKa7jzBZo/OsNlTXulKztYYO9cVgKQkq7vpcUDWO1u",
    (SELECT id FROM user_role WHERE code = "USER")
),
(
    UUID(),
    "usuario4",
    "usuario4@example.com",
    "$2b$12$YhfVrTut7s2kKa7jzBZo/OsNlTXulKztYYO9cVgKQkq7vpcUDWO1u",
    (SELECT id FROM user_role WHERE code = "USER")
),
(
    UUID(),
    "usuario5",
    "usuario5@example.com",
    "$2b$12$YhfVrTut7s2kKa7jzBZo/OsNlTXulKztYYO9cVgKQkq7vpcUDWO1u",
    (SELECT id FROM user_role WHERE code = "USER")
);


-- ===================================
--  DEVELOPMENT POSTS
-- ===================================

INSERT INTO fraud_post (
    title,
    description,
    seller_name,
    product,
    phone_number,
    url,
    platform,
    fraudulent_email,
    status_id,
    is_fraud,
    is_anonymous,
    published_at,
    author_id,
    category_id
)
VALUES
(
    "Oferta falsa de iPhone 17 Pro",
    "El vendedor solicitó un depósito antes de enviar el producto y dejó de responder después de recibir el pago.",
    "Tienda Móvil MX",
    "iPhone 17 Pro",
    "8111234567",
    "https://ejemplo.com/iphone-17-pro",
    "Marketplace",
    NULL,
    (SELECT id FROM post_status WHERE code = "PUBLISHED"),
    TRUE,
    FALSE,
    CURRENT_TIMESTAMP,
    (SELECT id FROM user WHERE username = "usuario1"),
    NULL
),
(
    "Correo sospechoso de supuesta institución bancaria",
    "Se recibió un correo solicitando ingresar a un enlace para verificar la cuenta bancaria.",
    NULL,
    NULL,
    NULL,
    "https://ejemplo.com/verificacion",
    "Correo electrónico",
    "seguridad@banco-ejemplo.com",
    (SELECT id FROM post_status WHERE code = "PUBLISHED"),
    TRUE,
    TRUE,
    CURRENT_TIMESTAMP,
    (SELECT id FROM user WHERE username = "usuario2"),
    NULL
),
(
    "Venta de consola con anticipo",
    "El vendedor ofreció una consola a un precio considerablemente menor al habitual y solicitó un anticipo para reservarla.",
    "Gaming Store",
    "Consola de videojuegos",
    "8187654321",
    NULL,
    "Facebook Marketplace",
    NULL,
    (SELECT id FROM post_status WHERE code = "VALIDATED"),
    TRUE,
    FALSE,
    CURRENT_TIMESTAMP,
    (SELECT id FROM user WHERE username = "usuario3"),
    NULL
),
(
    "Posible tienda fraudulenta",
    "La página ofrece productos electrónicos con descuentos elevados. La información de contacto no pudo ser verificada.",
    "Electro Ofertas",
    "Audífonos inalámbricos",
    NULL,
    "https://ejemplo.com/electro-ofertas",
    "Sitio web",
    NULL,
    (SELECT id FROM post_status WHERE code = "UPLOADED"),
    NULL,
    FALSE,
    NULL,
    (SELECT id FROM user WHERE username = "usuario4"),
    NULL
),
(
    "Publicación de prueba en borrador",
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    (SELECT id FROM post_status WHERE code = "DRAFT"),
    NULL,
    FALSE,
    NULL,
    (SELECT id FROM user WHERE username = "usuario1"),
    NULL
),
(
    "Vendedor reportado anteriormente",
    "Esta publicación fue revisada y la evidencia proporcionada no fue suficiente para confirmar el reporte.",
    "Vendedor Ejemplo",
    "Laptop",
    "8181112233",
    NULL,
    "Marketplace",
    NULL,
    (SELECT id FROM post_status WHERE code = "REJECTED"),
    NULL,
    FALSE,
    NULL,
    (SELECT id FROM user WHERE username = "usuario2"),
    NULL
),
(
    "Supuesto sorteo fraudulento",
    "Una cuenta ofrecía participar en un sorteo a cambio de un pago inicial.",
    NULL,
    "Sorteo de consola",
    NULL,
    "https://ejemplo.com/sorteo",
    "Instagram",
    NULL,
    (SELECT id FROM post_status WHERE code = "PUBLISHED"),
    TRUE,
    TRUE,
    CURRENT_TIMESTAMP,
    (SELECT id FROM user WHERE username = "usuario5"),
    NULL
),
(
    "Oferta de empleo sospechosa",
    "Se ofreció un trabajo remoto con un salario elevado y posteriormente se solicitó un pago para cubrir supuestos gastos administrativos.",
    "Empleos MX",
    "Trabajo remoto",
    "5512345678",
    NULL,
    "Facebook",
    NULL,
    (SELECT id FROM post_status WHERE code = "PUBLISHED"),
    TRUE,
    FALSE,
    CURRENT_TIMESTAMP,
    (SELECT id FROM user WHERE username = "usuario3"),
    NULL
),
(
    "Cuenta de marketplace sospechosa",
    "El perfil tiene múltiples publicaciones con precios muy por debajo del mercado y solicita transferencias directas.",
    "Ofertas Express",
    "Smartphone",
    "5587654321",
    NULL,
    "Facebook Marketplace",
    NULL,
    (SELECT id FROM post_status WHERE code = "UPLOADED"),
    NULL,
    FALSE,
    NULL,
    (SELECT id FROM user WHERE username = "usuario5"),
    NULL
),
(
    "Reporte de prueba sin información completa",
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    (SELECT id FROM post_status WHERE code = "DRAFT"),
    NULL,
    FALSE,
    NULL,
    (SELECT id FROM user WHERE username = "usuario4"),
    NULL
);

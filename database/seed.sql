SET NAMES utf8mb4;

-- ===================================
--  USER ROLES
-- ===================================

INSERT INTO user_role (name, code) VALUES
('Usuario', 'USER'),
('Administrador', 'ADMIN');


-- ===================================
--  POST STATUSES
-- ===================================

INSERT INTO post_status (name, code) VALUES
('Borrador', 'DRAFT'),
('Subido', 'UPLOADED'),
('Rechazado', 'REJECTED'),
('Publicado', 'PUBLISHED'),
('Validado', 'VALIDATED');


-- ===================================
--  REACTION TYPES
-- ===================================

INSERT INTO reaction_type (name, code) VALUES
('Like', 'LIKE'),
('Dislike', 'DISLIKE');


-- ===================================
--  FRAUD CATEGORIES
-- ===================================

INSERT INTO fraud_category (name, code) VALUES
('Redes sociales', 'SOCIAL'),
('Marketplace', 'MARKET'),
('Mensajería', 'MESSAGE'),
('Correo electrónico', 'EMAIL'),
('Sitio web', 'WEBSITE'),
('Otro', 'OTHER');


-- ===================================
--  FRAUD TYPES
-- ===================================

INSERT INTO fraud_type (name, code) VALUES
('Producto falso', 'FAKE_PROD'),
('Precio engañoso', 'BAD_PRICE'),
('Promoción falsa', 'FAKE_PROMO'),
('Vendedor falso', 'FAKE_SELL'),
('Tienda falsa', 'FAKE_STORE'),
('Suplantación de marca', 'BRAND_IMP'),
('Otro', 'OTHER');


-- ===================================
--  AUDIT ACTIONS
-- ===================================

INSERT INTO audit_action (name, code) VALUES
('Editar', 'UPDATE'),
('Eliminar', 'DELETE'),
('Validar', 'VALIDATE'),
('Agregar evidencia', 'ADD_EVID'),
('Eliminar evidencia', 'DELETE_EVID'),
('Desactivar usuario', 'DEACT_USER'),
('Activar usuario', 'ACT_USER');


-- ===================================
--  REPORT REASONS
-- ===================================

INSERT INTO report_reason (name, code) VALUES
('Información incorrecta', 'FALSE_INFO'),
('Contenido duplicado', 'DUPLICATE'),
('Información personal', 'PERS_INFO'),
('Contenido inapropiado', 'INAPPROP'),
('No está relacionado con fraude', 'NOT_FRAUD'),
('Otro', 'OTHER');


-- ===================================
--  EVIDENCE TYPES
-- ===================================

INSERT INTO evidence_type (name) VALUES
('Imagen'),
('PDF'),
('Otro');


-- ===================================
--  MODIFIED FIELDS
-- ===================================

INSERT INTO modified_field (name, code) VALUES
('Título', 'TITLE'),
('Descripción', 'DESC'),
('Vendedor', 'SELLER'),
('Producto', 'PRODUCT'),
('Teléfono', 'PHONE'),
('URL', 'URL'),
('Plataforma', 'PLATFORM'),
('Correo fraudulento', 'FRAUD_MAIL'),
('Estado', 'STATUS'),
('Validación de fraude', 'IS_FRAUD'),
('Publicación anónima', 'ANONYMOUS'),
('Categoría', 'CATEGORY'),
('Visibilidad de evidencia', 'EVID_VIS');


-- ===================================
--  AUTHORITIES
-- ===================================

INSERT INTO authority (name, code, description) VALUES
('PROFECO', 'PROFECO',
 'Orienta y atiende problemas relacionados con compras, proveedores, promociones y derechos del consumidor.'),

('Policía Cibernética', 'POL_CIB',
 'Brinda orientación y atención ante incidentes, engaños y posibles delitos realizados mediante medios digitales.'),
 
('CONDUSEF', 'CONDUSEF',
 'Brinda orientación y apoyo en asuntos relacionados con productos, servicios e instituciones financieras.');

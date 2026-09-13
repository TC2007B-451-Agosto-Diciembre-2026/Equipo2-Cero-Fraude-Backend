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
('Correo', 'EMAIL'),
('Redes sociales', 'SOCIAL'),
('Mensaje', 'MESSAGE'),
('Anuncios', 'ADS'),
('Otros', 'OTHER');


-- ===================================
--  FRAUD TYPES
-- ===================================

INSERT INTO fraud_type (name, code) VALUES
('Producto falso', 'FAKE_PROD'),
('Precio engañoso', 'BAD_PRICE'),
('Promoción falsa', 'FAKE_PROMO'),
('Oferta falsa', 'FAKE_OFFER'),
('Otro', 'OTHER');


-- ===================================
--  AUDIT ACTIONS
-- ===================================

INSERT INTO audit_action (name, code) VALUES
('Crear', 'CREATE'),
('Editar', 'UPDATE'),
('Eliminar', 'DELETE'),
('Validar', 'VALIDATE'),
('Rechazar', 'REJECT'),
('Ocultar evidencia', 'HIDE_EVID'),
('Mostrar evidencia', 'SHOW_EVID');


-- ===================================
--  REPORT REASONS
-- ===================================

INSERT INTO report_reason (name, code) VALUES
('Información falsa o engañosa', 'FALSE_INFO'),
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
('Tipo de fraude', 'FRAUD_TYPE'),
('Visibilidad de evidencia', 'EVID_VIS');


-- ===================================
--  AUTHORITIES
-- ===================================

INSERT INTO authority (name, code, description) VALUES
('Procuraduría Federal del Consumidor', 'PROFECO',
 'Orienta y atiende problemas relacionados con compras, proveedores, promociones y derechos del consumidor.'),

('Policía Cibernética', 'POL_CIB',
 'Brinda orientación y atención ante incidentes, engaños y posibles delitos realizados mediante medios digitales.'),
 
('Fiscalía', 'FISCALIA',
 'Recibe denuncias cuando los hechos pueden constituir un delito y requieren investigación por parte de la autoridad competente.');

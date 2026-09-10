DROP DATABASE IF EXISTS cero_fraude;
CREATE DATABASE cero_fraude;
USE cero_fraude;

DROP TABLE IF EXISTS audit_log;
DROP TABLE IF EXISTS post_fraud_type;
DROP TABLE IF EXISTS fraud_type_subscription;
DROP TABLE IF EXISTS post_reaction;
DROP TABLE IF EXISTS post_comment;
DROP TABLE IF EXISTS post_evidence;
DROP TABLE IF EXISTS post_report;
DROP TABLE IF EXISTS fraud_post;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS modified_field;
DROP TABLE IF EXISTS evidence_type;
DROP TABLE IF EXISTS report_reason;
DROP TABLE IF EXISTS audit_action;
DROP TABLE IF EXISTS fraud_type;
DROP TABLE IF EXISTS fraud_category;
DROP TABLE IF EXISTS reaction_type;
DROP TABLE IF EXISTS post_status;
DROP TABLE IF EXISTS user_role;

CREATE TABLE user_role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (20) NOT NULL UNIQUE,
    code VARCHAR (10) NOT NULL UNIQUE
);

CREATE TABLE post_status (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (20) NOT NULL UNIQUE,
    code VARCHAR(10) NOT NULL UNIQUE
);

CREATE TABLE reaction_type (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL UNIQUE,
    code VARCHAR(10) NOT NULL UNIQUE
);

CREATE TABLE fraud_category (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR (20) UNIQUE NOT NULL,
   code VARCHAR (10) UNIQUE NOT NULL
);

CREATE TABLE fraud_type (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR (50) UNIQUE NOT NULL,
   code VARCHAR (10) UNIQUE NOT NULL
);

CREATE TABLE audit_action (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    code VARCHAR(10) NOT NULL UNIQUE
);

CREATE TABLE report_reason (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(10) NOT NULL UNIQUE
);

CREATE TABLE evidence_type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(10) NOT NULL UNIQUE
);

CREATE TABLE modified_field (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    code VARCHAR(10)
);

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR (100) NOT NULL UNIQUE,
    email VARCHAR (320) NOT NULL UNIQUE,
    password_hash VARCHAR (255) NOT NULL,
    salt VARCHAR (16) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    role_id INT NOT NULL,
    CONSTRAINT fk_user_role_id
    FOREIGN KEY (role_id) REFERENCES user_role(id)
);

CREATE TABLE fraud_post (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR (100) NOT NULL,
    description TEXT NOT NULL,
    seller_name VARCHAR (100) DEFAULT NULL,
    product VARCHAR (100) DEFAULT NULL,
    phone_number VARCHAR (25) DEFAULT NULL,
    url VARCHAR (255) DEFAULT NULL,
    platform VARCHAR (100) DEFAULT NULL,
    fraudulent_email VARCHAR (255) DEFAULT NULL,
    status_id INT NOT NULL,
    is_fraud BOOLEAN DEFAULT NULL,
    is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
    published_at TIMESTAMP DEFAULT NULL,
    validated_at TIMESTAMP DEFAULT NULL,
    author_id INT NOT NULL,
    category_id INT NOT NULL,
    CONSTRAINT fk_fraud_post_status_id
    FOREIGN KEY (status_id) REFERENCES post_status(id),
    CONSTRAINT fk_fraud_post_author_id
    FOREIGN KEY (author_id) REFERENCES user(id),
    CONSTRAINT fk_fraud_post_category_id
    FOREIGN KEY (category_id) REFERENCES fraud_category(id)
);

CREATE TABLE post_report (
	id INT AUTO_INCREMENT PRIMARY KEY,
	details TEXT DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	report_reason_id INT NOT NULL,
	reporter_id INT NOT NULL,
	post_id INT NOT NULL,
    CONSTRAINT fk_post_report_report_reason_id
    FOREIGN KEY (report_reason_id) REFERENCES report_reason(id),
	CONSTRAINT fk_post_report_reporter_id
    FOREIGN KEY (reporter_id) REFERENCES user(id),
    CONSTRAINT fk_post_report_post_id
	FOREIGN KEY (post_id) REFERENCES fraud_post(id)
);

CREATE TABLE post_evidence (
	id INT AUTO_INCREMENT PRIMARY KEY,
	is_visible BOOLEAN NOT NULL DEFAULT TRUE,
    url VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	evidence_type_id INT NOT NULL,
	post_id INT NOT NULL,
    CONSTRAINT fk_post_evidence_evidence_type_id
    FOREIGN KEY (evidence_type_id) REFERENCES evidence_type(id),
    CONSTRAINT fk_post_evidence_post_id
	FOREIGN KEY (post_id) REFERENCES fraud_post(id)
);

CREATE TABLE post_comment (
	id INT AUTO_INCREMENT PRIMARY KEY,
	content TEXT NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	author_id INT NOT NULL,
	post_id INT NOT NULL,
    CONSTRAINT fk_post_comment_author_id
	FOREIGN KEY (author_id) REFERENCES user(id),
    CONSTRAINT fk_post_comment_post_id
	FOREIGN KEY (post_id) REFERENCES fraud_post(id)
);

CREATE TABLE post_reaction (
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    reaction_type_id INT NOT NULL,
    PRIMARY KEY (user_id, post_id),
    CONSTRAINT fk_post_reaction_user_id
    FOREIGN KEY (user_id) REFERENCES user(id),
    CONSTRAINT fk_post_reaction_post_id
    FOREIGN KEY (post_id) REFERENCES fraud_post(id),
    CONSTRAINT fk_post_reaction_reaction_type_id
    FOREIGN KEY (reaction_type_id) REFERENCES reaction_type(id)
);

CREATE TABLE fraud_type_subscription (
    user_id INT NOT NULL,
    fraud_type_id INT NOT NULL,
    subscribed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, fraud_type_id),
    CONSTRAINT fk_fraud_type_subscription_user_id
    FOREIGN KEY (user_id) REFERENCES user(id),
    CONSTRAINT fk_fraud_type_subscription_fraud_type_id
    FOREIGN KEY (fraud_type_id) REFERENCES fraud_type(id)
);

CREATE TABLE post_fraud_type (
    post_id INT NOT NULL,
    fraud_type_id INT NOT NULL,
    PRIMARY KEY (post_id, fraud_type_id),
    CONSTRAINT fk_post_fraud_type_post_id
    FOREIGN KEY (post_id) REFERENCES fraud_post(id),
    CONSTRAINT fk_post_fraud_type_fraud_type_id
    FOREIGN KEY (fraud_type_id) REFERENCES fraud_type(id)
);

CREATE TABLE audit_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    audit_action_id INT NOT NULL,
    modified_field_id INT DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    old_value TEXT NULL,
    new_value TEXT NULL,
    performed_by_id INT NOT NULL, 
    post_id INT DEFAULT NULL,
    evidence_id INT NULL,
    CONSTRAINT fk_audit_log_audit_action_id
    FOREIGN KEY (audit_action_id) REFERENCES audit_action(id),
    CONSTRAINT fk_audit_log_modified_field_id
    FOREIGN KEY (modified_field_id) REFERENCES modified_field(id),
    CONSTRAINT fk_audit_log_performed_by_id
    FOREIGN KEY (performed_by_id) REFERENCES user(id),
    CONSTRAINT fk_audit_log_post_id
    FOREIGN KEY (post_id) REFERENCES fraud_post(id),
    CONSTRAINT fk_audit_log_evidence_id
    FOREIGN KEY (evidence_id) REFERENCES post_evidence(id)
);

-- USER ROLE
INSERT INTO user_role (name, code) VALUES
('Usuario', 'USER'),
('Administrador', 'ADMIN');


-- POST STATUS
INSERT INTO post_status (name, code) VALUES
('Borrador', 'DRAFT'),
('Subido', 'UPLOADED'),
('Publicado', 'PUBLISHED'),
('Validado', 'VALIDATED');


-- REACTION TYPE
INSERT INTO reaction_type (name, code) VALUES
('Like', 'LIKE'),
('Dislike', 'DISLIKE');


-- FRAUD CATEGORY
-- De dónde provino o apareció la oferta
INSERT INTO fraud_category (name, code) VALUES
('Correo', 'EMAIL'),
('Redes sociales', 'SOCIAL'),
('Mensaje', 'MESSAGE'),
('Anuncios', 'ADS'),
('Otros', 'OTHER');


-- FRAUD TYPE
-- Qué tipo de oferta o engaño se reporta
INSERT INTO fraud_type (name, code) VALUES
('Producto falso', 'FAKE_PROD'),
('Precio engañoso', 'BAD_PRICE'),
('Promoción falsa', 'FAKE_PROMO'),
('Oferta falsa', 'FAKE_OFFER'),
('Otro', 'OTHER');


-- AUDIT ACTION
-- Acciones registradas en audit_log
INSERT INTO audit_action (name, code) VALUES
('Crear', 'CREATE'),
('Editar', 'UPDATE'),
('Eliminar', 'DELETE'),
('Validar', 'VALIDATE'),
('Rechazar', 'REJECT'),
('Ocultar evidencia', 'HIDE_EVID'),
('Mostrar evidencia', 'SHOW_EVID');


-- REPORT REASON
-- Motivos por los que un usuario reporta una publicación
INSERT INTO report_reason (name, code) VALUES
('Información falsa o engañosa', 'FALSE_INFO'),
('Contenido duplicado', 'DUPLICATE'),
('Información personal', 'PERS_INFO'),
('Contenido inapropiado', 'INAPPROP'),
('No está relacionado con fraude', 'NOT_FRAUD'),
('Otro', 'OTHER');


-- EVIDENCE TYPE
-- Tipo de archivo de la evidencia
INSERT INTO evidence_type (name) VALUES
('Imagen'),
('PDF'),
('Otro');


-- MODIFIED FIELD
-- Campos cuya modificación puede registrarse
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

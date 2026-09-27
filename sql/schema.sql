DROP DATABASE IF EXISTS cero_fraude;
CREATE DATABASE cero_fraude;
USE cero_fraude;


-- ===================================
--  CATALOGS
-- ===================================

CREATE TABLE user_role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE,
    code VARCHAR(11) NOT NULL UNIQUE
);

CREATE TABLE post_status (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE,
    code VARCHAR(11) NOT NULL UNIQUE
);

CREATE TABLE reaction_type (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL UNIQUE,
    code VARCHAR(11) NOT NULL UNIQUE
);

CREATE TABLE fraud_category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL,
    code VARCHAR(11) UNIQUE NOT NULL
);

CREATE TABLE fraud_type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    code VARCHAR(11) UNIQUE NOT NULL
);

CREATE TABLE audit_action (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    code VARCHAR(11) NOT NULL UNIQUE
);

CREATE TABLE report_reason (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(11) NOT NULL UNIQUE
);

CREATE TABLE evidence_type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(11) NOT NULL UNIQUE
);

CREATE TABLE modified_field (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    code VARCHAR(11)
);

CREATE TABLE authority (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(11) NOT NULL UNIQUE,
    description VARCHAR(255) NOT NULL
);


-- ===================================
--  USERS
-- ===================================

CREATE TABLE user (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(320) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(16) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    role_id INT NOT NULL,
    CONSTRAINT fk_user_role_id
    FOREIGN KEY (role_id) REFERENCES user_role(id)
);


-- ===================================
--  FRAUD POSTS
-- ===================================

CREATE TABLE fraud_post (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) DEFAULT NULL,
    description TEXT DEFAULT NULL,
    seller_name VARCHAR(100) DEFAULT NULL,
    product VARCHAR(100) DEFAULT NULL,
    phone_number VARCHAR(25) DEFAULT NULL,
    url VARCHAR(255) DEFAULT NULL,
    platform VARCHAR(100) DEFAULT NULL,
    fraudulent_email VARCHAR(255) DEFAULT NULL,
    status_id INT NOT NULL,
    is_fraud BOOLEAN DEFAULT NULL,
    is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
    published_at TIMESTAMP DEFAULT NULL,
    deleted_at TIMESTAMP DEFAULT NULL,
    author_id CHAR(36) NOT NULL,
    category_id INT DEFAULT NULL,
    CONSTRAINT fk_fraud_post_status_id
    FOREIGN KEY (status_id) REFERENCES post_status(id),
    CONSTRAINT fk_fraud_post_author_id
    FOREIGN KEY (author_id) REFERENCES user(id),
    CONSTRAINT fk_fraud_post_category_id
    FOREIGN KEY (category_id) REFERENCES fraud_category(id)
);


-- ===================================
--  POST CONTENT / INTERACTIONS
-- ===================================

CREATE TABLE post_report (
    id INT AUTO_INCREMENT PRIMARY KEY,
    details TEXT DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    report_reason_id INT NOT NULL,
    reporter_id CHAR(36) NOT NULL,
    post_id INT NOT NULL,

    CONSTRAINT uq_post_report_reporter_post
    UNIQUE (reporter_id, post_id),
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
    deleted_at TIMESTAMP DEFAULT NULL,
    evidence_type_id INT NOT NULL,
    post_id INT NOT NULL,

    CONSTRAINT fk_post_evidence_evidence_type_id
    FOREIGN KEY (evidence_type_id) REFERENCES evidence_type(id),
    CONSTRAINT fk_post_evidence_post_id
    FOREIGN KEY (post_id) REFERENCES fraud_post(id)
);

CREATE TABLE post_comment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    is_visible BOOLEAN NOT NULL DEFAULT TRUE,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT NULL,
    author_id CHAR(36) NOT NULL,
    post_id INT NOT NULL,
    CONSTRAINT fk_post_comment_author_id
    FOREIGN KEY (author_id) REFERENCES user(id),
    CONSTRAINT fk_post_comment_post_id
    FOREIGN KEY (post_id) REFERENCES fraud_post(id)
);

CREATE TABLE post_reaction (
    user_id CHAR(36) NOT NULL,
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


-- ===================================
--  FRAUD TYPE RELATIONSHIPS
-- ===================================

CREATE TABLE fraud_type_subscription (
    user_id CHAR(36) NOT NULL,
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


-- ===================================
--  AUTHORITY REFERRALS
-- ===================================

CREATE TABLE fraud_type_authority (
    fraud_type_id INT NOT NULL,
    authority_id INT NOT NULL,
    PRIMARY KEY (fraud_type_id, authority_id),
    CONSTRAINT fk_fta_fraud_type_id
    FOREIGN KEY (fraud_type_id) REFERENCES fraud_type(id),
    CONSTRAINT fk_fta_authority_id
    FOREIGN KEY (authority_id) REFERENCES authority(id)
);

CREATE TABLE post_authority (
    priority INT NOT NULL,
    post_id INT NOT NULL,
    authority_id INT NOT NULL,
    PRIMARY KEY (post_id, authority_id),
    CONSTRAINT fk_post_authority_post_id
    FOREIGN KEY (post_id) REFERENCES fraud_post(id),
    CONSTRAINT fk_post_authority_authority_id
    FOREIGN KEY (authority_id) REFERENCES authority(id)
);


-- ===================================
--  AUDIT
-- ===================================

CREATE TABLE audit_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    audit_action_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    performed_by_id CHAR(36) NOT NULL,
    affected_user_id CHAR(36) DEFAULT NULL,
    post_id INT DEFAULT NULL,
    evidence_id INT DEFAULT NULL,
    CONSTRAINT fk_audit_log_audit_action_id
    FOREIGN KEY (audit_action_id) REFERENCES audit_action(id),
    CONSTRAINT fk_audit_log_performed_by_id
    FOREIGN KEY (performed_by_id) REFERENCES user(id),
    CONSTRAINT fk_audit_log_affected_user_id
    FOREIGN KEY (affected_user_id) REFERENCES user(id),
    CONSTRAINT fk_audit_log_post_id
    FOREIGN KEY (post_id) REFERENCES fraud_post(id),
    CONSTRAINT fk_audit_log_evidence_id
    FOREIGN KEY (evidence_id) REFERENCES post_evidence(id)
);

CREATE TABLE audit_field_change (
    id INT AUTO_INCREMENT PRIMARY KEY,
    audit_log_id INT NOT NULL,
    modified_field_id INT NOT NULL,
    old_value TEXT DEFAULT NULL,
    new_value TEXT DEFAULT NULL,
    CONSTRAINT fk_audit_field_change_audit_log_id
    FOREIGN KEY (audit_log_id) REFERENCES audit_log(id),
    CONSTRAINT fk_audit_field_change_modified_field_id
    FOREIGN KEY (modified_field_id) REFERENCES modified_field(id)
);

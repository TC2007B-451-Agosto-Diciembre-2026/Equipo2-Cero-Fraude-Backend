-- DO NOT USE THESE CREDENTIALS IN PRODUCTION.

INSERT INTO user (id, username, email, password_hash, role_id)
VALUES (
    UUID(),
    "Admin",
    "admin@example.com",
    "$2b$12$YhfVrTut7s2kKa7jzBZo/OsNlTXulKztYYO9cVgKQkq7vpcUDWO1u",
    (SELECT id FROM user_role WHERE code = "ADMIN")
);

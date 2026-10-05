import os
import mysql.connector
from dotenv import load_dotenv

load_dotenv(".env")
db = mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
)

cursor = db.cursor()

for file in ["database/schema.sql", "database/seed.sql", "database/development.sql"]:
    print(f"Running {file}...")

    with open(file, "r", encoding="utf-8") as f:
        sql = f.read()

    for statement in sql.split(";"):
        statement = statement.strip()

        if statement:
            cursor.execute(statement)

db.commit()

cursor.close()
db.close()

print("Done.")

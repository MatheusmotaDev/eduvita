import psycopg2

def load_env():
    env = {}
    try:
        with open('.env.local', 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#'):
                    key, val = line.split('=', 1)
                    env[key.strip()] = val.strip()
    except Exception as e:
        pass
    return env

env = load_env()
db_url = env.get("DATABASE_URL")

conn = psycopg2.connect(db_url, sslmode='require')
cursor = conn.cursor()

cursor.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public'")
tables = cursor.fetchall()

print("Tabelas no BD:")
for t in tables:
    print("-", t[0])

cursor.close()
conn.close()

from database.database import init_db, reset_db
import sys
if len(sys.argv) > 1 and sys.argv[1] == '-r':
    print('resetting db...')
    reset_db()
init_db()

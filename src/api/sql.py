import sqlite3 as sql

db = sql.connect("printer.db",check_same_thread=False)
cur = db.cursor()

def createTable(tablename,values):
    i = 0
    text = ""
    for value in values:    
        if value == values[-1]:
            text += "'"+str(value)+"'"
        else:
            text += "'"+str(value)+"',"
    sql = "CREATE TABLE if not exists '"+tablename+"' ("+text+")"
    cur.execute(sql)
    db.commit()

def defaultSqlOptions():
    createTable("users",["id","name","password"])
    sqlunique = "CREATE UNIQUE INDEX if not exists idx_links ON links (id);"
    cur.execute(sqlunique)
    db.commit()


def userExist(user):
    sql = "SELECT name FROM users WHERE name = '"+user+"'"
    cur.execute(sql)
    res = cur.fetchall()
    if  len(list(res)) == 0:
        print("liste")
        print(res)
        return False
    else:
        return True

def userExistId(userid):
    sql = "SELECT name FROM users WHERE id = '"+str(userid)+"'"
    cur.execute(sql)
    res = cur.fetchall()
    if  len(list(res)) == 0:
        return False
    else:
        return True

def addUser(name,password):
    if not userExist(name):
        print("not exist")
        sqlid = "SELECT MAX(CAST(id AS INT )) FROM users;"
        cur.execute(sqlid)
        _id = cur.fetchall()[0][0]
        if _id == None:
            _id = 0
        add = "INSERT OR IGNORE INTO users VALUES ('"+str(int(_id)+1)+"','"+name+"','"+password+"')"
        cur.execute(add)
        db.commit()
    else:
        print("user is already exist")

def getUser(name):
    sql = "SELECT * FROM users WHERE name = '"+name+"'"
    cur.execute(sql)
    return(cur.fetchall()[0])

def getUserById(id):
    sql = "SELECT * FROM users WHERE id = '"+id+"'"
    cur.execute(sql)
    return(cur.fetchall()[0])
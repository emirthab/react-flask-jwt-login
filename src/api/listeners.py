from typing import cast
from flask import request
from flask import Blueprint
import api.sql as sql
import jwt
import datetime

listener = Blueprint("listener",__name__)

mysecret = "secret12345"
mainAdress = "/api/v1"

@listener.route(mainAdress+"/login",methods=['GET','POST'])
def login():
    if request.method == 'POST':
        content = request.json     
        userName = str(content["name"])
        getToken = content["token"]
        print(content)        
        if getToken != "" and getToken != None:            
            getId = decode_auth_token(getToken)   
            print(getId)  
            try:
                print("denemee")
                getId = int(getId)
                if sql.userExistId(getId):                    
                    return {"resp":"ok"}
                else:
                    return {"resp":"idNotFound"}
            except ValueError:                                                                        
                return {"resp":"tokenNotFound"}
            
        elif userName != "" and userName != None:            
            if sql.userExist(userName):                      
                user = sql.getUser(userName)                
                _id = user[0]                
                password = user[2]
                getPass = str(content["password"])
                if getPass != None and getPass != "":
                    if password == getPass:         
                        token = generateToken(_id)                    
                        print(_id)
                        print(token)
                        return {"resp":"ok","token":token}
                    else:
                        return {"resp":"wrongpass"}
                else:
                        return {"resp":""}            
            else:
                return {"resp":"wrongusername"}
        else:
            return {"resp":""}                    
    else:
        return {"resp":"wrongrequest"}



def generateToken(user_id):
    try:
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0,minutes=2),
            'iat': datetime.datetime.utcnow(),
            'userid': user_id
        }
        return jwt.encode(
            payload,
            mysecret,
            algorithm='HS256'
        )
    except Exception as e:
        return e


def decode_auth_token(auth_token):
    try:
        payload = jwt.decode(auth_token, mysecret,algorithms="HS256")
        return payload["userid"]
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'    

#token = generateToken("3231")
#print("auth token is : "+token)
#print("decoded : "+str(decode_auth_token("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjUzNTQ4OTcsImlhdCI6MTYyNTM1NDg0NywidXNlcmlkIjoiMzIzMSJ9.B8Hvx_b5z47GykVk1oQuF7IK0dqLb9jx51TjGy2EfGE")))
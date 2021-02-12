import os

from flask import Flask, render_template
from flask_socketio import SocketIO, send

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@app.route("/")
def index():
    return render_template("index.html")

@socketio.on('message')
def message(data):
    print(f"\n{data}\n")
    send({'msg': data["msg"], 'username': data["username"], "time":data["time"]}, broadcast=True)
    # emit('custom-message', 'this is message')

# @socketio.on('new username')
# def new_username(data):
#     username=""
#     # print(data["username"])
#     username=data["username"]
#     print(username)
#     emit("add username",{"username":username})


if __name__ == '__main__':
    socketio.run(app)

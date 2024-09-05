from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/')
def main():
    if request.method == 'POST':
        pass
    return render_template('index.html')

app.run(host="0.0.0.0", port=8080)

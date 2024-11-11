from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO, emit
import sqlite3

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
socketio = SocketIO(app, cors_allowed_origins="*")  # Initialize SocketIO

DATABASE = 'washing_machines.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

# Initialize the database
def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS machines (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            status TEXT NOT NULL,
            usage_until TEXT
        )
    ''')
    cursor.execute('SELECT COUNT(*) FROM machines')
    if cursor.fetchone()[0] == 0:
        cursor.executemany('''
            INSERT INTO machines (name, status, usage_until) VALUES (?, ?, ?)
        ''', [('Machine 1', 'working', None),
              ('Machine 2', 'working', None),
              ('Machine 3', 'working', None),
              ('Machine 4', 'working', None)])
    conn.commit()
    conn.close()

@app.route('/machines', methods=['GET'])
@cross_origin()
def get_machines():
    conn = get_db_connection()
    machines = conn.execute('SELECT * FROM machines').fetchall()
    conn.close()
    return jsonify([dict(machine) for machine in machines])

@app.route('/machines/<int:machine_id>', methods=['PUT'])
@cross_origin()
def update_machine(machine_id):
    data = request.get_json()
    status = data.get('status')
    usage_until = data.get('usage_until')

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE machines
        SET status = ?, usage_until = ?
        WHERE id = ?
    ''', (status, usage_until, machine_id))
    conn.commit()
    conn.close()

    # Emit an update event to notify the frontend
    socketio.emit('machine_update', {'id': machine_id, 'status': status, 'usage_until': usage_until})

    return jsonify({'message': 'Machine updated successfully'})

if __name__ == '__main__':
    init_db()
    socketio.run(app, debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO, emit
import sqlite3
import datetime
import os

app = Flask(__name__)
# Configure CORS based on environment
if os.environ.get('FLASK_ENV') == 'production':
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
    socketio = SocketIO(app, cors_allowed_origins="*", async_mode='eventlet')
else:
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
    socketio = SocketIO(app, cors_allowed_origins="*")

DATABASE = 'washing_machines.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

# Initialize the database
def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Create the machines table if it doesn't exist
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS machines (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            status TEXT NOT NULL,
            usage_until TEXT,
            last_state_change TEXT
        )
    ''')
    
    # Check if last_state_change column exists
    cursor.execute("PRAGMA table_info(machines)")
    columns = [column[1] for column in cursor.fetchall()]
    
    # Add last_state_change column if it doesn't exist
    if 'last_state_change' not in columns:
        cursor.execute('ALTER TABLE machines ADD COLUMN last_state_change TEXT')
        # Set initial value for existing rows
        current_time = datetime.datetime.now().isoformat()
        cursor.execute('UPDATE machines SET last_state_change = ?', (current_time,))
    
    cursor.execute('SELECT COUNT(*) FROM machines')
    if cursor.fetchone()[0] == 0:
        current_time = datetime.datetime.now().isoformat()
        cursor.executemany('''
            INSERT INTO machines (name, status, usage_until, last_state_change) VALUES (?, ?, ?, ?)
        ''', [('Machine 1', 'working', None, current_time),
              ('Machine 2', 'working', None, current_time),
              ('Machine 3', 'working', None, current_time),
              ('Machine 4', 'working', None, current_time)])
    
    # Create the peak_hours table to track usage
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS peak_hours (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            weekday INTEGER NOT NULL,
            hour INTEGER NOT NULL,
            count INTEGER NOT NULL
        )
    ''')
    
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
    last_state_change = data.get('last_state_change')

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE machines
        SET status = ?, usage_until = ?, last_state_change = ?
        WHERE id = ?
    ''', (status, usage_until, last_state_change, machine_id))

    # Add the current time and weekday to the peak_hours table or increment the counter if the entry already exists
    now = datetime.datetime.now()
    weekday = now.weekday()  # 0 = Monday, 6 = Sunday
    hour = now.hour

    cursor.execute('''
        SELECT count FROM peak_hours WHERE weekday = ? AND hour = ?
    ''', (weekday, hour))
    result = cursor.fetchone()
    if result:
        # Increment the existing counter
        cursor.execute('''
            UPDATE peak_hours
            SET count = count + 1
            WHERE weekday = ? AND hour = ?
        ''', (weekday, hour))
    else:
        # Insert a new entry with count = 1
        cursor.execute('''
            INSERT INTO peak_hours (weekday, hour, count) VALUES (?, ?, ?)
        ''', (weekday, hour, 1))

    conn.commit()
    conn.close()

    # Emit an update event to notify the frontend
    socketio.emit('machine_update', {
        'id': machine_id, 
        'status': status, 
        'usage_until': usage_until,
        'last_state_change': last_state_change
    })

    return jsonify({'message': 'Machine updated successfully'})

@app.route('/peak_hours', methods=['GET'])
@cross_origin()
def get_peak_hours():
    # Return the peak hours table in JSON format to the frontend
    conn = get_db_connection()
    peak_hours = conn.execute('SELECT * FROM peak_hours').fetchall()
    conn.close()
    return jsonify([dict(peak_hour) for peak_hour in peak_hours])

if __name__ == '__main__':
    init_db()
    socketio.run(app, debug=True)

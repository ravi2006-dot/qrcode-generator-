from flask import Flask, request, jsonify, send_file, render_template
import qrcode
from io import BytesIO

app = Flask(__name__)

# Route for serving the main page
@app.route('/')
def home():
    return render_template('index.html')

# Route for generating QR codes
@app.route('/generate_qr', methods=['POST'])
def generate_qr():
    data = request.json.get("data")
    if not data:
        return jsonify({"error": "No data provided"}), 400

    # Generate the QR code
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(data)
    qr.make(fit=True)

    img = qr.make_image(fill="black", back_color="white")

    # Save to a BytesIO buffer
    buffer = BytesIO()
    img.save(buffer, format="PNG")
    buffer.seek(0)

    return send_file(buffer, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)

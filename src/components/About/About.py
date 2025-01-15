from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

app = Flask(__name__)
CORS(app)

# E-posta gönderme fonksiyonu
def send_email(subject, message, from_email, to_email):
    try:
        # E-posta sunucusuna bağlanıyoruz (örneğin, Gmail)
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login('your_email@gmail.com', 'your_email_password')  # GMail hesabınızı girin

        # E-posta içeriğini oluşturuyoruz
        msg = MIMEMultipart()
        msg['From'] = from_email
        msg['To'] = to_email
        msg['Subject'] = subject

        msg.attach(MIMEText(message, 'plain'))

        # E-postayı gönderiyoruz
        server.sendmail(from_email, to_email, msg.as_string())
        server.quit()

        return True
    except Exception as e:
        print(f"Error: {str(e)}")
        return False

@app.route('/send-email', methods=['POST'])
def send_form_email():
    data = request.json  # React formundan gelen JSON verisini alıyoruz

    # Formdan gelen verileri alıyoruz
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    ip_address = data.get('ip_address')
    country_flag = data.get('country_flag')
    country_code = data.get('country_code')
    city = data.get('city')

    # E-posta mesajı oluşturuyoruz
    subject = f"New message from {name}"
    full_message = f"Name: {name}\nEmail: {email}\nMessage: {message}\n\nLocation: {city}, {country_code}\nIP: {ip_address}\nCountry Flag: {country_flag}"

    # E-posta gönder
    success = send_email(subject, full_message, email, 'sultanoworks@gmail.com')

    if success:
        return jsonify({"message": "Email sent successfully!"}), 200
    else:
        return jsonify({"message": "Failed to send email."}), 500

if __name__ == '__main__':
    app.run(debug=True)

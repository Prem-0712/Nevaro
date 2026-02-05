# utils.py
import threading
import logging
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings

class SendEmail(threading.Thread):

    def __init__(self, email):
        self.email = email
        threading.Thread.__init__(self)

    def run(self):
        self.email.send()
            
def send_activation_email(recipient_email, activation_url):

    subject = f'Activate your account on {settings.SITE_NAME}'
    from_email = settings.EMAIL_HOST_USER
    to_email = [recipient_email]

    html_content = render_to_string('account/account_activation_email.html', {'activation_url': activation_url})
    text_content = strip_tags(html_content)

    email = EmailMultiAlternatives(subject, text_content, from_email, to_email)
    email.attach_alternative(html_content, 'text/html')
    SendEmail(email).start()

def send_password_reset_email(recipient_email, password_reset_url):

    subject = f'Reset your password on {settings.SITE_NAME}'
    from_email = settings.EMAIL_HOST_USER
    to_email = [recipient_email]

    html_content = render_to_string('account/reset_password_email.html', {'password_reset_url': password_reset_url})
    text_content = strip_tags(html_content)

    email = EmailMultiAlternatives(subject, text_content, from_email, to_email)
    email.attach_alternative(html_content, 'text/html')
    SendEmail(email).start()
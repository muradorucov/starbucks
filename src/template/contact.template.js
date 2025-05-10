function contactTemplate({ fullName, email, phone, message, subject }) {
    return `
    <table style="width: 100%; max-width: 600px; margin: auto; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; color: #333;">
  <tr>
    <td style="background-color: #0074BD; color: white; padding: 20px; text-align: center; font-size: 18px; font-weight: bold;">
      Yeni Əlaqə Mesajı
    </td>
  </tr>
  <tr>
    <td style="padding: 20px;">
      <p><strong>Ad Soyad:</strong> ${fullName}</p>
      <p><strong>Telefon:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mövzu:</strong> ${subject}</p>
      <p><strong>Mesaj:</strong></p>
      <div style="padding: 10px; background-color: #f8f8f8; border-left: 3px solid #0074BD; margin-top: 10px;">
        ${message}
      </div>
    </td>
  </tr>
  <tr>
    <td style="background-color: #f0f0f0; padding: 10px; text-align: center; font-size: 12px; color: #777;">
      Bu mesaj veb sayt üzərindən göndərilib.
    </td>
  </tr>
</table>
`
}

module.exports = contactTemplate
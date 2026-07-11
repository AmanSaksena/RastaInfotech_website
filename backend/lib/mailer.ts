import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

const statusMessages: Record<string, { subject: string; heading: string; body: string; color: string }> = {
  shortlisted: {
    subject: 'Great News! You Have Been Shortlisted – Rasta Infotech',
    heading: 'Congratulations! You\'ve Been Shortlisted 🎉',
    body: 'We are pleased to inform you that your application has been reviewed and you have been shortlisted for the next stage of our selection process. Our team will reach out to you shortly with further details about the interview.',
    color: '#00C896',
  },
  rejected: {
    subject: 'Application Update – Rasta Infotech',
    heading: 'Application Status Update',
    body: 'Thank you for your interest in Rasta Infotech and for taking the time to apply. After careful consideration, we regret to inform you that we will not be moving forward with your application at this time. We appreciate your effort and encourage you to apply for future openings.',
    color: '#FF4444',
  },
  reviewed: {
    subject: 'Your Application Is Being Reviewed – Rasta Infotech',
    heading: 'Application Under Review',
    body: 'We wanted to let you know that your application is currently being reviewed by our team. We will get back to you with an update soon. Thank you for your patience.',
    color: '#0066FF',
  },
  offer: {
    subject: 'Congratulations! You Have Received an Offer – Rasta Infotech',
    heading: 'You Have Received an Offer! 🎊',
    body: 'We are thrilled to extend an official offer to you for the position you applied for. This is a significant milestone and we are excited to have you join the Rasta Infotech family. Our HR team will contact you shortly with the offer letter and next steps for onboarding.',
    color: '#0066FF',
  },
}

export async function sendApplicationStatusEmail(
  to: string,
  name: string,
  position: string,
  status: string
) {
  const template = statusMessages[status]
  if (!template) return

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin:0;padding:0;background:#f4f6fb;font-family:'Segoe UI',Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;padding:40px 0;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

            <!-- Header -->
            <tr>
              <td style="background:#0A1628;padding:32px 40px;text-align:center;">
                <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:800;letter-spacing:-0.5px;">Rasta Infotech</h1>
                <p style="margin:4px 0 0;color:#8892A4;font-size:13px;">Where IT Excellence Meets Career Assurance</p>
              </td>
            </tr>

            <!-- Status Banner -->
            <tr>
              <td style="background:${template.color};padding:16px 40px;text-align:center;">
                <p style="margin:0;color:#ffffff;font-size:14px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Application Status: ${status.toUpperCase()}</p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:40px;">
                <h2 style="margin:0 0 16px;color:#0A1628;font-size:22px;font-weight:700;">${template.heading}</h2>
                <p style="margin:0 0 12px;color:#444;font-size:15px;line-height:1.6;">Dear <strong>${name}</strong>,</p>
                <p style="margin:0 0 20px;color:#444;font-size:15px;line-height:1.6;">${template.body}</p>

                <!-- Application Summary Card -->
                <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:10px;padding:20px;margin-bottom:24px;">
                  <tr><td style="padding:8px 0;border-bottom:1px solid #e8edf2;">
                    <span style="color:#8892A4;font-size:13px;">Position Applied</span><br>
                    <strong style="color:#0A1628;font-size:15px;">${position}</strong>
                  </td></tr>
                  <tr><td style="padding:8px 0;">
                    <span style="color:#8892A4;font-size:13px;">Current Status</span><br>
                    <strong style="color:${template.color};font-size:15px;text-transform:capitalize;">${status}</strong>
                  </td></tr>
                </table>

                <p style="margin:0 0 24px;color:#444;font-size:15px;line-height:1.6;">You can also check your application status anytime by visiting our website.</p>

                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/application-status"
                   style="display:inline-block;background:linear-gradient(135deg,#0066FF,#00C896);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:700;font-size:15px;">
                  Check Application Status
                </a>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f8fafc;padding:24px 40px;text-align:center;border-top:1px solid #e8edf2;">
                <p style="margin:0 0 4px;color:#8892A4;font-size:13px;">Rasta Infotech | Bangalore, India</p>
                <p style="margin:0;color:#8892A4;font-size:13px;">
                  <a href="mailto:info@rastainfotech.com" style="color:#0066FF;text-decoration:none;">info@rastainfotech.com</a> | +91-97425-07066
                </p>
              </td>
            </tr>

          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `

  await transporter.sendMail({
    from: `"Rasta Infotech Careers" <${process.env.EMAIL_USER}>`,
    to,
    subject: template.subject,
    html,
  })
}

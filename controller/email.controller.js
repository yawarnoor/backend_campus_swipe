
const nodemailer = require('nodemailer');

exports.sendEmail = (req, res) => {
    const { userEmail, pdfBase64 } = req.body;

    console.log('Received request with userEmail:', userEmail);

    if (!pdfBase64) {
        return res.status(400).send('pdfBase64 is missing or undefined');
    }

    // Convert the Base64-encoded string to a Buffer
    const pdfBuffer = Buffer.from(pdfBase64, 'base64');

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'larry22@ethereal.email',
            pass: 'tx5UPrEpStzCYrrFz5'
        },

  // Add timeout configuration
  connectionTimeout: 60000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
    });

    const mailOptions = {
        from: 'yawarnoor.bscssef20@iba-suk.edu.pk',
        to: userEmail,
        subject: 'Invoice CampusSwipe',
        text: 'Please find your invoice attached.',
        attachments: [
            {
                filename: 'invoice.pdf',
                content: pdfBuffer,
                encoding: 'base64',
            },
        ],
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Failed to send email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully.');
        }
    });
}


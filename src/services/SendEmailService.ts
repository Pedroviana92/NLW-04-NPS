import nodemailer, { Transporter } from 'nodemailer'


class SendEmailService {
    private client: Transporter
    constructor() {
        nodemailer.createTestAccount().then((account)=>{
            let transporter = nodemailer.createTransport({
                host: 'pedrovianaaraujosilva@gmail.com',
                port: 25,
                secure: false,
                auth: {
                    user: 'pedrovianaaraujosilva@gmail.com',
                    pass: '992900kkPP*'
                }
            })
            this.client = transporter;
        })
    }

    async execute(to: string, subject: string, body: string){
       const message = await this.client.sendMail({
        to,
        subject,
        html: body,
        from: "pedrovianaaraujosilva@gmail.com"
       })
       console.log('Message sent: %s', message.messageId)
       console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
    }

}

export default new SendEmailService()
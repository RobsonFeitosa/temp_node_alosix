import { injectable, inject } from 'tsyringe'
import fs from 'fs'

import AppError from '@shared/errors/AppError'
import path from 'path'

import IUserTransactionsRepository from '../repositories/IUserTransactionsRepository'
import UserTransaction from '../infra/typeorm/entities/UserTransactions'
import IUsersRepository from '../repositories/IUsersRepository'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import formatValue from '@modules/utils/formatValue'

import handlebars from 'handlebars'

interface IRequest {
  transactionId: string
}

@injectable()
class TesteService {
  constructor(
    @inject('UserTransactionsRepository')
    private userTransactionsRepository: IUserTransactionsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ transactionId }: IRequest): Promise<UserTransaction> {
    const transaction =
      await this.userTransactionsRepository.findById(transactionId)

    if (!transaction) throw new AppError('Transaction not found')

    transaction.status = 'paid'

    await this.sendEmail(transaction)

    await this.userTransactionsRepository.save(transaction)

    return transaction
  }

  private async sendEmail(transaction: UserTransaction): Promise<void> {
    const user = await this.usersRepository.findById(transaction.user_id)

    if (!user) throw new AppError('User does not exists.')

    const template = path.resolve(__dirname, '..', 'views', 'receipt.hbs')

    const idOrder = transaction.order_id.substr(0, 11)
    this.createPDF(
      {
        name: user.name,
        total: formatValue(transaction.amount / 100),
        idOrder,
        discount: 0,
        netTotal: formatValue(transaction.amount / 100),
      },
      template,
    )

    // await this.mailProvider.sendMail({
    //   to: {
    //     name: user.name,
    //     email: user.email,
    //   },
    //   subject: `[Alosix] Recibo - ${idOrder}`,
    //   templateData: {
    //     file: template,
    //     variables: {
    //       name: user.name,
    //       total: formatValue(transaction.amount / 100),
    //       idOrder,
    //       discount: 0,
    //       netTotal: formatValue(transaction.amount / 100),
    //     },
    //   },
    // });
  }

  private async createPDF(data: any, templateUrl: string): Promise<void> {
    const templateHtml = fs.readFileSync(
      path.join(process.cwd(), './src/modules/users/views/template.html'),
      'utf8',
    )
    const template = handlebars.compile(templateHtml)
    const html = template(data)

    const milis = new Date()
    const milis2 = milis.getTime()

    const pdfPath = path.join('pdf', `${data.name}-${milis2}.pdf`)

    const options = {
      width: '1230px',
      headerTemplate: '<p></p>',
      footerTemplate: '<p></p>',
      displayHeaderFooter: false,
      margin: {
        top: '10px',
        bottom: '30px',
      },
      printBackground: true,
      path: pdfPath,
    }

    // const browser = await puppeteer.launch({
    //   args: ['--no-sandbox'],
    //   headless: true
    // });
    // const browser = await puppeteer.launch({
    //   args: ['--no-sandbox'],
    //   headless: true
    // });

    // const page = await browser.newPage();

    // await page.goto(`data:text/html;charset=UTF-8,${html}`, {
    //   waitUntil: 'networkidle0'
    // });

    // await page.pdf(options);
    // await browse

    // const page = await browser.newPage();

    // await page.goto(`data:text/html;charset=UTF-8,${html}`, {
    //   waitUntil: 'networkidle0'
    // });

    // await page.pdf(options);
    // await browser.close();
  }
}

export default TesteService

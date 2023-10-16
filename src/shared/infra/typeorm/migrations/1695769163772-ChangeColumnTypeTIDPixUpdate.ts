import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export default class ChangeColumnTypeTIDPixUpdate1695769163772
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('user_transactions', 'tid')
    await queryRunner.addColumn(
      'user_transactions',
      new TableColumn({
        name: 'tid',
        type: 'varchar',
        isNullable: true,
        default: false,
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('user_transactions', 'tid')
    await queryRunner.addColumn(
      'user_transactions',
      new TableColumn({
        name: 'tid',
        type: 'int',
        isNullable: true,
        default: false,
      }),
    )
  }
}

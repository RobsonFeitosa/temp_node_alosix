import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddColumnIsFirstCalculation1683746603550
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users_settings',
      new TableColumn({
        name: 'is_first_calculation',
        type: 'boolean',
        isNullable: true,
        default: false,
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users_settings', 'is_first_calculation')
  }
}

import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export default class CreateTableSampleCalculated1662939514495
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    await queryRunner.createTable(
      new Table({
        name: 'samples_calculated',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'sample_id',
            type: 'uuid',
          },
          {
            name: 'interpretation',
            type: 'varchar',
          },
          {
            name: 'calculation',
            type: 'varchar',
          },
        ],
        foreignKeys: [
          {
            name: 'SamplesID',
            referencedTableName: 'samples',
            referencedColumnNames: ['id'],
            columnNames: ['sample_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('samples_calculated')
  }
}

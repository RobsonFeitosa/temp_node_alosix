import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateMappingReport1693942223702 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'mapping_report',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'collaborator_id',
            type: 'uuid',
          },
          {
            name: 'row_start',
            type: 'varchar',
          },
          {
            name: 'row_finish',
            type: 'varchar',
          },
          {
            name: 'row_position',
            type: 'varchar',
          },
          {
            name: 'units',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'CollaboratorUser',
            referencedTableName: 'collaborator',
            referencedColumnNames: ['id'],
            columnNames: ['collaborator_id'],
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('collaborator')
  }
}

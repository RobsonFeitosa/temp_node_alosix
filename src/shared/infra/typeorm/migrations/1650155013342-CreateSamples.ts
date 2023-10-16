import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export default class CreateSamples1650155013342 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    await queryRunner.createTable(
      new Table({
        name: 'samples',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'description_cuture',
            type: 'varchar',
          },
          {
            name: 'tb_1_description_deep_culture',
            type: 'varchar',
          },
          {
            name: 'tb_1_clay',
            type: 'varchar',
          },
          {
            name: 'tb_1_silt',
            type: 'varchar',
          },
          {
            name: 'tb_1_sand',
            type: 'varchar',
          },
          {
            name: 'tb_2_organic_matter',
            type: 'varchar',
          },
          {
            name: 'tb_2_ph',
            type: 'varchar',
          },
          {
            name: 'tb_3_p_phosphor',
            type: 'varchar',
          },
          {
            name: 'tb_3_k_potassium',
            type: 'varchar',
          },
          {
            name: 'tb_3_na_sodium',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'tb_3_s_sulfur',
            type: 'varchar',
          },
          {
            name: 'tb_3_b_boron',
            type: 'varchar',
          },
          {
            name: 'tb_3_cu_copper',
            type: 'varchar',
          },
          {
            name: 'tb_3_fe_iron',
            type: 'varchar',
          },
          {
            name: 'tb_3_mn_manganese',
            type: 'varchar',
          },
          {
            name: 'tb_3_zn_zinc',
            type: 'varchar',
          },
          {
            name: 'tb_4_ca_calcium',
            type: 'varchar',
          },
          {
            name: 'tb_4_mg_magnesium',
            type: 'varchar',
          },
          {
            name: 'tb_4_al_aluminum',
            type: 'varchar',
          },
          {
            name: 'tb_4_h_al_potential_acidity',
            type: 'varchar',
          },
          {
            name: 'fertilizing_objective_culture',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'carbon_stock_density_soil',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar',
          },
          {
            name: 'uf',
            type: 'varchar',
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
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
            name: 'SampleUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('samples')
  }
}

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePhotosTable1611069855548 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'photos',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'converted_name',
            type: 'varchar',
          },
          {
            name: 'client_name',
            type: 'varchar',
          },
          {
            name: 'file_path',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'date',
            isNullable: true,
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'deleted_at',
            type: 'date',
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('photos');
  }
}

import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddConvertedColumnToPhotosTable1613576510067
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'photos',
      new TableColumn({
        name: 'converted_file_path',
        type: 'varchar',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('photos', 'converted_file_path');
  }
}

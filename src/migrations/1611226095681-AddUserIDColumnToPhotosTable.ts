import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddUserIDColumnToPhotosTable1611226095681
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'photos',
      new TableColumn({
        name: 'user_id',
        type: 'int',
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      'photos',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('photos', 'user_id');
    const table = await queryRunner.getTable('photos');
    const foreignKey: any = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1
    );
    await queryRunner.dropForeignKey('photos', foreignKey);
  }
}

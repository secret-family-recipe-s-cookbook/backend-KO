exports.up = function(knex) {
  return knex.schema.createTable('recipes', table => {
    table.increments();
    table.text('recipe_image').nullable();
    table.text('title').notNullable();
    table.text('description').notNullable();
    table.text('ingredients').notNullable();
    table.text('directions').notNullable();
    table.text('Notes').nullable();
    table.text('source').nullable();
    table.text('bio').nullable();
    table.text('source_image').nullable();
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .notNullable()
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('recipes');
};

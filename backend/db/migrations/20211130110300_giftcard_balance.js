exports.up = function (knex) {
    return knex.schema.createTable('gitfcard_balance', (t) => {
      t.increments('id').primary().notNullable();
      t.integer('user_id').notNullable().references('id').inTable('users');
      t.float('balance').notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('giftcard_logs');
  };

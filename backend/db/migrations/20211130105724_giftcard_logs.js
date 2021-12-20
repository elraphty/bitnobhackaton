exports.up = function (knex) {
    return knex.schema.createTable('giftcard_logs', (t) => {
      t.increments('id').primary().notNullable();
      t.integer('user_id').notNullable().references('id').inTable('users');
      t.string('code').notNullable();
      t.float('amount').notNullable();
      t.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('giftcard_logs');
  };

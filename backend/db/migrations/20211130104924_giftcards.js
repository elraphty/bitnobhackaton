exports.up = function (knex) {
  return knex.schema.createTable('gitfcards', (t) => {
    t.increments('id').primary().notNullable();
    t.integer('user_id').notNullable().references('id').inTable('users');
    t.string('code').unique().notNullable();
    t.float('amount').notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('giftcards');
};

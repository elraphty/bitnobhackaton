exports.up = function (knex) {
    return knex.schema.createTable('users', (t) => {
      t.increments('id').primary().notNullable();
      t.string('email').unique().notNullable();
      t.string('password').notNullable();
      t.string('name').notNullable();
      t.string('phone').notNullable();
      t.string('customer_id');
      t.enum('user_type', ['user', 'admin'])
        .notNullable()
        .defaultTo('user');
      t.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('users');
  };
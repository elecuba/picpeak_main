exports.up = async function (knex) {
  await knex.schema.alterTable('events', table => {
    table.integer('photo_cap').defaultTo(0);
  });

  await knex.schema.alterTable('photos', table => {
    table.timestamp('taken_at');
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable('events', table => {
    table.dropColumn('photo_cap');
  });

  await knex.schema.alterTable('photos', table => {
    table.dropColumn('taken_at');
  });
};

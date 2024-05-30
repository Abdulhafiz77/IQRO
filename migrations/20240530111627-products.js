var dbm;
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.runSql(`
  CREATE TABLE IF NOT EXISTS public.product (
    id                  SERIAL PRIMARY KEY,
    name                VARCHAR(255) NOT NULL,
    price               INTEGER DEFAULT 0,
    description         VARCHAR(255) DEFAULT NULL,
    status              INTEGER DEFAULT 10,
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

      CREATE TABLE IF NOT EXISTS public.user (
        id              SERIAL PRIMARY KEY,
        email           VARCHAR(255) NOT NULL,
        password        VARCHAR(255) DEFAULT NULL,
        username        VARCHAR(255) NOT NULL,
        status          INTEGER DEFAULT 10,
        product_id      INTEGER NOT NULL,
        CONSTRAINT user_product_id FOREIGN KEY (product_id) REFERENCES public.product (id),
        created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT unique_user_email UNIQUE (email),
        CONSTRAINT unique_user_username UNIQUE (username)
    );
`, function (err) {
    if (err) return callback(err);
    callback();
  });
};

exports.down = function (db, callback) {
  db.runSql(`
          DROP TABLE IF EXISTS public.user;
          DROP TABLE IF EXISTS public.product;
          `, function (err) {
    if (err) return callback(err);
    callback();
  });
};

exports._meta = {
  "version": 1
};

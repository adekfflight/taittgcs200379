var db = window.openDatabase("3t_shop", "1.0", "3T Shop", 200000);

function fetch_transaction_success(name){
    log("INFO", `Insert"${name}"successfully.`);
  }
  
  function table_transaction_success(table_name){
    log("INFO",`'create table "${table_name}" successfully`);
    
  
  }
  function log(type, message) {
    var current_time = new Date();
    console.log(`${current_time} [${type}] ${message}`);
  }
  
  function transaction_error(_tx, error) {
    log("ERROR", `SQL Error ${error.code}: ${error.message}.`);
  }


function initialize_database() {
    db.transaction(function (tx) {
      var query = `CREATE TABLE IF NOT EXISTS city (
        id INTEGER PRIMARY KEY ,
        name TEXT UNIQUE NOT NULL)`;
  
      tx.executeSql(
        query,
        [],
       table_transaction_success("city"),
        transaction_error
      );
      var query = `CREATE TABLE IF NOT EXISTS district(
        id INTEGER PRIMARY KEY ,
        name TEXT UNIQUE NOT NULL,
        city_id INTEGER NOT NULL,
        FOREIGN KEY (city_id) REFERENCES city(id))`;
  
        tx.executeSql(
          query,
          [],
         table_transaction_success("district"),
          transaction_error
        );
  
          var query = `CREATE TABLE IF NOT EXISTS ward(
            id INTEGER PRIMARY KEY ,
            name TEXT UNIQUE NOT NULL,
            district_id INTEGER NOT NULL,
            FOREIGN KEY (district_id) REFERENCES district(id)
            )`;
  
      
          tx.executeSql(
            query,
            [],
           table_transaction_success("ward"),
            transaction_error
          );
  
      
  
        query = `CREATE TABLE IF NOT EXISTS account (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          name TEXT NULL,
          nickname TEXT NULL,
          birthday text NULL,
          phone TEXT NULL,
          street TEXT NULL,
          ward_id INTEGER NULL,
          district_id INTEGER NULL,
          city_id INTEGER NULL,
          status INTEGER NOT NULL,
          FOREIGN KEY (city_id) REFERENCES city(id))`;
        
          tx.executeSql (
            query, [], 
            table_transaction_success("account"), 
            transaction_error
          );
      
      var query = `CREATE TABLE IF NOT EXISTS category(
       id INTEGER PRIMARY KEY AUTOINCREMENT, 
       name TEXT UNIQUE NOT NULL,
       description TEXT NULL,
       parent_id INTEGER NULL,
       FOREIGN KEY (parent_id) REFERENCES category(id) 
      
      )`;
  
  
      tx.executeSql (
        query, [], table_transaction_success("category"), transaction_error
      );
  
  
      var query = `CREATE TABLE IF NOT EXISTS product(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        description TEXT NULL,
        price REAL NOT NULL,
        category_id INTEGER NOT NULL,
        FOREIGN KEY (category_id) REFERENCES category(id)
  
      )`;
  
      tx.executeSql (
        query, [], table_transaction_success("product"), transaction_error
      );
  
  
      var query = `CREATE TABLE IF NOT EXISTS cart(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        account_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (account_id) REFERENCES account(id)
        FOREIGN KEY (product_id) REFERENCES product(id)
        )`;
  
  tx.executeSql (
        query, [], table_transaction_success("cart"), 
        transaction_error
      );
     
      });
      
  
  
  }
  
  
 function fetch_database(){
    db.transaction(function(tx) {
      query =`INSERT INTO category (name, description) VALUES (?, ?)`;
  
      tx.executeSql(query, ["category 01", "description 01"], fetch_transaction_success("Category 01"), transaction_error);
      tx.executeSql(query, ["category 02", "description 02"], fetch_transaction_success("Category 02"), transaction_error);
      tx.executeSql(query, ["category 03", "description 03"], fetch_transaction_success("Category 03"), transaction_error);
      tx.executeSql(query, ["category 04", "description 04"], fetch_transaction_success("Category 04"), transaction_error);
  
      query=`INSERT INTO account (username, password, status) VALUES (?, ?, 1)`;
      tx.executeSql(query, ["abc@abc.com", "123"], fetch_transaction_success("abc@abc.com"), transaction_error);

  
  }
    );
}
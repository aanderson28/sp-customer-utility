## sp-customer-utility
Imports customers from prod mongo to stage mongo

Setup
    
    npm install
    
1. Create a .env file in to run directory with the list of environment variables defined.
    - SOURCE_DB_HOST
    - SOURCE_DB_USER
    - SOURCE_DB_PW
    - DEST_DB_HOST
    - DEST_DB_PORT
    - DEST_DB_USER
    - DEST_DB_PW
    - DB_NAME
    
Run

    node main.js '{CustomerID}'

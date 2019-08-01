## sp-customer-utility
Imports customers from prod mongo to stage mongo

Setup
    
    npm install
    
1. Create a .env file in the run directory with the list of environment variables defined.(Make sure the database is retail-link)
    - SOURCE_URL
    - DEST_URL note: for localhost use mongodb://localhost:27017/<dbName>
    
Run

    node main.js '{CustomerID}'

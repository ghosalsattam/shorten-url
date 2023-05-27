
## Overview
This project focusses on creating a shortened version of a url. This is achieved by 2 apis.
1. The POST api to create a shortened url for a given original url.
2. Get api, to fetch the shortened urls and the corresponding original url.
### Running the server
To run the server, run:

```
npm start. 
The http server will start listening to port 8000.
```

### Swagger UI interface
```
open http://localhost:8080/api-docs
```

### Tests:

To run the tests run :
```
npm run dev-test
```
### Architecture Overview
For this project, I have used the API based approach, as these apis can be quickly integrated with any other type of serviceand triggered on any events(like click, pressing any key etc). For the backend, used MongoDB as the database is scalable, qickly adaptible to changes and can be optimized for queries by indexing. 
Used base 64encofing to generate and map urls to hashes. Other hashing techniques like md5 etc can lead to collision. sha-256 will generate urls of bigger length, which will be defeating the purpose of the project.
Currently implemented using 7 character long hash. With these we can generate 3.5 trillion different hashes.


### Todo
With current implementation, for every entry, the mongo is synchronized and every entry creates an entry in the db, fetches entries from db and then encodes/decodes it. It would be better to cache the latest updated value of the hash, which will reduce the db queries and will reduce the response time of the queries. But when deploying multiple instances of the microservice, there will be a synchronization problem as these values are local to the microservice, if cached. For that, a common synchronization mechanism to be decided and proposed in the architecture. 
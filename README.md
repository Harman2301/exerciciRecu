Construcció d'una API RESTful per a un sistema de gestió d'esdeveniments amb autenticació.

Instruccions:

    Crea un pdf amb captures on es vegi el funcionament de cada endpoint.
    Utilitza un repositori públic de GitHub , fes un commit per cada endpoint i penja l'enllaç en un fitxer "txt" dins de l'entrega.
    Crea una API RESTful amb Node.js utilitzant Express.
    Utilitza Mongoose com a ORM per interactuar amb una base de dades MongoDB.
    Utilitza el paquet dotenv per gestionar les variables d'entorn.
    Implementa la validació de paràmetres utilitzant el paquet Joi.
    Segueix les millors pràctiques de codificació i organització de l'estructura del projecte vistes a classe.

    En tots els endpoints següents retorna també el estat de resposta corresponent. Endpoints:

    Crea una ruta POST /api/auth/register que permeti registrar un nou usuari amb les següents dades obligatòries: nom (cadena de text), email (cadena de text) i contrasenya (cadena de text amb una longitud mínima de 8 caràcters). Utilitza el paquet bcrypt per encriptar la contrassenya abans de desar-la a la base de dades. Retorna només un missatge d'èxit o un missatge d'error si el registre no és vàlid.

    Crea una ruta POST /api/auth/login que permeti als usuaris iniciar sessió amb el seu email i contrassenya. Comprova les credencials, genera un JWT (Json Web Token) i retorna'l com a resposta en cas d'autenticació correcte. Retorna un missatge d'error adequat si les credencials no són vàlides.

    Crea una ruta POST /api/events que permeti afegir un nou esdeveniment a la base de dades. El cos de la sol·licitud hauria de contenir les següents dades: nom (cadena de text), descripcio (cadena de text), data (data), localitzacio (objecte amb els camps ciutat, carrer i codiPostal) i assistents (array d'objectes amb els camps nom i email). Aquesta ruta només hauria de ser accessible per a usuaris autenticats. Implementa la validació d'aquestes dades utilitzant el paquet Joi.

    Crea una ruta GET /api/events/:id que retorni les dades de l'esdeveniment corresponent a l'ID proporcionada com a paràmetre de ruta. Si el paràmetre no existeix retornarà tots els esdeveniments, si l'esdeveniment no existeix a la BBDD, retorna un missatge d'error adequat. De cada esdeveniment s'han de mostrar tots els camps menys el assistents, que només es mostrarà si s'envia un JWT vàlid.

Cal complir correctament i completament totes les instruccions i endpoints per a que l'exercici sigui vàlid.

Link: https://github.com/Harman2301/exerciciRecu

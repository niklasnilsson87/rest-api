# Agent REST API

Ett REST API för agenter där man kan registrera sig och fylla på med sina spelare för att hålla koll på tex. kontraktslängd och klubb.

Produktionssatt på https://api-1dv527.herokuapp.com/api

## Lokal utvecklingsmiljö

#### Förutsättningar

* Node.js
* Npm
* MongoAtlas connection string

#### Steg

* Klona ner repot
* Navigera till mappen examination-2
* ändra example.env till .env och lägg in dina värden
* ``npm install``
* ``node populateDB.js``
* ``npm run dev``

## Köra Tester

#### Förutsättningar

* newman installerat annars ``npm i -g newman``

#### Steg

* Klona ner repot
* Navigera in till postman mappen
* Kör testerna med ``newman run REST.postman_collection.json``

## Dokumentation

Dokumentation för apiet hittar ni i roten på applikationen /api

```
{
    "meta": {
    "title": "Agent REST-Api",
    "license": "MIT",
    "version": "v1",
    "author": "Niklas Nilsson",
    "desc": "Player agents can view, store, delete and update the players in their stall.",
    "authenticationDesc": "Register agent, login and recieve a token in playload to set in Authentication header to make requests."
    },
    "links": {
        "self": {
            "url": "http://api-1dv527.herokuapp.com/api",
            "method": "GET",
            "desc": "Api root"
        },
        "agents": {
            "register": {
                "url": "http://api-1dv527.herokuapp.com/api/v1/agents/register",
                "method": "POST",
                "desc": "Register: { username: <username>, password: <password>, email: <email> } (JSON format)"
            },
            "login": {
                "url": "http://api-1dv527.herokuapp.com/api/v1/agents/login",
                "method": "POST",
                "desc": "Login: { username: <username>, password: <password> } (JSON format), response: Token in payload"
            },
            "read": {
                "url": "http://api-1dv527.herokuapp.com/api/v1/agents",
                "method": "GET",
                "desc": "View all registered agents"
            },
            "readSingle": {
                "url": "http://api-1dv527.herokuapp.com/api/v1/agents/:id",
                "method": "GET",
                "desc": "View single agent",
                "access": "Private",
                "token": "Required"
            },
            "update": {
                "url": "http://api-1dv527.herokuapp.com/api/v1/agents/:id",
                "method": "PATCH",
                "desc": "Update: [ { propName: <property to change>, value: <newValue> } ], Add more objects in order to change muliple properties",
                "access": "Private",
                "token": "Required"
            },
            "delete": {
                "url": "http://api-1dv527.herokuapp.com/api/v1/agents/:id",
                "method": "DELETE",
                "desc": "Delete user",
                "access": "Private",
                "token": "Required"
            }
        },
        "players": {
            "add": {
                "url": "http://api-1dv527.herokuapp.com/api/v1/players",
                "method": "POST",
                "desc": "Add: { name: <playerName>, origin: <origin>, position: <position>, club: <club>, contractTo: < ex. 2022-02-12> }",
                "access": "Private",
                "token": "Required"
            },
            "read": {
                "url": "http://api-1dv527.herokuapp.com/api/v1/players",
                "method": "GET",
                "desc": "View all players"
            },
            "readSingle": {
                "url": "http://api-1dv527.herokuapp.com/api/v1/players/:id",
                "method": "GET",
                "desc": "View single player",
                "access": "Private",
                "token": "Required"
            },
            "update": {
                "url": "http://api-1dv527.herokuapp.com/api/v1/players/:id",
                "method": "PATCH",
                "desc": "Update: [ { propName: <property to change>, value: <newValue> } ], Add more objects in order to change muliple properties",
                "access": "Private",
                "token": "Required"
            },
            "delete": {
                "url": "http://api-1dv527.herokuapp.com/api/v1/players/:id",
                "method": "DELETE",
                "desc": "Delete player",
                "access": "Private",
                "token": "Required"
            }
        },
        "hooks": {
            "add": {
                "url": "http://api-1dv527.herokuapp.com/api/v1/hooks",
                "method": "POST",
                "desc": "Add: { callbackUrl: <url> }",
                "access": "Private",
                "token": "Required"
            },
            "read": {
                "url": "http://api-1dv527.herokuapp.com/api/v1/hooks",
                "method": "GET",
                "desc": "view all hooks",
                "access": "Private",
                "token": "Required"
            },
            "delete": {
                "url": "http://api-1dv527.herokuapp.com/api/v1/hooks/:id",
                "method": "DELETE",
                "desc": "Delete hook",
                "access": "Private",
                "token": "Required"
            }
        }
    }
}
```
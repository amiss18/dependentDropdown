Listes déroulantes liées dynamiques en Symfony 4.3 et AJAX
==========================================================

Liaison de plusieurs select liés.
En déroulant le select des régions, les départements associés sont chargés dans la 2ème liste.
De même en sélectionnant un département, les communes de ce dernier sont chargées dans le select
des communes.

Requirements
------------

  * PHP 7.1.3 ou plus;
  * PDO-SQLite PHP extension enabled;
  * and the [usual Symfony application requirements][2].
  
Installation
------------
Après avoir cloné, mettre à jour les dépendances:

```bash
$ composer install
```

Démarrer le serveur Web de dev:
 
```bash
$ php bin/console server:run
``` 

L'application démarre sur <http://localhost:8000>


Les commandes suivantes permettent de charger les régions, les départartements et les villes depuis l'api:
=========================================================================================================

```bash
 php bin/console app:geo region

 php bin/console app:geo departement

 php bin/console app:geo ville
 ```
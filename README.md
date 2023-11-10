# projet-web-M1

Nous avons dans un premier temps:
  - Créer les modèles pour les Authors / Books / Genres / Users.
  - Créer la page d'accueil avec une navigation vers les différentes pages.

Au niveau du Back :
    Le prochain objectif à été de gérer intégralement les auteurs.
        - Les méthodes API (Create, Delete, Get, GetById) ont été implémentées.
Au niveau du Front :
    Il a fallu récupérer les données des auteurs créés dans le Back et les afficher dans le Front.pour la page /authors et /authors/:id

Une fois les auteurs gérés, nous avons géré les genres:
    Dans un premier temps les genres sont gérés de la même manière que les auteurs, avec les méthodes API (Create, Delete, Get, GetById) et un modèle GenreModel. Cependant réalisant que les genres sont liés aux livres avec la table 'BookGenres' nous avons décidé d'abandonner la gestion des genres de cette manière.

Une fois cela effectué, nous avons il était maintenant possible de créer des livres, qui ont une dépendance à un auteur et des genres.
Au niveau du Back :
    Les méthodes API (Create, Delete, Get, GetById) ont été implémentées.
        Pour la méthode Create, il a fallu gérer les dépendances avec les auteurs et les genres.
        La plus grande difficulté a été de gérer les genres, car il fallait lier les genres du livre avec la table 'BookGenres' qui est une table de liaison entre les livres et les genres.

        L'utilisation d'une modale de création de livre dans laquel les genres et auteurs sont séléctionnables à partir de listes déroulantes fut une bonne idée car il ne nous était plus nécéssaire de vérifier si les genres et auteurs existaient déjà.

Pour la gestion des Users: 
    Au niveau du Back :
        Les méthodes API (Create, Delete, Get, GetById) ont été implémentées.

Lors de la connexion au site l'utilisateur à la possiblité de se connecter avec un prénom et un nom.
Dans le cas ou cet utilisateur n'existe pas, il est créé automatiquement s'il le souhaite.

LES BOOKS:
    Pour la page /books, il est possible de:
        - Ajouter des nouveaux: une modale s'ouvre ou il est possible de renseigner les informations du livre (nom, auteur, date, genres), en précisant que les auteurs et genres sont séléctionnables à partir de listes déroulantes.
        - Afficher les détails d'un élément en cliquant sur son nom (une page s'ouvre avec les détails du livre).
        - Trier les éléments (par nom, date, auteur, genres) en cliquant sur les entêtes de colonnes.
        - Effectuer une recherche par nom en utilisant la barre de recherche.

    Pour la page /books/:id, page des détails du livre, il est possible de:
        - Voir l'ensemble des informations du livre.
        - Supprimer le livre.

LES AUTHORS:
    Pour la page /authors, il est possible de:
        - Ajouter des nouveaux: une modale s'ouvre ou il est possible de renseigner les informations de l'auteur (nom, prénom, url de photo).
        - Afficher les détails d'un élément en cliquant sur son nom (une page s'ouvre avec les détails de l'auteur).
        - Trier les éléments (par nom, prénom, nombre de livres écrits) en cliquant sur les entêtes de colonnes.
        - Effectuer une recherche par nom en utilisant la barre de recherche.

    Pour la page /authors/:id, page des détails de l'auteur, il est possible de:
        - Voir l'ensemble des informations de l'auteur et la liste de ses livres.
        - Supprimer l'auteur.
        - Ajouter un livre à l'auteur: une modale s'ouvre ou il est possible de renseigner les informations du livre (nom, date, genres), en précisant que les genres sont séléctionnables à partir de listes déroulantes et que l'auteur est déjà pré-rempli.
        - Supprimer un livre de l'auteur.

        - Une tentative de modification de l'auteur a été effectuée mais n'a pas aboutie (le code est resté commenté dans les fichiers).

LES USERS: 
    Pour la page /users, il est possible de:
        - Ajouter des nouveaux: une modale s'ouvre ou il est possible de renseigner les informations de l'utilisateur (nom, prénom).
        - Afficher les détails d'un élément en cliquant sur son nom (une page s'ouvre avec les détails de l'utilisateur).
        - Trier les éléments (par nom, prénom) en cliquant sur les entêtes de colonnes.
        - Effectuer une recherche par nom en utilisant la barre de recherche.

    Pour la page /users/:id, page des détails de l'utilisateur, il est possible de:
        - Voir l'ensemble des informations de l'utilisateur.
        - Supprimer l'utilisateur.


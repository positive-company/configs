## Introduction

Tous les fichiers ajoutés proviennent du
[StarterKit Heroku](https://github.com/Linkvalue-Booster/configs).

Le but de ce StarterKit est d'aider les développeurs dans la création des
environnements Heroku pour leurs applications.

## En quoi ça consiste ?

Le StarterKit Heroku pour Symfony + MySQL copie un ensemble de fichiers, dont :
- un fichier phpcs.xml qui permet une configuration de base pour l'outil phpcs
- un fichier app.json qui assiste les développeurs dans la création de leur
  application Heroku
- un fichier Procfile qui définit la ligne de commande à lancer au démarrage de
  l'application
- un fichier .circleci/config.yml pour définir la logique derrière
  l'intégration continue et le déploiement continu

Tous ces fichiers ont été configurés pour avoir un certain comportement par
défaut. Certaines de ces configurations utilisent des variables bidons, c'est
notamment le cas pour la configuration CircleCI dont le but est de donner un
pipeline par défaut tel que décrit dans la documentation sur Notion.

Ainsi, il est recommandé de valider les différents fichiers et de les modifier
en fonction des besoins de l'application.

## Les actions à effectuer

Une fois que les fichiers ont été modifiés conformément aux besoins de
l'application, voici les étapes à effectuer :

1. Pour utiliser PHPCs avec la configuration du fichier phpcs.xml, il suffit de
   lancer la commande suivante : `composer require squizlabs/php_codesniffer`

2. Pour créer l'environnement de staging, il suffit de se rendre à l'adresse
   suivante : `https://heroku.com/deploy?template=[REPO_URL]` en remplaçant
   `[REPO_URL]` par l'URL du dépôt qui doit ressembler à
   `https://github.com/user/repo`.

3. Ajouter le projet dans CircleCI afin d'activer l'intégration continue et le
   déploiement continu sur le projet.

Une fois ces étapes effectuées, il est fortement recommandé de :
- **se référer à la documentation** mise à disposition sur Notion ;
- **modifier ce README pour qu'il reflète ce qui est fait dans le projet** et
  non ce qui est lié à sa création.

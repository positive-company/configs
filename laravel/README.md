## Introduction

Tous les fichiers ajoutés proviennent du
[StarterKit Heroku](https://github.com/Linkvalue-Booster/configs).

Le but de ce StarterKit est d'aider les développeurs dans la création des
environnements Heroku pour leurs applications.

## En quoi ça consiste ?

Le StarterKit Heroku pour Laravel + PostgreSQL copie un ensemble de fichiers, dont :
- un fichier phpcs.xml qui permet une configuration de base pour l'outil phpcs
- un fichier app.json qui assiste les développeurs dans la création de leur
  application Heroku
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

1. Installer le parser de config : `composer require itsdamien/laravel-heroku-config-parser`

2. Installer PPL : `composer require mathieutu/php-project-laucher`

3. Installer PHPCs : `composer require squizlabs/php_codesniffer`

4. Commiter et pousser,

5. Créer la staging : https://heroku.com/deploy?template=[URL_DU_REPO]

Une fois ces étapes effectuées, il est fortement recommandé de :
- **se référer à la documentation** mise à disposition sur Notion ;
- **modifier ce README pour qu'il reflète ce qui est fait dans le projet** et
  non ce qui est lié à sa création.

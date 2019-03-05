## Et maintenant ? 
- Installer PHPCs : `composer require squizlabs/php_codesniffer`
- Commiter et pousser,
- Créer la staging : https://heroku.com/deploy?template=[URL_DU_REPO]



## Déploiement 
This project uses automatic deploy through CircleCI deploys. Staging environment is auto-deployed on each commit made upon master branch. 
Production environment release is auto-built upon tags on master branch, the build will have to be deployed manually by going into the CircleCI workflow of the build and triggering the deploy job.

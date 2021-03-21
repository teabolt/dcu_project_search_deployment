# Deployment files for DCU Project Search

This is a repository containing declarative configurations for deploying DCU Project Search, a search UI for final year student projects at Dublin City University (see https://github.com/teabolt/dcu_project_search_frontend).

## Docker Compose

Docker Compose is a tool for orchestrating docker containers on a single host. We use it to set up the multi-service/multi-container DCU Project Search application.

Note that this does not set up the ElasticSearch cluster. To set up the cluster use a third party service or see https://github.com/teabolt/dcu_project_search_elasticsearch.

We make use of Docker Hub to host our service images:

* https://hub.docker.com/r/tomasbalt/dcu_project_search_frontend
* https://hub.docker.com/r/tomasbalt/dcu_project_search_backend

### Prerequisites

* Docker compose
* Docker

### Running the application

Configure environment files for the deployment (`.env`), frontend (`frontend.env`) and backend (`backend.env`). See the templates for examples.

Bring all services up:

```
sudo docker-compose up
```

Restart the services or include new HTTPS certificates:

```
sudo docker-compose down
sudo docker-compose up
```

## Misc

`update-env.sh` - transfer an environment variables file (.env) to an AWS host.

## Related Repositories

- Dataset of projects: https://github.com/teabolt/dcu_eng_comp_projects_dataset
- Frontend: https://github.com/teabolt/dcu_project_search_frontend
- Backend: https://github.com/teabolt/dcu_project_search_backend
- ElasticSearch database configuration scripts: https://github.com/teabolt/dcu_project_search_elasticsearch

## Credits

- Tomas Baltrunas (https://github.com/teabolt/)

## License

MIT

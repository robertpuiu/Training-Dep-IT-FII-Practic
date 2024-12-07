# Makefile by Valentin Stamate | stamatevalentin125@gmail.com
# Date: 17.11.2023

apps := fiipractic-app

# USED FOR PR
build:
	docker compose --env-file .env --profile=prod build

# USED FOR PRODUCTION
start-prod:
	docker compose --env-file .env --profile=prod pull
	docker compose --env-file .env --profile=prod up -d --force-recreate --remove-orphans

remove-unused-images:
	@for app in $(apps); do \
  		docker rmi $$(docker images | grep $$app | tr -s ' ' | cut -d ' ' -f 3) || true; \
  	done

# USED FOR DEV
start: down
	docker compose --env-file dev.env --profile=dev up --force-recreate --remove-orphans

down:
	docker compose --env-file dev.env --profile=dev down -v
	$(MAKE) remove-unused-images

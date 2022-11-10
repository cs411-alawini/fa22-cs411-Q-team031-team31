build-backend:
	cd backend && docker build . -t db_backend -f dockerfile

build-and-run: build-backend
	docker-compose up

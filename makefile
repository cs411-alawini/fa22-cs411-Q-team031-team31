build-backend:
	cd backend && docker build . -t db_backend -f dockerfile

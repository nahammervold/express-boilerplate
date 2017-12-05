run: build
	npm start
install: clean
	npm install
build: install
	npm run build
clean:
	rm -rf node_modules && rm -rf dist

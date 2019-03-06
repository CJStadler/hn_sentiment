SRC_FILES := $(shell find src/)
BUILD_JS := dist/bundle.js

$(BUILD_JS): $(SRC_FILES) node_modules
	npx webpack -d

node_modules: package.json package-lock.json
	npm install

.PHONY: clean optimize

optimized: $(SRC_FILES) node_modules
	npx webpack --mode "production"

clean:
	rm $(BUILD_JS)

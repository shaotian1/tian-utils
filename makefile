SRC = /Users/v_zhangshaotian/Desktop/study/tian-utils/src

new:
	@node bin/templateGenerate.js $(filter-out $@, $(MAKECMDGOALS))

delete:
	@node bin/delete.js $(filter-out $@, $(MAKECMDGOALS))

build:
	npm run gcSrc & npm run build

test:
	node $(SRC)/$(filter-out $@, $(MAKECMDGOALS))/index.js

app:
	@node express/app.js

commit:
	git commit -m '$(filter-out $@, $(MAKECMDGOALS))'



clone:
	ts-node /Users/v_zhangshaotian/Desktop/study/tian-utils/src/cloneDeep/index.ts

process:
	ts-node /Users/v_zhangshaotian/Desktop/study/tian-utils/src/process/index.ts

strings:
	ts-node /Users/v_zhangshaotian/Desktop/study/tian-utils/src/strings/index.ts
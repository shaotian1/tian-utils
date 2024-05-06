SRC = /Users/v_zhangshaotian/Desktop/study/tian-utils/src

define getUtilsPath
$(SRC)/$(1)/index.ts
endef

new:
	@node bin/codeGen/templateGenerate.js $(filter-out $@, $(MAKECMDGOALS)) & node bin/codeGen/exportGenerate.js $(filter-out $@, $(MAKECMDGOALS))

delete:
	@node bin/codeGen/delete.js $(filter-out $@, $(MAKECMDGOALS))

build:
	pnpm run build

test:
	pnpm run test

app:
	@node express/app.js

commit:
	git commit -m '$(filter-out $@, $(MAKECMDGOALS))'



clone:
	ts-node $(call getUtilsPath,clone)

process:
	ts-node $(call getUtilsPath,process)

strings:
	ts-node $(call getUtilsPath,strings)

enum:
	ts-node $(call getUtilsPath,enum)

decorator:
	ts-node $(call getUtilsPath,decorator)
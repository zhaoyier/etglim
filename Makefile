# 开发模式
dev:
	npm run dev

protobufServices = apidoc/proto/webapi.proto

genservices:
	@$(foreach var, $(protobufServices), protoc --plugin=protoc-gen-json-ts=./node_modules/protoc-gen-json-ts/bin/protoc-gen-json-ts --json-ts_out=:src/services -I ./apidoc/proto $(var);)
module.exports = {
  preset : "ts-jest",
  testEnvironment : "node",
  testPathIgnorePatterns : [ "/node_modules/", "/dist/", "/deps/", "<rootDir>/deps/misti/dist/" ],
  maxWorkers : 1,
  transformIgnorePatterns : [ "/node_modules/(?!(\@nowarp/misti)/)" ],
  transform : {"^.+\\.(ts|tsx)$" : "ts-jest"},
  moduleFileExtensions : [ "ts", "tsx", "js", "jsx", "json", "node" ]
};


ace.define("ace/snippets/php", ["require", "exports", "module"], function(e, t, n) {
  "use strict";
  if (!t.snippets) {
    t.snippets = [];
  }

  t.snippets.push({
    content: '/** @var \\Doctrine\\DBAL\\Connection \\$connection */\n\\$connection = \\$connector->getConnection("\${1:connection}");\n\\$result = \\$connection->fetchAll("\${2:sql}");\n',
    name: "sql-fetch-all",
    tabTrigger: "sql-fetch-all"
  });

  t.snippets.push({
    content: '/** @var \\GuzzleHttp\\Client \\$client */\n\\$client = \\$connector->getConnection("\${1:connection}");\n\\$response = \\$client->request("\${2:method}", "\${3:path}");\n',
    name: "http-request",
    tabTrigger: "http-request"
  });

  t.snippets.push({
    content: '/** @var \\MongoDB\\Database \\$connection */\n\\$connection = \\$connector->getConnection("\${1:connection}");\n\\$collection = \\$connection->selectCollection("\${2:collection}");\n\\$entries    = \\$collection->find([], [\n    \'limit\' => 16,\n]);\n',
    name: "mongodb-collection-find",
    tabTrigger: "mongodb-collection-find"
  });

  t.scope = "php"
});

(function() {
  ace.require(["ace/snippets/php"], function(m) {
    if (typeof module === "object" && typeof exports === "object" && module) {
      module.exports = m;
    }
  });

  ace.require(["ace/ext/language_tools"], function(langTools) {
    var globalAPI = {
      "$connector": ["getConnection"],
      "$context": ["getRouteId", "getBaseUrl", "getApp", "getUser", "getAction"],
      "$request": ["getMethod", "getHeader", "getHeaders", "getUriFragment", "getUriFragments", "getParameter", "getParameters", "getBody"],
      "$response": ["build"],
      "$processor": ["execute"],
      "$dispatcher": ["dispatch"],
      "$logger": ["emergency", "alert", "critical", "error", "warning", "notice", "info", "debug", "log"],
      "$cache": ["get", "set", "has", "delete", "clear", "getMultiple", "setMultiple", "deleteMultiple"],
      "$connection": ["fetchAll", "fetchAssoc", "fetchColumn", "fetchArray", "insert", "update", "delete", "executeUpdate"],
      "$client": ["request"],
      "$collection": ["find", "findOne", "findAndModify", "insert", "update", "remove", "count"]
    };

    var fusioCompleter = {
      getCompletions: function(editor, session, pos, prefix, callback) {
        var line = session.getLine(pos.row);
        line = line.substr(0, pos.column);
        line = line.trim();

        var result = [];
        var key;

        for (key in globalAPI) {
          if (line.substr((key.length + 2) * -1) === key + "->") {
            var functions = globalAPI[key];
            for (var i = 0; i < functions.length; i++) {
              result.push({
                name: functions[i],
                value: functions[i],
                score: 400,
                meta: "fusio"
              });
            }

            callback(null, result);
            return;
          }
        }

        for (key in globalAPI) {
          result.push({
            name: key,
            value: key,
            score: 300,
            meta: "fusio"
          });
        }

        callback(null, result);
      }
    };
    langTools.addCompleter(fusioCompleter);
  });
})();


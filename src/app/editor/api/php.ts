import {API, Method} from "../api";

export class PHP implements API {

  getRequestMethods(): Array<Method> {
    return [{
      label: "getPayload(): mixed",
      insertText: "getPayload()",
    }, {
      label: "getArguments(): RecordInterface",
      insertText: "getArguments()",
    }];
  }

  getRequestArgumentsMethods(): Array<Method> {
    return [{
      label: "containsKey(string $key): bool",
      insertText: "containsKey()",
    }, {
      label: "containsValue(mixed $value): bool",
      insertText: "containsValue()",
    }, {
      label: "get(string $key): mixed",
      insertText: "get()",
    }, {
      label: "getAll(): array",
      insertText: "getAll()",
    }, {
      label: "getOrDefault(string $key, mixed $default): mixed",
      insertText: "getOrDefault()",
    }, {
      label: "keySet(): array",
      insertText: "keySet()",
    }, {
      label: "values(): array",
      insertText: "values()",
    }];
  }

  getContextMethods(): Array<Method> {
    return [{
      label: "getOperationId(): int",
      insertText: "getOperationId()",
    }, {
      label: "getBaseUrl(): string",
      insertText: "getBaseUrl()",
    }, {
      label: "getTenantId(): string",
      insertText: "getTenantId()",
    }, {
      label: "getAction(): string",
      insertText: "getAction()",
    }, {
      label: "getApp(): ExecuteContextApp",
      insertText: "getApp()",
    }, {
      label: "getUser(): ExecuteContextUser",
      insertText: "getUser()",
    }];
  }

  getContextAppMethods(): Array<Method> {
    return [{
      label: "isAnonymous(): bool",
      insertText: "isAnonymous()",
    }, {
      label: "getId(): int",
      insertText: "getId()",
    }, {
      label: "getUserId(): int",
      insertText: "getUserId()",
    }, {
      label: "getStatus(): int",
      insertText: "getStatus()",
    }, {
      label: "getName(): string",
      insertText: "getName()",
    }, {
      label: "getUrl(): string",
      insertText: "getUrl()",
    }, {
      label: "getAppKey(): string",
      insertText: "getAppKey()",
    }, {
      label: "getScopes(): array",
      insertText: "getScopes()",
    }, {
      label: "getParameter(string $name): mixed",
      insertText: "getParameter()",
    }, {
      label: "getMetadata(string $key): mixed",
      insertText: "getMetadata()",
    }];
  }

  getContextUserMethods(): Array<Method> {
    return [{
      label: "isAnonymous(): bool",
      insertText: "isAnonymous()",
    }, {
      label: "getId(): int",
      insertText: "getId()",
    }, {
      label: "getRoleId(): int",
      insertText: "getRoleId()",
    }, {
      label: "getCategoryId(): int",
      insertText: "getCategoryId()",
    }, {
      label: "getStatus(): int",
      insertText: "getStatus()",
    }, {
      label: "getName(): string",
      insertText: "getName()",
    }, {
      label: "getEmail(): string",
      insertText: "getEmail()",
    }, {
      label: "getPoints(): int",
      insertText: "getPoints()",
    }, {
      label: "getExternalId(): string",
      insertText: "getExternalId()",
    }, {
      label: "getPlanId(): string",
      insertText: "getPlanId()",
    }, {
      label: "getMetadata(string $key): mixed",
      insertText: "getMetadata()",
    }];
  }

  getConnectorMethods(): Array<Method> {
    return [{
      label: "getConnection(string $name)",
      insertText: "getConnection('')",
    }];
  }

  getResponseMethods(): Array<Method> {
    return [{
      label: "build(int $statusCode, array $headers, mixed $body)",
      insertText: "build()",
    }];
  }

  getDispatcherMethods(): Array<Method> {
    return [{
      label: "dispatch(string $eventName, mixed $payload)",
      insertText: "dispatch()",
    }];
  }

  getLoggerMethods(): Array<Method> {
    return [{
      label: "emergency(string $message)",
      insertText: "emergency('')",
    }, {
      label: "alert(string $message)",
      insertText: "alert('')",
    }, {
      label: "critical(string $message)",
      insertText: "critical('')",
    }, {
      label: "error(string $message)",
      insertText: "error('')",
    }, {
      label: "warning(string $message)",
      insertText: "warning('')",
    }, {
      label: "notice(string $message)",
      insertText: "notice('')",
    }, {
      label: "info(string $message)",
      insertText: "info('')",
    }, {
      label: "debug(string $message)",
      insertText: "debug('')",
    }];
  }

  getConnectionMethods(): Array<Method> {
    return [{
      label: "fetchAllAssociative(string $query, array $params)",
      insertText: "fetchAllAssociative('')",
      link: 'https://www.doctrine-project.org/projects/doctrine-dbal/en/3.10/reference/data-retrieval-and-manipulation.html',
    }, {
      label: "fetchAssociative(string $query, array $params)",
      insertText: "fetchAssociative('')",
      link: 'https://www.doctrine-project.org/projects/doctrine-dbal/en/3.10/reference/data-retrieval-and-manipulation.html',
    }, {
      label: "fetchFirstColumn(string $query, array $params)",
      insertText: "fetchFirstColumn('')",
      link: 'https://www.doctrine-project.org/projects/doctrine-dbal/en/3.10/reference/data-retrieval-and-manipulation.html',
    }, {
      label: "fetchOne(string $query, array $params)",
      insertText: "fetchOne('')",
      link: 'https://www.doctrine-project.org/projects/doctrine-dbal/en/3.10/reference/data-retrieval-and-manipulation.html',
    }, {
      label: "insert(string $table, array $data)",
      insertText: "insert('')",
      link: 'https://www.doctrine-project.org/projects/doctrine-dbal/en/3.10/reference/data-retrieval-and-manipulation.html',
    }, {
      label: "update(string $table, array $data, array $criteria)",
      insertText: "update('')",
      link: 'https://www.doctrine-project.org/projects/doctrine-dbal/en/3.10/reference/data-retrieval-and-manipulation.html',
    }, {
      label: "delete(string $table, array $criteria)",
      insertText: "delete('')",
      link: 'https://www.doctrine-project.org/projects/doctrine-dbal/en/3.10/reference/data-retrieval-and-manipulation.html',
    }, {
      label: "executeStatement(string $query, array $params)",
      insertText: "executeStatement('')",
      link: 'https://www.doctrine-project.org/projects/doctrine-dbal/en/3.10/reference/data-retrieval-and-manipulation.html',
    }, {
      label: "beginTransaction()",
      insertText: "beginTransaction()",
      link: 'https://www.doctrine-project.org/projects/doctrine-dbal/en/3.10/reference/transactions.html',
    }, {
      label: "rollBack()",
      insertText: "rollBack()",
      link: 'https://www.doctrine-project.org/projects/doctrine-dbal/en/3.10/reference/transactions.html',
    }, {
      label: "commit()",
      insertText: "commit()",
      link: 'https://www.doctrine-project.org/projects/doctrine-dbal/en/3.10/reference/transactions.html',
    }];
  }

  getHttpClientMethods(): Array<Method> {
    return [{
      label: "request(string $method, string $uri, array $options)",
      insertText: "request('')",
      link: 'https://docs.guzzlephp.org/en/stable/request-options.html',
    }, {
      label: "get(string $uri, array $options)",
      insertText: "get('')",
      link: 'https://docs.guzzlephp.org/en/stable/request-options.html',
    }, {
      label: "delete(string $uri, array $options)",
      insertText: "delete('')",
      link: 'https://docs.guzzlephp.org/en/stable/request-options.html',
    }, {
      label: "head(string $uri, array $options)",
      insertText: "head('')",
      link: 'https://docs.guzzlephp.org/en/stable/request-options.html',
    }, {
      label: "patch(string $uri, array $options)",
      insertText: "patch('')",
      link: 'https://docs.guzzlephp.org/en/stable/request-options.html',
    }, {
      label: "post(string $uri, array $options)",
      insertText: "post('')",
      link: 'https://docs.guzzlephp.org/en/stable/request-options.html',
    }, {
      label: "put(string $uri, array $options)",
      insertText: "put('')",
      link: 'https://docs.guzzlephp.org/en/stable/request-options.html',
    }];
  }

  getFilesystemMethods(): Array<Method> {
    return [{
      label: "write(string $path, string $contents)",
      insertText: "write('')",
      link: 'https://flysystem.thephpleague.com/docs/usage/filesystem-api/',
    }, {
      label: "writeStream(string $path, resource $contents)",
      insertText: "writeStream('')",
      link: 'https://flysystem.thephpleague.com/docs/usage/filesystem-api/',
    }, {
      label: "read(string $path)",
      insertText: "read('')",
      link: 'https://flysystem.thephpleague.com/docs/usage/filesystem-api/',
    }, {
      label: "readStream(string $path)",
      insertText: "readStream('')",
      link: 'https://flysystem.thephpleague.com/docs/usage/filesystem-api/',
    }, {
      label: "delete(string $path)",
      insertText: "delete('')",
      link: 'https://flysystem.thephpleague.com/docs/usage/filesystem-api/',
    }, {
      label: "deleteDirectory(string $path)",
      insertText: "deleteDirectory('')",
      link: 'https://flysystem.thephpleague.com/docs/usage/filesystem-api/',
    }, {
      label: "listContents(string $path)",
      insertText: "listContents('')",
      link: 'https://flysystem.thephpleague.com/docs/usage/filesystem-api/',
    }, {
      label: "has(string $path)",
      insertText: "has('')",
      link: 'https://flysystem.thephpleague.com/docs/usage/filesystem-api/',
    }, {
      label: "lastModified(string $path)",
      insertText: "lastModified('')",
      link: 'https://flysystem.thephpleague.com/docs/usage/filesystem-api/',
    }, {
      label: "mimeType(string $path)",
      insertText: "mimeType('')",
      link: 'https://flysystem.thephpleague.com/docs/usage/filesystem-api/',
    }, {
      label: "fileSize(string $path)",
      insertText: "fileSize('')",
      link: 'https://flysystem.thephpleague.com/docs/usage/filesystem-api/',
    }];
  }

}

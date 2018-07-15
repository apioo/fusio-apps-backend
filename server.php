<?php
/*
 * Fusio
 * A web-application to create dynamically RESTful APIs
 *
 * Copyright (C) 2015-2016 Christoph Kappestein <k42b3.x@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// entry point for the internal php server for testing
if (isset($_SERVER['REQUEST_URI'])) {
    $fileUris = [
        '^\/developer\/',
        '^\/documentation\/',
        '^\/fusio\/',
    ];

    foreach ($fileUris as $regexp) {
        if (preg_match('/' . $regexp . '/', $_SERVER['REQUEST_URI'])) {
            return false;
        }
    }

    // strip if the requests starts with /index.php/
    if (substr($_SERVER['REQUEST_URI'], 0, 11) == '/index.php/') {
        $_SERVER['REQUEST_URI'] = substr($_SERVER['REQUEST_URI'], 10);
    }
}

$loader    = require(__DIR__ . '/../vendor/autoload.php');
$container = require_once(__DIR__ . '/../container.php');

if (isset($_SERVER['argv']) && in_array('--warmup', $_SERVER['argv'])) {
    // run migrations
    define('FUSIO_IN_TEST', true);

    /** @var \Symfony\Component\Console\Command\Command $command */
    $command = $container->get('console')->find('migration:migrate');

    $input  = new \Symfony\Component\Console\Input\ArrayInput([]);
    $input->setInteractive(false);
    $output = new \Symfony\Component\Console\Output\ConsoleOutput();

    $command->run($input, $output);

    // insert fixtures
    $loader->addClassMap([
        'Fusio\Impl\Tests\Fixture' => __DIR__ . '/../vendor/fusio/impl/tests/Fixture.php',
    ]);

    $connection = new PHPUnit_Extensions_Database_DB_DefaultDatabaseConnection($container->get('connection')->getWrappedConnection());
    PHPUnit_Extensions_Database_Operation_Factory::CLEAN_INSERT()->execute($connection, Fusio\Impl\Tests\Fixture::getDataSet());

    echo 'Warmup successful' . "\n";
} else {
    $engine      = new \PSX\Framework\Environment\WebServer\Engine();
    $environment = new \PSX\Framework\Environment\Environment($container, $engine);

    return $environment->serve();
}

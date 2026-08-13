<?php
// Sanitized representative example.

const DATA_FILE = __DIR__ . '/data.json';

function save_data(array $data): void
{
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

    if ($json === false) {
        throw new RuntimeException('Data could not be encoded.');
    }

    $temporary = DATA_FILE . '.tmp';

    if (file_put_contents($temporary, $json, LOCK_EX) === false) {
        throw new RuntimeException('Temporary file could not be written.');
    }

    if (!rename($temporary, DATA_FILE)) {
        throw new RuntimeException('Data file could not be replaced.');
    }
}

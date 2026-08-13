<?php
// Sanitized representative example.

function csrf_token(): string
{
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }

    return $_SESSION['csrf'];
}

function verify_csrf(string $submitted): void
{
    if (!hash_equals(csrf_token(), $submitted)) {
        throw new RuntimeException('Invalid CSRF token.');
    }
}

function login_user(array $user): void
{
    session_regenerate_id(true);

    $_SESSION['user'] = [
        'id'   => (int) $user['id'],
        'name' => (string) $user['name'],
        'role' => (string) $user['role'],
    ];
}

function require_admin(): void
{
    if (($_SESSION['user']['role'] ?? '') !== 'admin') {
        http_response_code(403);
        exit('Forbidden');
    }
}

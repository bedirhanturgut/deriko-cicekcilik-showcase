<?php
// Sanitized representative example.

function save_uploaded_image(array $file, string $uploadDir): string
{
    if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
        throw new RuntimeException('Upload failed.');
    }

    if ((int) $file['size'] > 10 * 1024 * 1024) {
        throw new RuntimeException('File is too large.');
    }

    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = $finfo->file((string) $file['tmp_name']);

    $allowed = [
        'image/jpeg' => 'jpg',
        'image/png'  => 'png',
        'image/webp' => 'webp',
    ];

    if (!isset($allowed[$mime])) {
        throw new RuntimeException('Unsupported image type.');
    }

    $name = 'product-' . bin2hex(random_bytes(8)) . '.' . $allowed[$mime];
    $destination = rtrim($uploadDir, '/') . '/' . $name;

    if (!move_uploaded_file((string) $file['tmp_name'], $destination)) {
        throw new RuntimeException('Image could not be saved.');
    }

    return $name;
}

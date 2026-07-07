<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

$recipientEmail = 'hello@lacertamatch.com';
$allowedServices = [
    'Raccoon Removal',
    'Squirrel Removal',
    'Bat Removal',
    'Bird Control',
    'Snake Removal',
    'Attic Wildlife Cleanup',
    'Not Sure'
];

function respond(bool $success, string $message, int $statusCode = 200): void
{
    http_response_code($statusCode);
    echo json_encode([
        'success' => $success,
        'message' => $message
    ]);
    exit;
}

function clean_text(string $value, int $maxLength): string
{
    $value = trim(str_replace(["\r", "\n", "\0"], '', $value));
    $value = strip_tags($value);
    if (strlen($value) > $maxLength) {
        $value = substr($value, 0, $maxLength);
    }
    return $value;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Unsupported request method.', 405);
}

$honeypot = trim((string)($_POST['company'] ?? ''));
if ($honeypot !== '') {
    respond(true, 'Thank you. Your request was received.');
}

$startedAt = (int)($_POST['formStartedAt'] ?? 0);
if ($startedAt > 0 && time() - $startedAt < 2) {
    respond(false, 'Please review your request and try again.', 400);
}

$fullName = clean_text((string)($_POST['fullName'] ?? ''), 120);
$email = filter_var(trim((string)($_POST['email'] ?? '')), FILTER_VALIDATE_EMAIL);
$phone = clean_text((string)($_POST['phone'] ?? ''), 40);
$service = clean_text((string)($_POST['service'] ?? ''), 80);
$message = clean_text((string)($_POST['message'] ?? ''), 3000);
$sourcePage = clean_text((string)($_POST['sourcePage'] ?? 'contact.html'), 120);
$privacyConsent = (string)($_POST['privacyConsent'] ?? '');

if ($fullName === '' || !$email || $phone === '' || $service === '' || $message === '') {
    respond(false, 'Please complete all required fields.', 422);
}

if (!in_array($service, $allowedServices, true)) {
    respond(false, 'Please choose a valid service category.', 422);
}

if (preg_replace('/\D+/', '', $phone) === '' || strlen(preg_replace('/\D+/', '', $phone)) < 7) {
    respond(false, 'Please enter a valid phone number.', 422);
}

if ($privacyConsent !== 'yes') {
    respond(false, 'Please confirm the privacy acknowledgement.', 422);
}

$subject = 'Lacerta provider request: ' . $service;
$body = implode("\n", [
    'New Lacerta provider-matching request',
    '',
    'Full name: ' . $fullName,
    'Email: ' . $email,
    'Phone: ' . $phone,
    'Service category: ' . $service,
    'Source page: ' . $sourcePage,
    '',
    'Message:',
    $message,
    '',
    'Compliance note: Submitting this form does not create a service agreement. Final pricing, availability, methods, warranties, and service terms are provided by participating providers.'
]);

$headers = [
    'From: Lacerta Requests <no-reply@lacertamatch.com>',
    'Reply-To: ' . $fullName . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion()
];

$sent = @mail($recipientEmail, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    respond(false, 'We could not send the request right now. Please call or email Lacerta, or try again later.', 500);
}

respond(true, 'Your request was sent. Please review any provider details before continuing.');

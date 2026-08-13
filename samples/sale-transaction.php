<?php
// Simplified representative transaction flow.
// Production implementation contains additional validation and bookkeeping.

function record_sale(array &$data, array $items, string $paymentMethod): array
{
    $saleId = next_id($data['sales']);
    $total = 0.0;

    foreach ($items as $item) {
        $productIndex = find_product_index($data['products'], (int) $item['product_id']);

        if ($productIndex === null) {
            throw new RuntimeException('Product not found.');
        }

        $quantity = max(0, (float) $item['quantity']);
        $before = (float) $data['products'][$productIndex]['stock'];

        if ($quantity > $before) {
            throw new RuntimeException('Insufficient stock.');
        }

        $after = $before - $quantity;
        $data['products'][$productIndex]['stock'] = $after;

        $data['movements'][] = [
            'product_id' => (int) $item['product_id'],
            'type' => 'out',
            'quantity' => $quantity,
            'before_stock' => $before,
            'after_stock' => $after,
            'reference_type' => 'sale',
            'reference_id' => $saleId,
        ];

        $total += $quantity * (float) $item['unit_price'];
    }

    $sale = [
        'id' => $saleId,
        'payment_method' => $paymentMethod,
        'total' => $total,
    ];

    $data['sales'][] = $sale;

    if ($paymentMethod !== 'credit') {
        $data['accounting'][] = [
            'type' => 'income',
            'amount' => $total,
            'reference_type' => 'sale',
            'reference_id' => $saleId,
        ];
    }

    return $sale;
}

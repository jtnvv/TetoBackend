export const role = {
    admin: [
        'test',
        'user',
        'user_information',
        'update_user_information',
        'fetch_user_orders',
        'add_favorites',
        'is_favorites',
        'create_payment',
        'store_item',
        'brand_information',
        'update_brand_information',
        'delete_item',
        'fetch_brand_orders',
    ],
    user: [
        'user',
        'user_information',
        'update_user_information',
        'fetch_user_orders',
        'add_favorites',
        'is_favorites',
        'create_payment',
        'update_rating_order',
        'delete_user_order',
        'send_email_cancel_order'
    ],
    brand: [
        'store_item',
        'brand_information',
        'update_brand_information',
        'delete_item',
        'fetch_brand_orders',
    ]
};
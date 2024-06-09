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
        'update_rating_order',
        'update_order_status',
        'update_item',
        'is_owner'
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
        'update_refund-order',
        'send_email_cancel_order',
        'send_email_refund_order',
        'check_is_active'
    ],
    brand: [
        'store_item',
        'brand_information',
        'update_brand_information',
        'delete_item',
        'fetch_brand_orders',
        'update_order_status',
        'update_item',
        'is_owner',
        'check_is_active'
    ],
    inactive: [
        'confirm_mail',
        'check_is_active'
    ],
};
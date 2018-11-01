<?php
function enqueue_scripts() {
    wp_enqueue_script(
        'main.bundle',
        get_stylesheet_directory_uri() . '/assets/dist/main.bundle.js',
        array('jquery'),
        false,
        true
    );

    wp_enqueue_style(
        'main.bundle',
        get_stylesheet_directory_uri() . '/assets/dist/main.bundle.css'
    );
}

add_action( 'wp_enqueue_scripts', 'enqueue_scripts' );


<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */
// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress-db');

/** MySQL database username */
define('DB_USER', 'wordpress-user');

/** MySQL database password */
define('DB_PASSWORD', '5418None');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'C70-Nx%~K8z].lESE<upRp%nYny$/*ix&[l[4k@L(BGf~fcz+cZVd(zd8dtqKZW-');
define('SECURE_AUTH_KEY',  ';,sm$A@l{lO drm,-b$p#-!N@R?.R,]ut@XzW?<9;mj;$b$S+:-;I7db6FR$n%]e');
define('LOGGED_IN_KEY',    '(Qfd?=k/qeCk;FMa[zkDzDbM!O61}Kz+!^BsF#2nbzkR2x*?Mh=#,< zFC-DvU[_');
define('NONCE_KEY',        '1{1g+KhnYgQP|R|@~iLyEu!RXj=Hfl$5(n56,yH0-HFeGz3c~qAKv@k|Tmx4p~Tp');
define('AUTH_SALT',        'D)POrhL|=);b^xg`Xz(b2trkHeOZf,HN>7=8fsty#C6KoB#drB,O]l+90X.9%%uQ');
define('SECURE_AUTH_SALT', 'GR/?R)[@IVT*^+x(ZcLU,Ci;u-03+D=jE}+w(|pmM>4T(.Tm&)Wam:`FH*uY]%@>');
define('LOGGED_IN_SALT',   'c`f([TX0p[Zl>2)S*}>#c[{h_2FD9YQ+Dzu}U-c3 ^HfpuXj!PHyVe_rqeZR~:K+');
define('NONCE_SALT',       'REcUrDpc-[D+T|.|cZp_>c9gvcj#{Lt9{P67_OL|N#QDRy4!_1bCl>|5|>DZ+g/Q');
/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

$home='http://'.$_SERVER['HTTP_HOST'].'/blog/';

$siteurl='http://'.$_SERVER['HTTP_HOST'].'/blog';

define('WP_HOME',$home);

define('WP_SITEURL',$siteurl);

define("FS_METHOD", "direct");
define("FS_CHMOD_DIR", 0777);
define("FS_CHMOD_FILE", 0777);

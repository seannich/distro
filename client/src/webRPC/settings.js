export const PROJECT_CONFIG_SUFFIX = 'get_project_config.php';
export const SERVER_STATUS_SUFFIX = 'server_status.php';
export const CREATE_ACCOUNT_SUFFIX = 'create_account.php';
export const LOOKUP_ACCOUNT_SUFFIX = 'lookup_account.php';
export const GET_ACCOUNT_INFO_SUFFIX = 'am_get_info.php';
export const SET_ACCOUNT_INFO_SUFFIX = 'am_set_info.php';
export const SET_HOST_INFO_SUFFIX = 'am_set_host_info.php';
export const SHOW_USER_SUFFIX = 'show_user.php';
export const GET_RESULT_STATUS_SUFFIX = 'result_status.php';
export const TEAM_LOOKUP_SUFFIX = 'team_lookup.php';
export const TEAM_MEMBER_LIST_SUFFIX = 'team_email_list.php';
export const UPDATE_FORUM_PREF_SUFFIX = 'edit_forum_preferences_action.php';
export const USER_LAST_FORUM_POST_SUFFIX = 'forum_get_data.php';
export const APP_VERSIONS_SUFFIX = 'apps.php';

// Scheduler Host Info settings
export const PLATFORM_NAME = 'browser';
export const CLIENT_MAJOR_VERSION = 1;
export const CLIENT_MINOR_VERSION = 0;

// Faked computer information
// CPU Information
// Number of CPUs
export const HOST_NCPUS = 1;
// CPU vendor, usually either "GeniuineIntel" or "AuthenticAMD"
export const HOST_CPU_VENDOR = 'GenuineIntel';
// CPU model
export const HOST_CPU_MODEL = 'Intel(R) Core(TM) i5-7267U CPU @ 3.10GHz';
// Floating point operations per second (FPOPS)
export const HOST_FPOPS = 0;
// Input/output operations per second (IOPS)
export const HOST_IOPS = 0;
// Memory bandwidth
export const HOST_MEMBW = 0;
// ???
export const HOST_CALCULATED = 0;

// Memory information
// Amount of RAM in bytes. Keep it above 1GiB in case any project has minimum
// RAM requirements
export const HOST_RAM_BYTES = 4 * (2 ** 30);
// CPU cache
export const HOST_CPU_CACHE = 2 * (2 ** 20);
// Available swap space
export const HOST_SWAP_SPACE = 100 * (2 ** 20);
// Total disk space
export const HOST_TOTAL_DISK_SPACE = 1 * (1 ** 30);
// Available disk space
export const HOST_AVAIL_DISK_SPACE = 1 * (1 ** 30);

// Network bandwidth information
// Upload bandwidth
export const HOST_NETWORK_BW_UP = 0;
// Download bandwidth
export const HOST_NETWORK_BW_DOWN = 0;

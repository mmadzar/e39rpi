// monitor_def.js
// ========
//var tools = require('./tools');

var monitorDevices = []; // name, int, hex, description
var monitorCommands = []; // name, int[], hex[], description
var monitorCommandsStart = [];

monitorDevices = [
      { intId: 0, name: 'broadcast_gm', hexId: '00', description: 'Broadcast, GM'},
      { intId: 0, name: 'unknown0', hexId: '08', description: 'unknown0'},
      { intId: 0, name: 'cdc_cd_player', hexId: '18', description: 'CDC CD-Player'},
      { intId: 0, name: 'hkm', hexId: '24', description: 'HKM'},
      { intId: 0, name: 'fum', hexId: '28', description: 'FUM'},
      { intId: 0, name: 'ccm_check_control_module', hexId: '30', description: 'CCM Check Control Module'},
      { intId: 0, name: 'nav_navigation_videomodule', hexId: '3B', description: 'NAV Navigation/Videomodule'},
      { intId: 0, name: 'dis_diagnostics_pc_general_module', hexId: '3F', description: 'DIS Diagnostics PC / General Module'},
      { intId: 0, name: 'fbzv_remote_lock', hexId: '40', description: 'FBZV Remote Lock'},
      { intId: 0, name: 'menuscreen', hexId: '43', description: 'MenuScreen'},
      { intId: 0, name: 'car_immobilser_module', hexId: '44', description: 'Car Immobilser Module'},
      { intId: 0, name: 'cid', hexId: '46', description: 'CID'},
      { intId: 0, name: 'fmbt', hexId: '47', description: 'FMBT'},
      { intId: 0, name: 'mfl_multi_functional_steering_wheel_buttons', hexId: '50', description: 'MFL Multi Functional Steering Wheel Buttons'},
      { intId: 0, name: 'passenger_mirror', hexId: '51', description: 'Passenger Mirror'},
      { intId: 0, name: 'ihk_heating_ac_', hexId: '5B', description: 'IHK Heating/AC ?'},
      { intId: 0, name: 'pdc_park_distance_control', hexId: '60', description: 'PDC Park Distance Control'},
      { intId: 0, name: 'cdcd', hexId: '66', description: 'CDCD'},
      { intId: 0, name: 'rad_radio', hexId: '68', description: 'RAD Radio'},
      { intId: 0, name: 'dsp_digital_sound_processor', hexId: '6A', description: 'DSP Digital Sound Processor'},
      { intId: 0, name: 'rdc_tire_pressure_control', hexId: '70', description: 'RDC  Tire Pressure Control'},
      { intId: 0, name: 'sm_seat_module', hexId: '72', description: 'SM Seat Module'},
      { intId: 0, name: 'sdrs', hexId: '73', description: 'SDRS'},
      { intId: 0, name: 'cdcd', hexId: '76', description: 'CDCD'},
      { intId: 0, name: 'nave', hexId: '7F', description: 'NAVE'},
      { intId: 0, name: 'ike_instrument_control_electronics', hexId: '80', description: 'IKE Instrument Control Electronics'},
      { intId: 0, name: 'drivers_mirror', hexId: '9B', description: 'Driver\'s Mirror'},
      { intId: 0, name: 'cvm_convertible_top_module', hexId: '9C', description: 'CVM Convertible Top Module'},
      { intId: 0, name: 'fmid', hexId: 'A0', description: 'FMID'},
      { intId: 0, name: 'acm', hexId: 'A4', description: 'ACM'},
      { intId: 0, name: 'fhk_rear_heater_ac', hexId: 'A7', description: 'FHK Rear Heater/AC'},
      { intId: 0, name: 'navc', hexId: 'A8', description: 'NAVC'},
      { intId: 0, name: 'ehc_electronic_height_control', hexId: 'AC', description: 'EHC Electronic Height Control'},
      { intId: 0, name: 'ses_voice_recognition_system', hexId: 'B0', description: 'SES Voice Recognition System'},
      { intId: 0, name: 'tv_module_navj', hexId: 'BB', description: 'TV Module, NAVJ'},
      { intId: 0, name: 'lcm_light_control_module', hexId: 'BF', description: 'LCM Light Control Module'},
      { intId: 0, name: 'mid_multi_information_display_buttons', hexId: 'C0', description: 'MID Multi-Information Display Buttons'},
      { intId: 0, name: 'tel_telephone', hexId: 'C8', description: 'TEL Telephone'},
      { intId: 0, name: 'navigation_location', hexId: 'D0', description: 'Navigation Location'},
      { intId: 0, name: 'free', hexId: 'D7', description: 'free?'},
      { intId: 0, name: 'free', hexId: 'D8', description: 'free?'},
      { intId: 0, name: 'iris', hexId: 'E0', description: 'IRIS'},
      { intId: 0, name: 'obc_textbar_anzv', hexId: 'E7', description: 'OBC TextBar, ANZV'},
      { intId: 0, name: 'isp', hexId: 'E8', description: 'ISP'},
      { intId: 0, name: 'lights_wipers_seat_memory', hexId: 'ED', description: 'Lights, Wipers, Seat Memory'},
      { intId: 0, name: 'bmb_board_monitor_buttons', hexId: 'F0', description: 'BMB Board Monitor Buttons'},
      { intId: 0, name: 'csu', hexId: 'F5', description: 'CSU'},
      { intId: 0, name: 'broadcast', hexId: 'FF', description: 'Broadcast'}
];

console.log("Monitoring devices (" + monitorDevices.length + ") ...")
for (var i = 0; i < monitorDevices.length; i++) {
      monitorDevices[i].intId=parseInt(monitorDevices[i].hexId, 16);
      //console.log(JSON.stringify(monitorDevices[i]));
};
monitorCommands = [
      { name: 'check_r_button_press', hexId: '80 04 ff 57 01'.split(' '), intId: [], description: 'Check Right Button Press'},
      { name: 'check_r_button_release', hexId: '80 04 ff 57 41'.split(' '), intId: [], description: 'Check Right Button Release'},
      { name: 'reverse_play_press', hexId: 'C0 04 68 48 14'.split(' '), intId: [], description: 'Reverse Play Press' },
      { name: 'reverse_play_release', hexId: 'C0 04 68 48 94'.split(' '), intId: [], description: 'Reverse Play Release' },
      { name: 'reverse_play_longer_than_1_second', hexId: 'C0 04 68 48 54'.split(' '), intId: [], description: 'Reverse Play Longer than 1 second' },
      { name: 'eject_press', hexId: 'C0 04 68 48 24'.split(' '), intId: [], description: 'Eject Press' },
      { name: 'eject_release', hexId: 'C0 04 68 48 A4'.split(' '), intId: [], description: 'Eject Release' },
      { name: 'eject_longer_than_1_second', hexId: 'C0 04 68 48 64'.split(' '), intId: [], description: 'Eject Longer than 1 second' },
      { name: 'telephone_press', hexId: 'C0 04 FF 48 08'.split(' '), intId: [], description: 'Telephone Press' },
      { name: 'telephone_release', hexId: 'C0 04 FF 48 88'.split(' '), intId: [], description: 'Telephone Release' },
      { name: 'telephone_longer_than_1_second', hexId: 'C0 04 FF 48 48'.split(' '), intId: [], description: 'Telephone Longer than 1 second' },
      { name: 'clock_press', hexId: 'C0 04 FF 48 07'.split(' '), intId: [], description: 'Clock Press' },
      { name: 'menu_press', hexId: 'C0 04 FF 48 34'.split(' '), intId: [], description: 'Menu Press' },
      { name: 'menu_release', hexId: 'C0 04 FF 48 B4'.split(' '), intId: [], description: 'Menu Release' },
      { name: 'menu_longer_than_1_second', hexId: 'C0 04 FF 48 74'.split(' '), intId: [], description: 'Menu Longer than 1 second' },
      { name: 'menu_turnknob_press', hexId: 'C0 04 3B 48 05'.split(' '), intId: [], description: 'Menu turnknob Press' },
      { name: 'menu_turnknob_release', hexId: 'C0 04 3B 48 85'.split(' '), intId: [], description: 'Menu turnknob Release' },
      { name: 'menu_turnknob_longer_than_1_second', hexId: 'C0 04 3B 48 45'.split(' '), intId: [], description: 'Menu turnknob Longer than 1 second' },
      { name: 'menu_turnknob_counterclockwise', hexId: 'C0 04 3B 49 01'.split(' '), intId: [], description: 'Menu turnknob Counterclockwise' },
      { name: 'menu_turnknob_clockwise', hexId: 'C0 04 3B 49 81'.split(' '), intId: [], description: 'Menu turnknob Clockwise' },
      { name: 'radio_power_press', hexId: 'C0 04 68 48 06'.split(' '), intId: [], description: 'Radio Power Press' },
      { name: 'radio_power_release', hexId: 'C0 04 68 48 86'.split(' '), intId: [], description: 'Radio Power Release' },
      { name: 'radio_power_longer_than_1_second', hexId: 'C0 04 68 48 46'.split(' '), intId: [], description: 'Radio Power Longer than 1 second' },
      { name: 'rad_bm_switch_press', hexId: 'C0 04 68 48 30'.split(' '), intId: [], description: 'Rad/BM switch Press' },
      { name: 'rad_bm_switch_release', hexId: 'C0 04 68 48 B0'.split(' '), intId: [], description: 'Rad/BM switch Release' },
      { name: 'rad_bm_switch_longer_than_1_second', hexId: 'C0 04 68 48 70'.split(' '), intId: [], description: 'Rad/BM switch Longer than 1 second' },
      { name: 'tone_longer_than_1_second', hexId: 'C0 04 68 48 44'.split(' '), intId: [], description: 'Tone Longer than 1 second' },
      { name: 'select_press', hexId: 'C0 04 68 48 20'.split(' '), intId: [], description: 'Select Press' },
      { name: 'select_release', hexId: 'C0 04 68 48 A0'.split(' '), intId: [], description: 'Select Release' },
      { name: 'select_longer_than_1_second', hexId: 'C0 04 68 48 60'.split(' '), intId: [], description: 'Select Longer than 1 second' },
      { name: 'arrow_left_press', hexId: 'C0 04 68 48 10'.split(' '), intId: [], description: 'Arrow Left Press' },
      { name: 'arrow_left_release', hexId: 'C0 04 68 48 90'.split(' '), intId: [], description: 'Arrow Left Release' },
      { name: 'arrow_left_longer_than_1_second', hexId: 'C0 04 68 48 50'.split(' '), intId: [], description: 'Arrow Left Longer than 1 second' },
      { name: 'arrow_right_press', hexId: 'C0 04 68 48 00'.split(' '), intId: [], description: 'Arrow Right Press' },
      { name: 'arrow_right_release', hexId: 'C0 04 68 48 80'.split(' '), intId: [], description: 'Arrow Right Release' },
      { name: 'arrow_right_longer_than_1_second', hexId: 'C0 04 68 48 40'.split(' '), intId: [], description: 'Arrow Right Longer than 1 second' },
      { name: 'dolby_(small_screen)_press', hexId: 'C0 04 68 48 33'.split(' '), intId: [], description: 'Dolby (small screen) Press' },
      { name: 'dolby_(small_screen)_release', hexId: 'C0 04 68 48 B3'.split(' '), intId: [], description: 'Dolby (small screen) Release' },
      { name: 'dolby_(small_screen)_longer_than_1_second', hexId: 'C0 04 68 48 73'.split(' '), intId: [], description: 'Dolby (small screen) Longer than 1 second' },
      { name: 'mode_press', hexId: 'C0 04 68 48 23'.split(' '), intId: [], description: 'Mode Press' },
      { name: 'mode_release', hexId: 'C0 04 68 48 A3'.split(' '), intId: [], description: 'Mode Release' },
      { name: 'mode_longer_than_1_second', hexId: 'C0 04 68 48 63'.split(' '), intId: [], description: 'Mode Longer than 1 second' },
      { name: 'am_press', hexId: 'C0 04 68 48 21'.split(' '), intId: [], description: 'AM Press' },
      { name: 'am_release', hexId: 'C0 04 68 48 A1'.split(' '), intId: [], description: 'AM Release' },
      { name: 'am_longer_than_1_second', hexId: 'C0 04 68 48 61'.split(' '), intId: [], description: 'AM Longer than 1 second' },
      { name: 'fm_press', hexId: 'C0 04 68 48 31'.split(' '), intId: [], description: 'FM Press' },
      { name: 'fm_release', hexId: 'C0 04 68 48 B1'.split(' '), intId: [], description: 'FM Release' },
      { name: 'fm_longer_than_1_second', hexId: 'C0 04 68 48 71'.split(' '), intId: [], description: 'FM Longer than 1 second' },
      { name: 'rds_(small_screen)_press', hexId: 'C0 04 68 48 22'.split(' '), intId: [], description: 'RDS (small screen) Press' },
      { name: 'rds_(small_screen)_release', hexId: 'C0 04 68 48 A2'.split(' '), intId: [], description: 'RDS (small screen) Release' },
      { name: 'rds_(small_screen)_longer_than_1_second', hexId: 'C0 04 68 48 62'.split(' '), intId: [], description: 'RDS (small screen) Longer than 1 second' },
      { name: 'menu_1_press', hexId: 'C0 04 68 48 11'.split(' '), intId: [], description: 'Menu 1 Press' },
      { name: 'menu_1_release', hexId: 'C0 04 68 48 91'.split(' '), intId: [], description: 'Menu 1 Release' },
      { name: 'menu_1_longer_than_1_second', hexId: 'C0 04 68 48 51'.split(' '), intId: [], description: 'Menu 1 Longer than 1 second' },
      { name: 'menu_2_press', hexId: 'C0 04 68 48 01'.split(' '), intId: [], description: 'Menu 2 Press' },
      { name: 'menu_2_release', hexId: 'C0 04 68 48 81'.split(' '), intId: [], description: 'Menu 2 Release' },
      { name: 'menu_2_longer_than_1_second', hexId: 'C0 04 68 48 41'.split(' '), intId: [], description: 'Menu 2 Longer than 1 second' },
      { name: 'menu_3_press', hexId: 'C0 04 68 48 12'.split(' '), intId: [], description: 'Menu 3 Press' },
      { name: 'menu_3_release', hexId: 'C0 04 68 48 92'.split(' '), intId: [], description: 'Menu 3 Release' },
      { name: 'menu_3_longer_than_1_second', hexId: 'C0 04 68 48 52'.split(' '), intId: [], description: 'Menu 3 Longer than 1 second' },
      { name: 'menu_4_press', hexId: 'C0 04 68 48 02'.split(' '), intId: [], description: 'Menu 4 Press' },
      { name: 'menu_4_release', hexId: 'C0 04 68 48 82'.split(' '), intId: [], description: 'Menu 4 Release' },
      { name: 'menu_4_longer_than_1_second', hexId: 'C0 04 68 48 42'.split(' '), intId: [], description: 'Menu 4 Longer than 1 second' },
      { name: 'menu_5_press', hexId: 'C0 04 68 48 13'.split(' '), intId: [], description: 'Menu 5 Press' },
      { name: 'menu_5_release', hexId: 'C0 04 68 48 93'.split(' '), intId: [], description: 'Menu 5 Release' },
      { name: 'menu_5_longer_than_1_second', hexId: 'C0 04 68 48 53'.split(' '), intId: [], description: 'Menu 5 Longer than 1 second' },
      { name: 'menu_6_press', hexId: 'C0 04 68 48 03'.split(' '), intId: [], description: 'Menu 6 Press' },
      { name: 'menu_6_release', hexId: 'C0 04 68 48 83'.split(' '), intId: [], description: 'Menu 6 Release' },
      { name: 'menu_6_longer_than_1_second', hexId: 'C0 04 68 48 43'.split(' '), intId: [], description: 'Menu 6 Longer than 1 second' },
      { name: 'previous_press', hexId: '50 04 68 3B 08'.split(' '), intId: [], description: 'Previous Press' },
      { name: 'previous_longer_than_1_second', hexId: '50 04 68 3B 18'.split(' '), intId: [], description: 'Previous Longer than 1 second' },
      { name: 'previous_release', hexId: '50 04 68 3B 28'.split(' '), intId: [], description: 'Previous Release' },
      { name: 'next_press', hexId: '50 04 68 3B 01'.split(' '), intId: [], description: 'Next Press' },
      { name: 'next_longer_than_1_second', hexId: '50 04 68 3B 11'.split(' '), intId: [], description: 'Next Longer than 1 second' },
      { name: 'next_release', hexId: '50 04 68 3B 21'.split(' '), intId: [], description: 'Next Release' },
      { name: 'volume_up_press', hexId: '50 04 68 32 11'.split(' '), intId: [], description: 'Volume Up Press' },
      { name: 'volume_up_release', hexId: '50 04 68 32 31'.split(' '), intId: [], description: 'Volume Up Release' },
      { name: 'volume_up_hold', hexId: '50 04 68 32 21'.split(' '), intId: [], description: 'Volume Up Hold' },
      { name: 'volume_down_press', hexId: '50 04 68 32 10'.split(' '), intId: [], description: 'Volume Down Press' },
      { name: 'r_t_press', hexId: '50 03 C8 01'.split(' '), intId: [], description: 'R/T Press' },
      { name: 'volume_down_release', hexId: '50 04 68 32 30'.split(' '), intId: [], description: 'Volume Down Release' },
      { name: 'volume_down_hold', hexId: '50 04 68 32 20'.split(' '), intId: [], description: 'Volume Down Hold' },
      { name: 'dial_press', hexId: '50 04 C8 3B 80'.split(' '), intId: [], description: 'Dial Press' },
      { name: 'dial_longer_than_1_second', hexId: '50 04 C8 3B 90'.split(' '), intId: [], description: 'Dial Longer than 1 second' },
      { name: 'dial_release', hexId: '50 04 C8 3B A0'.split(' '), intId: [], description: 'Dial Release' },
      { name: 'lightswitch_on', hexId: 'D0 05 BF 5C ED 00'.split(' '), intId: [], description: 'Lightswitch On' },
      { name: 'lightswitch_off', hexId: 'D0 05 BF 5C FF 00'.split(' '), intId: [], description: 'Lightswitch Off' },
      { name: 'key_ignition_in', hexId: '44 05 BF 74 04 00'.split(' '), intId: [], description: 'Key Ignition In' },
      { name: 'key_ignition_out', hexId: '44 05 BF 74 00 FF'.split(' '), intId: [], description: 'Key Ignition Out' },
      { name: 'reverse_gear_on', hexId: '80 0A BF 13 02 10 00 00 00 00 38'.split(' '), intId: [], description: 'Reverse Gear On' },
      { name: 'reverse_gear_off', hexId: '80 0A BF 13 02 00 00 00 00 00 38'.split(' '), intId: [], description: 'Reverse Gear Off' },
      { name: 'radio_cd_poll', hexId: '68 03 18 01'.split(' '), intId: [], description: 'Radio CD poll' },
      { name: 'radio_turnknob_clockwise', hexId: 'C0 04 68 32 11'.split(' '), intId: [], description: 'Radio Turnknob Clockwise' },
      { name: 'radio_turnknob_counterclockwise', hexId: 'C0 04 68 32 10'.split(' '), intId: [], description: 'Radio Turnknob Counterclockwise' },
      { name: 'radio_1_press', hexId: 'C0 06 68 31 40 00 00'.split(' '), intId: [], description: 'Radio 1 Press' },
      { name: 'radio_1_hold', hexId: 'C0 06 68 31 40 00 20'.split(' '), intId: [], description: 'Radio 1 Hold' },
      { name: 'radio_1_release', hexId: 'C0 06 68 31 40 00 40'.split(' '), intId: [], description: 'Radio 1 Release' },
      { name: 'radio_2_press', hexId: 'C0 06 68 31 40 00 01'.split(' '), intId: [], description: 'Radio 2 Press' },
      { name: 'radio_2_hold', hexId: 'C0 06 68 31 40 00 21'.split(' '), intId: [], description: 'Radio 2 Hold' },
      { name: 'radio_2_release', hexId: 'C0 06 68 31 40 00 41'.split(' '), intId: [], description: 'Radio 2 Release' },
      { name: 'radio_3_press', hexId: 'C0 06 68 31 40 00 02'.split(' '), intId: [], description: 'Radio 3 Press' },
      { name: 'radio_3_hold', hexId: 'C0 06 68 31 40 00 22'.split(' '), intId: [], description: 'Radio 3 Hold' },
      { name: 'radio_3_release', hexId: 'C0 06 68 31 40 00 42'.split(' '), intId: [], description: 'Radio 3 Release' },
      { name: 'radio_4_press', hexId: 'C0 06 68 31 40 00 03'.split(' '), intId: [], description: 'Radio 4 Press' },
      { name: 'radio_4_hold', hexId: 'C0 06 68 31 40 00 23'.split(' '), intId: [], description: 'Radio 4 Hold' },
      { name: 'radio_4_release', hexId: 'C0 06 68 31 40 00 43'.split(' '), intId: [], description: 'Radio 4 Release' },
      { name: 'radio_5_press', hexId: 'C0 06 68 31 40 00 04'.split(' '), intId: [], description: 'Radio 5 Press' },
      { name: 'radio_5_hold', hexId: 'C0 06 68 31 40 00 24'.split(' '), intId: [], description: 'Radio 5 Hold' },
      { name: 'radio_5_release', hexId: 'C0 06 68 31 40 00 44'.split(' '), intId: [], description: 'Radio 5 Release' },
      { name: 'radio_6_press', hexId: 'C0 06 68 31 40 00 05'.split(' '), intId: [], description: 'Radio 6 Press' },
      { name: 'radio_6_hold', hexId: 'C0 06 68 31 40 00 25'.split(' '), intId: [], description: 'Radio 6 Hold' },
      { name: 'radio_6_release', hexId: 'C0 06 68 31 40 00 45'.split(' '), intId: [], description: 'Radio 6 Release' },
      { name: 'radio_fm_press', hexId: 'C0 06 68 31 40 00 06'.split(' '), intId: [], description: 'Radio FM Press' },
      { name: 'radio_fm_hold', hexId: 'C0 06 68 31 40 00 26'.split(' '), intId: [], description: 'Radio FM Hold' },
      { name: 'radio_fm_release', hexId: 'C0 06 68 31 40 00 46'.split(' '), intId: [], description: 'Radio FM Release' },
      { name: 'radio_am_press', hexId: 'C0 06 68 31 40 00 07'.split(' '), intId: [], description: 'Radio AM press' },
      { name: 'radio_am_hold', hexId: 'C0 06 68 31 40 00 27'.split(' '), intId: [], description: 'Radio AM Hold' },
      { name: 'radio_am_release', hexId: 'C0 06 68 31 40 00 47'.split(' '), intId: [], description: 'Radio AM release' },
      { name: 'radio_rds_press', hexId: 'C0 06 68 31 40 00 08'.split(' '), intId: [], description: 'Radio RDS Press' },
      { name: 'radio_rds_hold', hexId: 'C0 06 68 31 40 00 28'.split(' '), intId: [], description: 'Radio RDS Hold' },
      { name: 'radio_rds_release', hexId: 'C0 06 68 31 40 00 48'.split(' '), intId: [], description: 'Radio RDS Release' },
      { name: 'radio_tp_press', hexId: 'C0 06 68 31 40 00 09'.split(' '), intId: [], description: 'Radio TP Press' },
      { name: 'radio_tp_hold', hexId: 'C0 06 68 31 40 00 29'.split(' '), intId: [], description: 'Radio TP Hold' },
      { name: 'radio_tp_release', hexId: 'C0 06 68 31 40 00 49'.split(' '), intId: [], description: 'Radio TP Release' },
      { name: 'radio_rev_press', hexId: 'C0 06 68 31 00 00 0C'.split(' '), intId: [], description: 'Radio REV Press' },
      { name: 'radio_rev_hold', hexId: 'C0 06 68 31 00 00 2C'.split(' '), intId: [], description: 'Radio REV Hold' },
      { name: 'radio_rev_release', hexId: 'C0 06 68 31 00 00 4C'.split(' '), intId: [], description: 'Radio REV Release' },
      { name: 'radio_ff_press', hexId: 'C0 06 68 31 00 00 0D'.split(' '), intId: [], description: 'Radio FF Press' },
      { name: 'radio_ff_hold', hexId: 'C0 06 68 31 00 00 2D'.split(' '), intId: [], description: 'Radio FF Hold' },
      { name: 'radio_ff_release', hexId: 'C0 06 68 31 00 00 4D'.split(' '), intId: [], description: 'Radio FF Release' },
      { name: 'cd_button_press', hexId: 'C0 06 68 31 40 00 0B'.split(' '), intId: [], description: 'CD button Press' },
      { name: 'cd_button_hold', hexId: 'C0 06 68 31 40 00 2B'.split(' '), intId: [], description: 'CD button Hold' },
      { name: 'cd_button_release', hexId: 'C0 06 68 31 40 00 4B'.split(' '), intId: [], description: 'CD button Release' },
      { name: 'radio_turnknob_off', hexId: 'C0 04 68 22 00'.split(' '), intId: [], description: 'Radio Turnknob Off' },
      { name: 'radio_on_1', hexId: 'C0 03 80 01'.split(' '), intId: [], description: 'Radio On 1' },
      { name: 'radio_on_2', hexId: 'C0 03 68 01'.split(' '), intId: [], description: 'Radio On 2' },
      { name: 'cd_sc_press', hexId: 'C0 06 68 31 40 00 0a'.split(' '), intId: [], description: 'CD button SC Press' },
      { name: 'cd_sc_hold', hexId: 'C0 06 68 31 40 00 2a'.split(' '), intId: [], description: 'CD button SC Hold' },
      { name: 'cd_sc_release', hexId: 'C0 06 68 31 40 00 4a'.split(' '), intId: [], description: 'CD button SC Release' },
      { name: 'mode_press', hexId: 'C0 06 68 31 00 00 0B'.split(' '), intId: [], description: 'Mode Press' },
      { name: 'mode_release', hexId: 'C0 06 68 31 00 13 4B'.split(' '), intId: [], description: 'Mode Release' },
      { name: 'memory_press', hexId: 'C0 06 68 31 00 00 0E'.split(' '), intId: [], description: 'Memory Press' },
      { name: 'memory_release', hexId: 'C0 06 68 31 00 00 4E'.split(' '), intId: [], description: 'Memory Release' },
      { name: 'turnknob_press', hexId: 'C0 06 FF 20 20 B2 00'.split(' '), intId: [], description: 'Turnknob Press' },
      { name: 'radio_turnknob_on', hexId: 'C0 04 68 22 01'.split(' '), intId: [], description: 'Radio Turnknob On' },
      { name: 'mid_ring_press', hexId: 'C0 06 FF 20 04 B2 00'.split(' '), intId: [], description: 'MID Ring Press' },
      { name: 'mid_ring_release', hexId: 'C0 06 FF 20 44 B2 00'.split(' '), intId: [], description: 'MID Ring Release' },
      { name: 'mid_tel_press', hexId: 'C0 06 FF 20 02 8E 00'.split(' '), intId: [], description: 'MID Tel Press' },
      { name: 'mid_tel_release', hexId: 'C0 06 FF 20 42 8E 00'.split(' '), intId: [], description: 'MID Tel Release' },
      { name: 'telephone_on', hexId: 'C0 04 C8 22 01'.split(' '), intId: [], description: 'Telephone On' },
      { name: 'mid_audio_press', hexId: 'C0 06 FF 20 01 B0 00'.split(' '), intId: [], description: 'MID Audio Press' },
      { name: 'mid_audio_release', hexId: 'C0 06 FF 20 41 B0 00'.split(' '), intId: [], description: 'MID Audio Release' },
      { name: 'mid_clock_press', hexId: 'C0 06 FF 20 08 E0 C0'.split(' '), intId: [], description: 'MID Clock Press' },
      { name: 'mid_clock_release', hexId: 'C0 06 FF 20 48 E0 C0'.split(' '), intId: [], description: 'MID Clock Release' },
      { name: 'mid_bc_press', hexId: 'C0 06 FF 10 20 E0 C0'.split(' '), intId: [], description: 'MID BC Press' },
      { name: 'mid_bc_release', hexId: 'C0 06 FF 20 50 E0 69'.split(' '), intId: [], description: 'MID BC Release' },
      { name: 'mid_>tel_idle', hexId: 'C0 03 C8 01'.split(' '), intId: [], description: 'MID->TEL Idle' },
      { name: 'tel_>lightctrl_idle', hexId: 'C8 04 BF 02 30'.split(' '), intId: [], description: 'TEL->LightCtrl Idle' },
      { name: 'mid_>ike_idle', hexId: 'C0 03 80 01'.split(' '), intId: [], description: 'MID->IKE Idle' },
      { name: 'ike_>lightctrl_idle', hexId: '80 04 BF 02 00'.split(' '), intId: [], description: 'IKE->LightCtrl Idle' },
      { name: 'mid_>radio_idle', hexId: 'C0 03 68 01'.split(' '), intId: [], description: 'MID->Radio Idle' },
      { name: 'radio_>lightctrl_idle', hexId: '68 04 BF 02 00'.split(' '), intId: [], description: 'Radio->LightCtrl Idle' },
      { name: 'key_remote_unlock_press', hexId: '00 04 BF 72 22'.split(' '), intId: [], description: 'Key remote Unlock Press' },
      { name: 'key_remote_lock_press', hexId: '00 04 BF 72 12'.split(' '), intId: [], description: 'Key remote Lock Press' },
      { name: 'key_remote_trunk_press', hexId: '00 04 BF 72 42'.split(' '), intId: [], description: 'Key remote Trunk Press' },
      { name: 'key_remote_release', hexId: '00 04 BF 72 02'.split(' '), intId: [], description: 'Key remote Release' },
      { name: 'passenger_mirror_out', hexId: '9B 04 51 6D 41'.split(' '), intId: [], description: 'Passenger Mirror Out' },
      { name: 'passenger_mirror_in', hexId: '9B 04 51 6D 42'.split(' '), intId: [], description: 'Passenger Mirror In' },
      { name: 'passenger_mirror_up', hexId: '9B 04 51 6D 44'.split(' '), intId: [], description: 'Passenger Mirror Up' },
      { name: 'passenger_mirror_down', hexId: '9B 04 51 6D 48'.split(' '), intId: [], description: 'Passenger Mirror Down' },
      { name: 'passenger_mirror_stop', hexId: '9B 04 51 6D 40'.split(' '), intId: [], description: 'Passenger Mirror Stop' },
      { name: 'exterior_lights_all_off', hexId: '00 04 BF 76 00'.split(' '), intId: [], description: 'Exterior lights all Off' },
      { name: 'warning_lights_flash_on_off_repeatedly', hexId: '00 04 BF 76 02'.split(' '), intId: [], description: 'Warning lights flash On/Off repeatedly' },
      { name: 'lowbeams_flash_on_off_repeatedly', hexId: '00 04 BF 76 04'.split(' '), intId: [], description: 'Lowbeams flash On/Off repeatedly' },
      { name: 'lowbeams_and_warning_lights_flash_on_off_repeatedly', hexId: '00 04 BF 76 06'.split(' '), intId: [], description: 'Lowbeams and warning lights flash On/Off repeatedly' },
      { name: 'highbeams_flash_on_off_repeatedly', hexId: '00 04 BF 76 08'.split(' '), intId: [], description: 'Highbeams flash On/Off repeatedly' },
      { name: 'highbeams_and_warning_lights_flash_on_off_repeatedly', hexId: '00 04 BF 76 0A'.split(' '), intId: [], description: 'Highbeams and warning lights flash On/Off repeatedly' },
      { name: 'highbeams_and_lowbeams_flash_on_off_repeatedly', hexId: '00 04 BF 76 0C'.split(' '), intId: [], description: 'Highbeams and lowbeams flash On/Off repeatedly' },
      { name: 'highbeams_lowbeams_and_waring_lights_flash_on_off_repeatedly', hexId: '00 04 BF 76 0E'.split(' '), intId: [], description: 'Highbeams, lowbeams and waring lights flash On/Off repeatedly' },
      { name: 'cycle_through_exterior_lighting_patterns_(high_low_fogs)', hexId: '3F 05 BF 0C 01 01'.split(' '), intId: [], description: 'Cycle through exterior lighting patterns (high, low, fogs) ' },
      { name: 'flash_dash_blinkers_(without_flashing_exterior_blinkers)', hexId: 'D0 07 BF 5B 60 00 04 00'.split(' '), intId: [], description: 'Flash dash blinkers (without flashing exterior blinkers) ' },
      { name: 'flash_dash_blinkers_fast_slow_intermitent.', hexId: 'D0 07 BF 5B 60 00 80 00'.split(' '), intId: [], description: 'Flash dash blinkers FAST/SLOW intermitent. ' },
      { name: 'interior_lights_off', hexId: '3F 05 00 0C 01 01'.split(' '), intId: [], description: 'Interior lights Off' },
      { name: 'clown_nose_on_for_3_seconds', hexId: '3F 05 00 0C 4E 01'.split(' '), intId: [], description: 'Clown nose On for 3 seconds' },
      { name: 'interior_lights_on_for_3_seconds', hexId: '3F 05 00 0C 00 11'.split(' '), intId: [], description: 'Interior lights On for 3 seconds' },
      { name: 'driver_rear_window_close',     hexId: '3F 05 00 0C 00 44'.split(' '), intId: [], description: 'Driver Rear Window Close' },
      { name: 'driver_rear_window_open',      hexId: '3F 05 00 0C 00 45'.split(' '), intId: [], description: 'Driver Rear Window Open' },
      { name: 'passenger_rear_window_close',  hexId: '3F 05 00 0C 00 46'.split(' '), intId: [], description: 'Passenger Rear Window Close' },
      { name: 'passenger_rear_window_open',   hexId: '3F 05 00 0C 00 47'.split(' '), intId: [], description: 'Passenger Rear Window Open' },
      { name: 'driver_front_window_open',     hexId: '3F 05 00 0C 00 55'.split(' '), intId: [], description: '? Driver Front Window Open' },
      { name: 'driver_front_window_close',    hexId: '3F 05 00 0C 00 56'.split(' '), intId: [], description: '? Driver Front Window Close' },
      { name: 'passenger_front_window_open',  hexId: '3F 05 00 0C 00 57'.split(' '), intId: [], description: '? Passenger Front Window Open' },
      { name: 'passenger_front_window_close', hexId: '3F 05 00 0C 00 58'.split(' '), intId: [], description: '? Passenger Front Window Close' },
      { name: 'sunroof_open', hexId: '3F 05 00 0C 7E 01'.split(' '), intId: [], description: 'Sunroof Open' },
      { name: 'sunroof_close', hexId: '3F 05 00 0C 7F 01'.split(' '), intId: [], description: 'Sunroof Close' },
      { name: 'driver_front_door_lock', hexId: '3F 05 00 0C 47 01'.split(' '), intId: [], description: 'Driver Front Door Lock' },
      { name: 'passenger_front_door_lock', hexId: '3F 05 00 0C 46 01'.split(' '), intId: [], description: 'Passenger Front Door Lock' },
      { name: 'all_doors_toggle_lock_unlock', hexId: '3F 05 00 0C 00 0B'.split(' '), intId: [], description: 'All Doors Toggle Lock/Unlock' },
      { name: 'rear_doors_locks_on', hexId: '3F 05 00 0C 00 41'.split(' '), intId: [], description: 'Rear Doors Lock On' },
      { name: 'rear_doors_locks_off', hexId: '3F 05 00 0C 00 42'.split(' '), intId: [], description: 'Rear Doors Lock Off' },
      { name: 'washer_only', hexId: '3F 05 00 0C 00 4B'.split(' '), intId: [], description: 'Washer Only' },
      { name: 'washer_and_swipe', hexId: '3F 05 00 0C 00 02'.split(' '), intId: [], description: 'Washer and Swipe' },
      { name: 'wiper_single', hexId: '3F 05 00 0C 00 14'.split(' '), intId: [], description: 'Wiper Single' },
      { name: 'wiper_double', hexId: '3F 05 00 0C 00 15'.split(' '), intId: [], description: 'Wiper Double' },
      { name: 'trunk_open', hexId: '3F 05 00 0C 00 40'.split(' '), intId: [], description: 'Trunk Open' },
      { name: 'lock_doors_and_fade_out_interior_lights', hexId: '3F 05 00 0C 03 01'.split(' '), intId: [], description: 'Lock doors and fade out interior lights ' },
      { name: 'all_windows_open', hexId: '3F 05 00 0C 00 65'.split(' '), intId: [], description: 'All Windows Open' },
      { name: 'ignition_status_pos0_acc', hexId: '80 04 BF 11 00'.split(' '), intId: [], description: 'Ignition Status Pos0_Acc' },
      { name: 'ignition_status_pos1_acc', hexId: '80 04 BF 11 01'.split(' '), intId: [], description: 'Ignition Status Pos1_Acc' },
      { name: 'ignition_status_pos2_on', hexId: '80 04 BF 11 02'.split(' '), intId: [], description: 'Ignition Status Pos2_On' },
      { name: 'ignition_status_pos3_start', hexId: '80 04 BF 11 03'.split(' '), intId: [], description: 'Ignition Status Pos3_Start' },

      // handcoded messages
      { name: 'mp3_menu1', hexId: ('68 21 c0 21 40 00 40 06 ' + '< SONG >'.asciiToHexString() + ' 20 06 ' + '^ SONG '.asciiToHexString() 
                                    + ' C1 06 ' + 'FIND  ||'.asciiToHexString()).split(' '), intId: [], description: 'MP3 Menu 1' },
      { name: 'mp3_menu2', hexId: ('68 22 c0 21 40 00 40 05 05 05 05 05 05 46 4d 05 41 4d 05 ' + 'PAUS'.asciiToHexString() + ' d3').split(' '), intId: [], description: 'MP3 Menu 2' },
      { name: 'mp3_menu3', hexId: ('68 10 c0 21 40 00 09 ' + ('E TP').asciiToHexString() + ' 05 ' + ('SC ').asciiToHexString() + ' 05 ' + ('MP3').asciiToHexString()).split(' '), intId: [], description: 'MP3 Menu 3' },
      { name: 'button_labels_test1', hexId: '68 10 C0 21 40 00 09 20 54 50 05 53 43 20 05 45 46'.split(' '), intId: [], description: 'Button labels test radio left' },
      { name: 'button_labels_test2', hexId: '68 22 c0 21 40 00 40 31 31 31 05 32 20 05 2a 33 05 34 20 05 20 35 05 36 20 05 46 4d 05 41 4d 05 52 44 53 2a'.split(' '), intId: [], description: 'Button labels test radio right' },
      { name: 'button_labels_test3_from_bc_longtext', hexId: '68 21 c0 21 40 00 40 06 31 32 33 34 35 36 37 38 06 2d 20 54 52 45 42 20 2b 06 c1 20 46 41 44 52 20 5e 22'.split(' '), intId: [], description: 'Button labels test long labels' },
      //{ name: 'button_labels_test3', hexId: '68 21 c0 21 40 00 40 06 2d 20 42 41 53 53 20 2b 06 2d 20 54 52 45 42 20 2b 06 c1 20 46 41 44 52 20 5e 22'.split(' '), intId: [], description: 'Button labels test long labels' },


      { name: 'button_labels',                     hexId: '68 10 C0 21 40 00 09 20 54 50 05 53 43 20 05 43 44'.split(' '), intId: [], description: 'Button labels' },
      { name: 'button_labels_for_replace',                     hexId: '68 1e c0 21 40 00 00 20 31 05 32 20 05 20 33 05 34 20 05 20 35 05 36 20 05 05 05 52 4e 44 20'.split(' '), intId: [], description: 'Button labels for replace' },
      { name: 'display_MP3_command_instead_of_CD', hexId: '68 10 C0 21 40 00 09 20 54 50 05 53 43 20 05 4d 50 33'.split(' '), intId: [], description: 'MP3 menu'},
      { name: 'cd_announce', hexId: '18 04 FF 02 01'.split(' '), intId: [], description: 'CD Announce' },
      { name: 'test', hexId: '80 21 c0 23 04 20 31 32 33 34 35 36 37 38 39 30 31 32 33 34 35 36 37 38 39 30'.split(' '), intId: [], description: 'Test message' },
      // TO FF { name: 'cd_respond', hexId: '18 04 FF 02 00'.split(' '), intId: [], description: 'CD Response to Radio' },
      { name: 'cd_respond', hexId: '18 04 68 02 00'.split(' '), intId: [], description: 'CD Response to Radio' },
      { name: 'test_radio', hexId: '68 10 c0 24 40 00 31 32 33 34 35 36 37 38 39 30 31'.split(' '), intId: [], description: 'Test_radio' },
      { name: 'obc_7.2_L_100', hexId: '30 00 e7 24 04 37 2e 32 20 4c 2f 31 30 30'.split(' '), intId: [], description: 'Sample obc_7.2_L_100' },
      { name: 'test_radio2', hexId: '80 21 c0 23 04 20 31 32 33 34 35 36 37 38 39 30 31 32 33 34 35 36 37 38 39 30'.split(' '), intId: [], description: 'Test_radio 2' },
      { name: 'test_ike', hexId: '68 1b 80 23 40 20 31 32 33 34 35 36 37 38 39 30 31 32 33 34 35 36 37 38 39 30'.split(' '), intId: [], description: 'Test IKE' },

      { name: 'cd_playing0101', hexId: '18 0A 68 39 00 09 00 3F 00 01 01'.split(' '), intId: [], description: 'CD Playing Respond' },
      { name: 'cd_playing0101display', hexId: '68 12 c0 23 40 20 43 44 20 03 31 2d 30 31 20 20 20 20 04'.split(' '), intId: [], description: 'Display CD 01-01'}
      //{ name: 'radio_buttons_display', hexId: '68 22 c0 21 40 00 40 20 31 05 32 20 05 2a 33 05 34 20 05 20 35 05 36 20 05 46 4d 05 41 4d 05 52 44 53 2a'.split(' '), intId: [], description: 'CD Playing' }
];

console.log("Monitoring commands (" + monitorCommands.length + ") ...")
for (var i = 0; i < monitorCommands.length; i++) {
      monitorCommands[i].intId = convertToInt(monitorCommands[i].hexId);
      //console.log(JSON.stringify(monitorCommands[i]));
};

monitorCommandsStart = [
      //not working
      { name: 'cd_radio_buttons_for_replace', hexId: '68 1e c0 21 40 00 00 20 31 05 32 20 05 20 33 05 34 20 05 20 35 05 36 20'.split(' '), intId: [], description: 'h.!@.. 1.2 . 3.4 . 5.6 '}
];

console.log("Monitoring commands start (" + monitorCommandsStart.length + ") ...")
for (var i = 0; i < monitorCommandsStart.length; i++) {
      monitorCommandsStart[i].intId = convertToInt(monitorCommandsStart[i].hexId);
      //console.log(JSON.stringify(monitorCommands[i]));
};

module.exports = {

      MonitorDevices: function () {
            return monitorDevices;
      },

      MonitorCommands: function () {
            return monitorCommands;
      },

      MonitorCommandsStart: function () {
            return monitorCommandsStart;
      },

      findCommand: function (msgIntWithChecksum) {
            var compareTo = msgIntWithChecksum.slice();
            var result = [];
            compareTo.pop();
            for (var i = 0; i < monitorCommands.length; i++) {
                  if(monitorCommands[i].intId.equals(compareTo)) {
                        result = monitorCommands[i];
                        //console.log(result);
                        return result;
                  }
            };
            return undefined;
      },

      findCommandByName: function (name) {
            for (var i = 0; i < monitorCommands.length; i++) {
                  if(monitorCommands[i].name === name) {
                        result = monitorCommands[i];
                        //console.log(result);
                        return result;
                  }
            };
            return undefined;
      },

      findCommandByStart: function (msgIntWithChecksum) {
            var compareTo = msgIntWithChecksum.slice();
            var result = [];
            compareTo.pop();
            for (var i = 0; i < monitorCommandsStart.length; i++) {
                  if(monitorCommandsStart[i].intId.beginsWith(compareTo)) {
                        result = monitorCommandsStart[i];
                        //console.log(result);
                        return result;
                  }
            };
            console.log('not by start'.red);
            return undefined;
      }

}

function convertToInt(hex) {
      var result=[];
      for (var i = 0; i < hex.length; i++) {
            result.push(parseInt(hex[i], 16));
      };
      return result;
}
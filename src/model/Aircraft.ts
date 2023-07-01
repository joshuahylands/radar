/*
  This file declares the aircraft type defined at https://www.adsbexchange.com/version-2-api-wip/
  This format is used by the ADSB One (https://adsb.one/) API
*/

export type AircraftSourceType = (
  'adsb_icao' |
  'adsb_icao_nt' |
  'adsr_icao' |
  'tisb_icao' |
  'adsc' |
  'mlat' |
  'other' |
  'mode_s' |
  'adsb_other' |
  'adsr_other' |
  'tisb_other' |
  'tisb_trackfile'
);

export type AircraftNavModes = (
  'autopilot' |
  'vnav' |
  'althold' |
  'approach' |
  'lnav' |
  'tcas'
);

type Aircraft = {
  hex?: string;
  r?: string;
  t?: string;
  dbFlags?: number;
  type?: AircraftSourceType;
  flight?: string;
  alt_baro?: number;
  alt_geom?: number;
  gs?: number;
  ias?: number;
  tas?: number;
  mach?: number;
  track?: number;
  track_rate?: number;
  roll?: number;
  mag_heading?: number;
  true_heading?: number;
  baro_rate?: number;
  geom_rate?: number;
  squawk?: string;
  emergency?: string; // Could be made into a union of strings as there are limited possibilities
  category?: string; // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  nav_qnh?: number;
  nav_altitude_mcp?: number;
  nav_altitude_fms?: number;
  nav_heading?: number;
  nav_modes?: AircraftNavModes[],
  lat?: number;
  lon?: number;
  nic?: number;
  rc?: number;
  seen_pos?: number;
  version?: number;
  nic_baro?: number;
  nac_p?: number;
  nac_v?: number;
  sil?: number;
  sil_type?: 'unknown' | 'perhour' | 'persample';
  gva?: number;
  sda?: number;
  mlat?: unknown[];
  tisb?: unknown[];
  messages?: number;
  seen?: number;
  rssi?: number;
  alert?: number;
  spi?: number;
  wd?: number;
  ws?: number;
  oat?: number;
  tat?: number;
  lastPosition?: object; // Could be made into a type
  rr_lat?: number;
  rr_lon?: number;
  acas_ra?: number;
  gpsOkBefore?: boolean;
};

export default Aircraft;

import * as migration_20241128_144912 from './20241128_144912';
import * as migration_20241129_110215_add_localization_to_xp_desc from './20241129_110215_add_localization_to_xp_desc';

export const migrations = [
  {
    up: migration_20241128_144912.up,
    down: migration_20241128_144912.down,
    name: '20241128_144912',
  },
  {
    up: migration_20241129_110215_add_localization_to_xp_desc.up,
    down: migration_20241129_110215_add_localization_to_xp_desc.down,
    name: '20241129_110215_add_localization_to_xp_desc'
  },
];

import * as migration_20241128_144912 from './20241128_144912';
import * as migration_20241129_110215_add_localization_to_xp_desc from './20241129_110215_add_localization_to_xp_desc';
import * as migration_20241129_164302_add_localization_media_alt from './20241129_164302_add_localization_media_alt';
import * as migration_20241129_174207_add_versionning_to_blog_post____xp_post from './20241129_174207_add_versionning_to_blog_post____xp_post';
import * as migration_20241130_164001_rename_WeAreStudio99_to_99Stud from './20241130_164001_rename_WeAreStudio99_to_99Stud';
import * as migration_20241202_132356_add_label_to_social from './20241202_132356_add_label_to_social';

export const migrations = [
  {
    up: migration_20241128_144912.up,
    down: migration_20241128_144912.down,
    name: '20241128_144912',
  },
  {
    up: migration_20241129_110215_add_localization_to_xp_desc.up,
    down: migration_20241129_110215_add_localization_to_xp_desc.down,
    name: '20241129_110215_add_localization_to_xp_desc',
  },
  {
    up: migration_20241129_164302_add_localization_media_alt.up,
    down: migration_20241129_164302_add_localization_media_alt.down,
    name: '20241129_164302_add_localization_media_alt',
  },
  {
    up: migration_20241129_174207_add_versionning_to_blog_post____xp_post.up,
    down: migration_20241129_174207_add_versionning_to_blog_post____xp_post.down,
    name: '20241129_174207_add_versionning_to_blog_post____xp_post',
  },
  {
    up: migration_20241130_164001_rename_WeAreStudio99_to_99Stud.up,
    down: migration_20241130_164001_rename_WeAreStudio99_to_99Stud.down,
    name: '20241130_164001_rename_WeAreStudio99_to_99Stud',
  },
  {
    up: migration_20241202_132356_add_label_to_social.up,
    down: migration_20241202_132356_add_label_to_social.down,
    name: '20241202_132356_add_label_to_social'
  },
];

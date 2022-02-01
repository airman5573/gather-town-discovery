import { MENU_ITEM_LIST } from '../../../constants';
import MenuItem from './MenuItem';

export default function NavMenu() {
  const tagList = MENU_ITEM_LIST.map(({ className, label }) => {
    return (
      <MenuItem className={className} label={label} key={className}></MenuItem>
    );
  });

  return <ul className="nav-menu list-unstyled">{tagList}</ul>;
}

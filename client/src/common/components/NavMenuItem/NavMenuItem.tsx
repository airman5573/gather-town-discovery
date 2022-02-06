/** @jsxImportSource @emotion/react */
import { menuItemStyle } from './style';

type NavMenuItemProps = {
  label: string;
  className: string;
  handleClick: () => void;
};

export function NavMenuItem({
  label,
  className,
  handleClick,
}: NavMenuItemProps) {
  return (
    <li className={className} css={menuItemStyle}>
      <button onClick={handleClick}>
        {label}
        <div className="ripple js-ripple">
          <span className="ripple__circle"></span>
        </div>
      </button>
    </li>
  );
}

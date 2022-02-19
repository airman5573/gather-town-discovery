import { useAppSelector } from '../../redux';
import { NavMenuItemEnum } from '../../types';

type Props = {
  className: string;
  navMenuItem: NavMenuItemEnum;
  children: JSX.Element | JSX.Element[] | boolean;
};

export default function PageWrapper({
  className,
  navMenuItem,
  children,
}: Props) {
  const { activeNavMenuItem } = useAppSelector((state) => state.pageControl);
  if (activeNavMenuItem === navMenuItem) {
    return <div className={className}>{children}</div>;
  }
  return <></>;
}

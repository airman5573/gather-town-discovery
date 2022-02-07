import classNames from 'classnames';
import { useAppSelector } from '../../redux';
import { NavMenuItemEnum } from '../../types';

type Props = {
  className: string;
  navMenuItem: NavMenuItemEnum;
  children: JSX.Element | JSX.Element[];
};

export default function PageWrapper({
  className,
  navMenuItem,
  children,
}: Props) {
  const { activeNavMenuItem } = useAppSelector((state) => state.pageControl);
  const cn = classNames(className, {
    'd-none': activeNavMenuItem !== navMenuItem,
    'd-block': activeNavMenuItem === navMenuItem,
  });
  return <div className={cn}>{children}</div>;
}

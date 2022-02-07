import { NavMenuItemEnum } from '../../../types';
import PageWrapper from '../PageWrapper';

export default function PuzzlePage() {
  return (
    <PageWrapper className="puzzle-page" navMenuItem={NavMenuItemEnum.Puzzle}>
      Puzzle PAGE
    </PageWrapper>
  );
}

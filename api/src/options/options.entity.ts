import { YesOrNo } from 'src/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'options' })
export class OptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    name: 'admin_password',
  })
  adminPassword: string;

  @Column({
    type: 'text',
    name: 'can_submit_descrypted_sentence',
  })
  canSubmitDescryptedSentence: YesOrNo;

  @Column({
    type: 'int',
    name: 'puzzle_count',
    default: 0,
  })
  puzzleCount: number;

  @Column({
    type: 'text',
    name: 'original_puzzle_message',
  })
  originalPuzzleMessage: string;

  @Column({
    type: 'simple-array',
    name: 'shuffled_puzzle_message_with_placeholder',
  })
  shuffledPuzzleMessageWithPlaceholder: string[];

  @Column({
    type: 'text',
    name: 'last_puzzle_video_url',
  })
  lastPuzzleVideoUrl: string;

  @Column({
    type: 'text',
    name: 'can_open_last_puzzle',
  })
  canOpenLastPuzzle: YesOrNo;

  @Column({
    type: 'text',
    name: ' is_running_timer',
  })
  isRunningTimer: YesOrNo;

  @Column({
    type: 'int',
    name: 'lap_time',
    default: 0,
  })
  lapTime: number;

  @Column({
    type: 'text',
    name: 'company_image',
  })
  companyImage: string;

  @Column({
    type: 'text',
    name: 'map_image',
  })
  mapImage: string;
}

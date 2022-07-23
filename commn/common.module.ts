import { Module } from '@nestjs/common';
import { generators } from './generators';

@Module({
  imports: [],
  providers: [...generators],
})
export class CommonModule {}
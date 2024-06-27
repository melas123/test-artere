import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

@Module({
  imports: [CacheModule.register()],
  providers: [ContactService],
  controllers: [ContactController],
})
export class ContactModule {}

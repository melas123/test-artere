import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@ApiTags('contacts')
@Controller('contacts')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @ApiResponse({
    status: 201,
    description: 'Returns all contacts',
  })
  @UseInterceptors(CacheInterceptor)
  @CacheKey('getcontacs')
  @CacheTTL(60000) // (1 minute === 60000)
  @Get('')
  getContacts() {
    const contacts = this.contactService.getContacts();
    return contacts;
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey('getcontact-key')
  @CacheTTL(60000) // (1 minute === 60000)
  @Get(':contactId')
  async getContact(@Res() res, @Param('contactId') contactId) {
    const contact = await this.contactService.getContact(contactId);
    if (!contact) throw new NotFoundException('Contact does not exist');
    return res.status(HttpStatus.OK).json(contact);
  }

  @Post('/new')
  addContact(@Res() res, @Body() createContactDTO: CreateContactDto) {
    this.contactService.addContact(createContactDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Contact has been created successfully',
    });
  }
}

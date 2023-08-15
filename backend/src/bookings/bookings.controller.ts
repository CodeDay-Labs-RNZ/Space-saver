import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from './schemas/bookings.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('bookings')
export class BookingsController {
  /* inject user service here */
  constructor(private bookingsService: BookingsService) {}

  /* GET, all bookings */
  @Get()
  @UseGuards(AuthGuard())
  async getAllBookings(): Promise<Booking[]> {
    return this.bookingsService.findAll();
  }


  /* POST, create new booking */
    /* getting booking from body of request. booking type is of create booking dto */
    /* protecting account creation route using guards */
  @Post()
  @UseGuards(AuthGuard())
  async createNewBooking(@Body() booking: CreateBookingDto, @Req() req): Promise<Booking> {
    return this.bookingsService.create(booking, req.user);
  }


  /* GET booking by id */
  @Get(':id')
  @UseGuards(AuthGuard())
  async getBooking(@Param('id') id: string): Promise<Booking> {
    return this.bookingsService.findBookingById(id);
  }


  /* UPDATE booking by id */
  @Put(':id')
  @UseGuards(AuthGuard())
  async updateBooking(@Param('id') id: string, 
                      @Body() booking: UpdateBookingDto): Promise<Booking> {
    return this.bookingsService.updateBookingById(id, booking);
  }


  /* DELETE booking by id */
  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteBooking(@Param('id') id: string): Promise<Booking> {
    const bookingToDelete = this.bookingsService.deleteBookingById(id);
    return bookingToDelete;
  }

}

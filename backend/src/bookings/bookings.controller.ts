import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from './schemas/bookings.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';


interface UnavailableDateRange {
  startDate: Date;
  endDate: Date;
}


@Controller('bookings')
export class BookingsController {
  /* inject user service here */
  constructor(private bookingsService: BookingsService) {}


  @Get('unavailableDates')
  @UseGuards(AuthGuard())
  async getUnavailableDates(): Promise<UnavailableDateRange[]> {
    return await this.bookingsService.getUnavailableDates();
  }


  /* GET, all bookings */ 
  @Get('getAllBookings')
  @UseGuards(AuthGuard())
  async getAllBookings(@Req() req): Promise<Booking[]> {
    // console.log(req.user);
    return this.bookingsService.findAll();
  }


  /* GET, clients bookings */
  @Get('getClientBookings')
  @UseGuards(AuthGuard())
  async getClientBookings(@Req() req): Promise<Booking[]> {
    const clientId = req.user.id;
    return this.bookingsService.findBookingsByClient(clientId);
  }


  /* POST, create new booking */
    /* getting booking from body of request. booking type is of create booking dto */
    /* protecting account creation route using guards */
  @Post('newBooking')
  @UseGuards(AuthGuard())
  async createNewBooking(@Body() booking: CreateBookingDto, @Req() req): Promise<Booking> {
    // console.log('request.user in controller:', req.user); 
    return this.bookingsService.create(booking, req.user);
  }


  /* GET booking by id */
  @Get('getBooking/:id')
  @UseGuards(AuthGuard())
  async getBooking(@Param('id') id: string): Promise<Booking> {
    return this.bookingsService.findBookingById(id);
  }


  /* UPDATE booking by id */
  @Put('updateBooking/:id')
  @UseGuards(AuthGuard())
  async updateBooking(@Param('id') id: string, 
                      @Body() booking: UpdateBookingDto): Promise<Booking> {
    return this.bookingsService.updateBookingById(id, booking);
  }


  /* DELETE booking by id */
  @Delete('deleteBooking/:id')
  @UseGuards(AuthGuard())
  async deleteBooking(@Param('id') id: string): Promise<Booking> {
    const bookingToDelete = this.bookingsService.deleteBookingById(id);
    return bookingToDelete;
  }

}

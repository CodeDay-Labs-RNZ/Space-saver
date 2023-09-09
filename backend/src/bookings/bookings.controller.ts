import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from './schemas/bookings.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';


/** 
 * `UnavailableDateRange` interface defines structure of an object 
 * that represents a range of unavailable dates. 
 * Props: `startDate` and `endDate`, (Date type)
 * Used in `getUnavailableDates` method of `BookingsController`, 
 * specifying the format of the data that will be returned. 
*/
interface UnavailableDateRange {
  startDate: Date;
  endDate: Date;
}


/* BookingsController class, TypeScript controller handling requests 
related to bookings and injects the BookingsService. */
@Controller('bookings')
export class BookingsController {

  // injecting user service 
  constructor(private bookingsService: BookingsService) {}


// @Get('unavailableDates') defines get route handler to get unavailable Dates to '/bookings/unavailableDates' endpoint
  @Get('unavailableDates')
  @UseGuards(AuthGuard())
  async getUnavailableDates(): Promise<UnavailableDateRange[]> {
    return await this.bookingsService.getUnavailableDates();
  }


// @Get('getAllBookings') defines get route handler to get all bookings to '/bookings/getAllBookings' endpoint 
// @UseGuards(AuthGuard()) protecting routes to ensure only authenticated users can access it
  @Get('getAllBookings')
  @UseGuards(AuthGuard())
  async getAllBookings(@Req() req): Promise<Booking[]> {
    return this.bookingsService.findAll();
  }


// @Get('getClientBookings') defines get route handler to get client bookings to '/bookings/getClientBookings' endpoint
// @UseGuards(AuthGuard()) protecting routes to ensure only authenticated users can access it
  @Get('getClientBookings')
  @UseGuards(AuthGuard())
  async getClientBookings(@Req() req): Promise<Booking[]> {
    const clientId = req.user.id;
    return this.bookingsService.findBookingsByClient(clientId);
  }


// @Get('getBooking/:id') defines get route handler for getting client booking by id to '/bookings/'getBooking/:id' endpoint
// @UseGuards(AuthGuard()) protecting routes to ensure only authenticated users can access it
@Get('getBooking/:id')
@UseGuards(AuthGuard())
async getBooking(@Param('id') id: string): Promise<Booking> {
  return this.bookingsService.findBookingById(id);
}


// @Post('newBooking') defines post route handler for new client bookings to '/bookings/newBooking' endpoint
// @UseGuards(AuthGuard()) protecting routes to ensure only authenticated users can access it
  @Post('newBooking')
  @UseGuards(AuthGuard())
  async createNewBooking(@Body() booking: CreateBookingDto, @Req() req): Promise<Booking> {
    return this.bookingsService.create(booking, req.user);
  }


// @Put('updateBooking/:id') defines put(update) route handler for updating client bookings to '/bookings/updateBooking/:id' endpoint
// @UseGuards(AuthGuard()) protecting routes to ensure only authenticated users can access it
  @Put('updateBooking/:id')
  @UseGuards(AuthGuard())
  async updateBooking(@Param('id') id: string, 
                      @Body() booking: UpdateBookingDto): Promise<Booking> {
    return this.bookingsService.updateBookingById(id, booking);
  }


// @Delete('deleteBooking/:id') defines delete route handler for deleting client bookings to '/bookings/deleteBooking/:id' endpoint
// @UseGuards(AuthGuard()) protecting routes to ensure only authenticated users can access it
  @Delete('deleteBooking/:id')
  @UseGuards(AuthGuard())
  async deleteBooking(@Param('id') id: string): Promise<Booking> {
    const bookingToDelete = this.bookingsService.deleteBookingById(id);
    return bookingToDelete;
  }

}

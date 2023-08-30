import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Booking } from './schemas/bookings.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Client } from '../auth/schemas/client.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Query } from 'express-serve-static-core';
import { UpdateBookingDto } from './dto/update-booking.dto';

/*
const newBookingData = {
  client: someClient,
  clientName: 'John Doe',
  clientEmail: 'john@example.com',
  company: 'Some Company',
  TypeOfSpaceNeeded: TypeOfSpaceNeeded.ROOMRENTAL,
  bookingsDetails: {
    bookingStartDate: new Date(),
    bookingStartTime: '10:00 AM',
    bookingEndDate: new Date(),
    bookingEndTime: '02:00 PM',
    attendees: 'john@example.com',
    reminder: true,
    bookingStatus: BookingStatus.CONFIRMED
  }
};
*/

@Injectable()
export class BookingsService {
   /* creating constructor to inject our model for getting/using data from db */
   constructor(
    @InjectModel(Booking.name)
    private bookingModel: mongoose.Model<Booking>,
    @InjectModel(Client.name)
    private clientModel: mongoose.Model<Client>,
  ) {}

  
  async findAll(): Promise<Booking[]> {
    /* todo: add pagination funcationality(finding bookings by emails) breaking up content blocks into navigable pgs */
    try {
      const bookings = await this.bookingModel.find();
      return bookings;
    } catch (error) {
      console.error('Error fetching all bookings: ', error.message);
      throw new Error('Failed to fetch bookings');
    }
  }


  /* todo: ensure these check is working, currently not working */
  /* querying the db for bookings that overlap with desired date/time */
  /* implement a function to check if future booking is available  */  
  async isBookingAvailable(startDate: string, startTime: string, 
                          endDate: string, endTime: string,): Promise<Boolean> {

    const startDateTime = new Date(startDate + 'T' + startTime);
    const endDateTime = new Date(endDate + 'T' + endTime); 
    const overlappingBookings = await this.bookingModel.find({
      $or: [
        { 'bookings.bookingStartDate' : { $lte: endDateTime }, 'bookings.bookingEndDate': { $gte: startDateTime} },
      ]
    });
    return overlappingBookings.length === 0;
  }

  async create(booking: CreateBookingDto, client: Client): Promise<Booking> {
    /* looping thru each booking detail to check availability */
    for (const detail of booking.bookings) {
      const isAvailable = await this.isBookingAvailable(
        detail.bookingStartDate,
        detail.bookingStartTime,
        detail.bookingEndDate,
        detail.bookingEndTime
      );

      if (!isAvailable) {
        throw new BadRequestException('The desired time slot is alread booked.')
      }
    }
 
    try{
      const data = Object.assign(booking, { client: client.id })
      // console.log('data in services file:', data);
      const newBooking = await this.bookingModel.create(data);
      console.log(newBooking);
      return newBooking;
    } catch (error) { 
      console.error('Error creating booking: ', error);
      throw new Error('Failed to create booking');
    }
  }


  async findBookingById(bookId: string): Promise<Booking> {
    try {
      /* validating booking */
      const isValidId = mongoose.isValidObjectId(bookId);
      if (!isValidId) {
        throw new BadRequestException("Please enter correct id")
      } 
      /* checking for booking */
      const booking = await this.bookingModel.findById(bookId);
      if (!booking) {
        throw new NotFoundException("Booking not found")
      }
      console.log(booking);
      return booking;
      
    } catch (error) {
      if (!(error instanceof BadRequestException || error instanceof NotFoundException)) {
        console.error('Error fetching booking by ID: ', error.message);
        throw new Error('Failed to fetch booking');
      }
      throw error;
    }
  }


  async updateBookingById(bookId: string, booking: UpdateBookingDto): Promise<Booking> {
    try {
      /* validating booking */
      const isValidId = mongoose.isValidObjectId(bookId);
      if (!isValidId) {
        throw new BadRequestException("Please enter correct id")
      }
      /* checking for booking */
      const bookingToUpdate = await this.bookingModel.findByIdAndUpdate(bookId, booking, {
        new: true, 
        runValidators: true 
      }).exec();
  
      if (!bookingToUpdate) {
        throw new NotFoundException("Booking not found")
      }
      console.log(bookingToUpdate);
      return bookingToUpdate;
      
    } catch (error) {
      if (!(error instanceof BadRequestException || error instanceof NotFoundException)) {
        console.error('Error updating booking by ID: ', error.message);
        throw new Error('Failed to update booking');
      }
      throw error;
    }

  }


  async deleteBookingById(bookId: string): Promise<Booking> {
    try {
      /* validating booking */
      const isValidId = mongoose.isValidObjectId(bookId);
      if (!isValidId) {
        throw new BadRequestException("Please enter correct id")
      }
  
      const deletedBooking = await this.bookingModel.findByIdAndDelete(bookId);
      if (!deletedBooking) {
        throw new NotFoundException("Booking not found");
      }
      console.log(deletedBooking)
      return deletedBooking;
      
    } catch (error) {
      if (!(error instanceof BadRequestException || error instanceof NotFoundException)) {
        console.error('Error deleting booking by ID: ', error.message);
        throw new Error('Failed to delete booking');
      }
      throw error;
    }
  }


}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Booking } from './schemas/bookings.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Client } from '../auth/schemas/client.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Query } from 'express-serve-static-core';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingDetails } from './schemas/bookingDetails.schema';
import { Types } from 'mongoose';

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
      console.log('Getting all bookings:', JSON.stringify(bookings, null, 2));
      return bookings;
    } catch (error) {
      // console.error("Detailed Error:", error);
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
    /* 
    //looping thru each booking detail to check availability 
    for (const detail of booking) {
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
    */

    console.log('Incoming booking object:', booking);
 
    try{

      /*
      // const data = Object.assign(booking, { client: client.id })
      const data = {
        ...booking, client: client.id, 
        bookings: booking.bookings
      }
      console.log('Received booking:', booking.bookings);
      const newBooking = await this.bookingModel.create(data);
      console.log('New booking details', newBooking);
      return newBooking;
      */
     
      /*
      const bookingDetails: BookingDetails[] = booking.bookings.map(detail => ({
        bookingStartDate: detail.bookingStartDate,
        bookingStartTime: detail.bookingStartTime,
        bookingEndDate: detail.bookingEndDate,
        bookingEndTime: detail.bookingEndTime,
        attendees: detail.attendees,
        reminder: detail.reminder,
      }));

      // Explicitly construct the new booking object
      const newBookingData = {
        clientId,
        clientName: client.name,
        // clientEmail: client.email,
        company: booking.company,
        typeOfSpaceNeeded: booking.typeOfSpaceNeeded,
        bookings: bookingDetails, // Explicitly setting the subdocuments
      };

      const newBooking = new this.bookingModel(newBookingData);
      console.log('New booking to be saved:', JSON.stringify(newBooking, null, 2));
      await newBooking.save();
      return newBooking;
      */

      // Convert client.id to ObjectId if it's a string (only if needed)
      const clientId = typeof client.id === 'string' ? new Types.ObjectId(client.id) : client.id;

      const newBooking = new this.bookingModel();
      newBooking.client = clientId;
      newBooking.clientName = client.name;
      newBooking.company = booking.company;
      newBooking.typeOfSpaceNeeded = booking.typeOfSpaceNeeded;
      newBooking.bookingStartDate = booking.bookingStartDate;
      newBooking.bookingEndDate = booking.bookingEndDate;
      newBooking.bookingStartTime = booking.bookingStartTime;
      newBooking.bookingEndTime = booking.bookingEndTime;
      newBooking.reminder = booking.reminder;
      // newBooking.attendees = booking.bookings[0].attendees; // implement later after frontend can send email reminders

      // console.log('Before Save:', JSON.stringify(newBooking, null, 2));
      await newBooking.save();
      console.log('New booking saved successfully:', newBooking);
      
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
      console.log("Received bookId:", bookId);
      console.log("Received booking data:", booking);

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
      
      console.log('Updated Booking', bookingToUpdate);
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

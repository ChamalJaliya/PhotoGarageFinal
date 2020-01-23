import { BookingsModule } from './bookings.module';

describe('BookingsModule', () => {
  let customersModule: BookingsModule;

  beforeEach(() => {
    customersModule = new BookingsModule();
  });

  it('should create an instance', () => {
    expect(customersModule).toBeTruthy();
  });
});

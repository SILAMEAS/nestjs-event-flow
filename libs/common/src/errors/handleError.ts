import { HttpException, HttpStatus } from '@nestjs/common';

export const handleError = (error: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (error.response) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
    throw new HttpException(error.response.data, error.response.status);
  }
  throw new HttpException(
    'Something went wrong',
    HttpStatus.SERVICE_UNAVAILABLE,
  );
};

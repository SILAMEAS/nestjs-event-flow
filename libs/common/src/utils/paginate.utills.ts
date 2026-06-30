import {
  PaginationRequestDto,
  PaginationResponseDto,
} from '@app/common/dto/pagination.dto';

export async function paginate<T>(
  query: Promise<T[]>,
  totalQuery: Promise<{ total: number }[]>,
  pagination: PaginationRequestDto,
): Promise<PaginationResponseDto<T>> {
  const [data, totalResult] = await Promise.all([query, totalQuery]);

  const total = Number(totalResult[0].total);
  const totalPages = Math.ceil(total / pagination.pageSize);

  return {
    data,
    pageNumber: pagination.pageNumber,
    pageSize: pagination.pageSize,
    total,
    totalPages,
    hasNextPage: pagination.pageNumber < totalPages,
    hasPreviousPage: pagination.pageNumber > 1,
  };
}

// link for test : https://chatgpt.com/share/6a437023-8878-83ec-94ff-16b70210816f

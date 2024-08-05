'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export const Category = () => {
  const search = useSearchParams();
  const idCategory = search.get('idCategory');

  const loadCategories = () => {};

  return <></>;
};

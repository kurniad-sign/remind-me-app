'use server';

import { currentUser } from '@clerk/nextjs';

import { prisma } from '@/lib/prisma';
import { wait } from '@/lib/utils';

import { createCollectionSchemaType } from '../schema/create-collection';

export async function createCollection(form: createCollectionSchemaType) {
  const user = await currentUser();

  if (!user) {
    throw new Error('user not found');
  }

  return await prisma.collection.create({
    data: {
      userId: user.id,
      color: form.color,
      name: form.name,
    },
  });
}

export async function deleteCollection(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new Error('user not found');
  }

  await wait(5000);

  return await prisma.collection.delete({
    where: {
      id,
      userId: user.id,
    },
  });
}

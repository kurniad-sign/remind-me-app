'use server';

import { currentUser } from '@clerk/nextjs';

import { prisma } from '@/lib/prisma';

import { CreateTaskSchemaType } from '../schema/create-task';

export async function createTask(data: CreateTaskSchemaType) {
  const user = await currentUser();

  if (!user) {
    throw new Error('User not found!');
  }

  const { collectionId, content, expiredAt } = data;

  return await prisma.task.create({
    data: {
      userId: user.id,
      content,
      expiresAt: expiredAt,
      Collection: {
        connect: {
          id: collectionId,
        },
      },
    },
  });
}

export async function setTaskDone(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new Error('User not found!');
  }

  return await prisma.task.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      done: true,
    },
  });
}

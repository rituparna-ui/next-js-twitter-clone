import { NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';

import prisma from '@/lib/prismadb';

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });

  if (!session?.user?.email) {
    throw new Error('Not Authenticated');
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error('Not Authenticated');
  }

  return { currentUser };
};

export default serverAuth;

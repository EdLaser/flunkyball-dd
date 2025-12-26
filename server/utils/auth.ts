export const getUserForLogin = async (email: string, event: any) => {
  const possibleUser = await usePrisma().users.findUnique({
    select: {
      hashed_password: true,
      players: {
        select: {
          first_name: true,
          public_id: true,
        },
      },
    },
    where: {
      email: email,
    },
  });

  return possibleUser;
};

export const getSatffForLogin = async (email: string, event: any) => {
  const possibleStaff = await usePrisma().staff.findUnique({
    select: {
      hashed_password: true,
      first_name: true,
      public_id: true,
    },
    where: {
      email: email,
    },
  });

  return possibleStaff;
};

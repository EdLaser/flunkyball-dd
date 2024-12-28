export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (
    !body ||
    !body.email ||
    !body.password ||
    !body.firstName ||
    !body.lastName
  ) {
    throw createError({
      statusCode: 400,
      message: "Username / Password / First Name / Last Name are required.",
    });
  } else {
    const { email, password, firstName, lastName } = body;

    const hashedPassword = await hashPassword(password);

    const newStaff = await usePrisma(event).staff.create({
      data: {
        email: email,
        hashed_password: hashedPassword,
        first_name: firstName,
        last_name: lastName,
      },
    });

    await setUserSession(event, {
      user: {
        firstName: newStaff.first_name,
        publicID: newStaff.public_id ?? "",
      },
      secure: {
        isStaff: true,
      },
      isStaff: true,
    });
    setResponseStatus(event, 201);
    return "OK";
  }
});

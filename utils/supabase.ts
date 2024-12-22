const supabase = useSupabaseClient();

export const registerUser = async (email: string, password: string) => {
  try {
    const result = await supabase.auth.signUp({
      email,
      password,
    });
    if (result.error) {
      throw new Error(result.error.message);
    } else if (result.data.user) {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const signIgnUser = async (email: string, password: string) => {
  try {
    const result = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (result.error) {
      throw new Error(result.error.message);
    } else if (result.data.user) {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

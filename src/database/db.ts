import usersDatabase from './schema/user';

const getUserDatabase = async (uid: string) => {
  let user = await usersDatabase.findOne({ id: uid });
  if (user) {
    return user;
  } else {
    user = new usersDatabase({
      id: uid
    });
    await user.save().catch((error) => console.log(error));
    return user;
  }
};

export default getUserDatabase;
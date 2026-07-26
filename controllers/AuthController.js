export const login = async (req, res) => {
  try {
    res.status(500).send("login");
  } catch (error) {
    console.log(error.message);
  }
};
export const logout = async () => {};

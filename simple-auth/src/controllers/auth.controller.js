export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const login = async (req, res) => {};
export const logout = async (req, res) => {};

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import addCredential from "../modals/credential.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await addCredential.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, process.env.TOKEN_SECREAT, { expiresIn: "1h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const email_ = await addCredential.findOne({ email });

    if (email_ ) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await addCredential.create({ email, password: hashedPassword, name: name });

    const token = jwt.sign( { email: result.email, id: result._id }, process.env.TOKEN_SECREAT, { expiresIn: "1h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};
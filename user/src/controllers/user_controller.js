import con from "../config/DB_connection.js";
import { StatusCodes } from "http-status-codes";

export const sign = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: `All fildes requrie.`,
      data: {},
    });
  }

  const checksql = `select * from users where email = ?;`;

  try {
    const [user] = await con.execute(checksql, [email]);
    if (user.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: `User already present.`,
        data: {},
      });
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Internal server error.`,
      data: { error },
    });
  }

  const sql = `insert into users (email) value (?);`;
  try {
    const [user] = await con.execute(sql, [email]);

    if (user.affectedRows > 0) {
      res.cookie("email", email)
      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: `User add.`,
        data: { id: user.insertId },
      });
    }
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: `Somethings wrong.`,
      data: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Internal server error.`,
      data: { error },
    });
  }
};

export const login = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: `All fildes requrie.`,
      data: {},
    });
  }

  const sql = `select * from users where email = ?;`;
  try {
    const [user] = await con.execute(sql, [email]);
    if (user.length > 0) {
      res.cookie("email", email)
      return res.status(StatusCodes.OK).json({
        success: true,
        message: `Login successfully.`,
        data: { user },
      });
    }
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: `No user foud.`,
      data: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Internal server error.`,
      data: { error },
    });
  }
};

export const check = async (req, res) => {
  try {
    const email = req.cookies.email

    if(!email){
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: `Please login.`,
        data: {},
      });
    }
    return res.status(StatusCodes.OK).json({
      success: true,
      message: `All set.`,
      data: { },
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Internal server error.`,
      data: { error },
    });
  }
}

export const logout = async (req, res) => {
  try {
    const email = req.cookies.email

    if(!email){
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: `Can not logout.`,
        data: {},
      });
    }

    res.clearCookie("email")
    return res.status(StatusCodes.OK).json({
      success: true,
      message: `Logout successfully.`,
      data: { },
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `Internal server error.`,
      data: { error },
    });
  }
}

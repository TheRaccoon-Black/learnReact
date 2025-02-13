import { testing } from "./constants.mjs";

export const resolveIndexByUserId = (req, res, next) => {
    const {
      params: { id },
    } = req;
    const parseId = parseInt(id);
    if (isNaN(parseId)) {
      return res.sendStatus(400);
    }
    const findUserIndex = testing.findIndex((data) => data.id === parseId);
    if (findUserIndex === -1) {
      return res.sendStatus(404);
    }
    req.findUserIndex = findUserIndex;
    next();
  };
import { Request, Response } from "express";
import dotenv from "dotenv";
import pkg from "agora-access-token";
const { RtcTokenBuilder, RtcRole } = pkg;

dotenv.config();

const APP_ID = process.env.APP_ID || "";
const APP_CERTIFICATE = process.env.APP_CERTIFICATE || "";

function generateToken(req: Request, res: Response) {
  res.header("Access-Control-Allow-Origin", "*");
  const channelName = req.query.channelName as string;
  if (!channelName) {
    throw { type: "unprocessable_entity", message: "Channel name is required" };
  }
  let uid = Number(req.query.uid);
  if (!uid) {
    uid = 0;
  }
  let role = RtcRole.SUBSCRIBER;
  if (req.query.role == "publisher") {
    role = RtcRole.PUBLISHER;
  }
  let expireTime = Number(req.query.expireTime);
  if (!expireTime) {
    expireTime = 3600;
  }
  const currentTime = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = Number(currentTime) + Number(expireTime);
  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    uid,
    role,
    privilegeExpireTime
  );
  res.send({
    token: token,
  });
}

export { generateToken };

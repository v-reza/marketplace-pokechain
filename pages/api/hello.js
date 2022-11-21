// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { publicRequest } from "@/utils/axiosInstance";
import axios from "axios";
export default function handler(req, res) {
  console.log(res.getHeaders());
  res.status(200).json({ name: "John Doe" });
}

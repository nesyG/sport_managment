import { Router } from "express";
import { mockController } from "../controllers/mock";


const mockRoutes = Router();

mockRoutes.get("/:type", mockController.mockData);

export default mockRoutes;
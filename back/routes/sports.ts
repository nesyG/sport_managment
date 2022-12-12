import { Router } from "express";
import { sportsController } from "../controllers/sports";
import middlewareFunctions from "../middleware/auth";

const sportsRoutes = Router();

/**
 * @openapi
 * '/sports':
 *  get:
 *    tags:
 *    - Sport
 *    summary: Get selected sports from the db (ADMIN ONLY)
 *    parameters:
 *     - in: query
 *       name: sports
 *       type: array
 *       description: Takes in one or multiple comma seperated, case sensitive sport names. If value is omitted all sports are returned.
 *       explode: false
 *    responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad request
 */
sportsRoutes.get("/", middlewareFunctions.verifyAdmin, sportsController.getSportsAsAdmin);

sportsRoutes.put("/" ); //add controllers for this routes

sportsRoutes.post("/");
sportsRoutes.delete("/");

export default sportsRoutes;

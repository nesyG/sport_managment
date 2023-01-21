import { Router } from "express";
import { classesController } from "../controllers/classes";
import middlewareFunctions from "../middleware/auth";

const classesRoutes = Router();

/**
 * @openapi
 * '/classes':
 *  get:
 *     tags:
 *     - Classes
 *     summary: Get selected sports based on age group
 *     parameters:
 *      - in: query
 *        name: sports
 *        type: string
 *        description: Takes in one or multiple comma seperated, case sensitive sport names
 *      - in: query
 *        name: ageGroups
 *        type: string
 *        description: Takes in one of the four case sensitive age groups ("children", "youth", "youngAdults", "adults")
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 */
classesRoutes.get("/", middlewareFunctions.verifyUser, classesController.getSelectedSports);

/**
 * @openapi
 * '/classes/{sport}':
 *  put:
 *   tags:
 *   - Classes
 *   summary: Enroll or unenroll in selected sports class
 *   parameters:
 *    - in: path
 *      name: sport
 *      type: string
 *      description: Takes in case sensitive name of the sport
 *    - in: query
 *      name: action
 *      type: string
 *      description: Takes in an action string which explains what the user is trying to do (either "enroll" or "unenroll")
 *   responses:
 *    200:
 *     description: Success
 *    400:
 *     description: Bad request
 */
classesRoutes.put("/:sport", middlewareFunctions.verifyUser, classesController.enrollOrUnenroll);

/**
 * @openapi
 * '/classes':
 *  put:
 *    tags:
 *    - Classes
 *    summary: Update specific sport class based on age group and class schedule (ADMIN ONLY)
 *    parameters:
 *     - in: query
 *       name: sport
 *       type: string
 *       example: Football
 *       description: Takes in case sensitive sport name
 *     - in: query
 *       name: ageGroup
 *       type: string
 *       example: children
 *       description: Takes in one of the four case sensitive age groups ("children", "youth", "youngAdults", "adults")
 *     - in: query
 *       name: classSchedule
 *       type: string
 *       example: t1
 *       description: Takes in one of the three time slots when sports classes are held ("t1", "t2", "t3")
 *    requestBody:
 *      required: true
 *      description: Update class schedule
 *      content:
 *        application/json:
 *         schema:
 *           $ref: '#/components/schemas/ClassTimeSchema'
 *    responses:
 *     200:
 *      description: Success
 *     400:
 *      description: Bad request
 */
classesRoutes.put("/", classesController.updateSportClassAsAdmin); 

/**
 * @openapi
 * '/classes/feedback':
 *  get:
 *    tags:
 *    - Classes
 *    summary: Get users comments and average grade for selected sport (ADMIN ONLY)
 *    parameters:
 *     - in: query
 *       name: sport
 *       type: string
 *       description: Takes in case sensitive sport name
 *    responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad request
 */
classesRoutes.get("/feedback", middlewareFunctions.verifyAdmin, classesController.getFeedbackAsAdmin);

/**
 * @openapi
 * '/classes/feedback/{sport}':
 *  put:
 *   tags:
 *   - Classes
 *   summary: Leave comment and grade for specific sport
 *   parameters:
 *    - in: path
 *      name: sport
 *      type: string
 *      description: Takes in case sensitive sport name for which the user wants to leave a comment
 *   requestBody:
 *    required: true
 *    description: Comment and grade sport class
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        comment:
 *         type: string
 *         example: Great class!
 *        grade:
 *         type: number
 *         example: 4
 *   responses:
 *    200:
 *     description: Success
 *    400:
 *     description: Bad request
 */
classesRoutes.put("/feedback/:sport", middlewareFunctions.verifyUser, classesController.commentSport);

export default classesRoutes;
